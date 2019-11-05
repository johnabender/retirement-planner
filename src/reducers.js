import numeral from 'numeral';

import {
	SET_INITIAL_SAVINGS,
	SET_SAVINGS_RATE,
	SET_INTEREST_RATE,
	SET_CURRENT_AGE,
	SET_AGE_AT_RETIREMENT,
	SET_AGE_AT_DEATH,
	SET_CURRENT_WAGES,
	SET_WAGE_GROWTH,
	SET_AGE_TO_START_SOCSEC,
	INVALIDATE_SAVINGS_INCOME,
	INVALIDATE_SOCSEC_INCOME,
	INVALIDATE_TOTAL_INCOME,
	CALCULATE_SAVINGS_INCOME,
	CALCULATE_SOCSEC_INCOME,
} from './actions';

const INITIAL_STATE = {
	inputs: {
		initialSavings: 10000,
		savingsRate: 10,
		interestRate: 5,
		currentAge: 50,
		ageAtRetirement: 67,
		ageAtDeath: 90,
		currentWages: 100000,
		wageGrowth: 4,
		ageToStartSocSec: 67,
	},

	calculations: {
		calculatingSavingsIncome: true,
		calculatingSocSecIncome: true,
		calculatingTotalIncome: true,
		savingsIncome: 0,
		socSecIncome: 0,
		totalIncome: 0,
	},
};

const MAX_SOCSEC_WAGES = 132900; // 2019 value

function updateInputs(currentState, action) {
	switch (action.type) {
		case SET_INITIAL_SAVINGS:
			return Object.assign({}, currentState, {
				initialSavings: numeral(action.value).value(),
			});
		case SET_SAVINGS_RATE:
			return Object.assign({}, currentState, {
				savingsRate: numeral(action.value).value(),
			});
		case SET_INTEREST_RATE:
			return Object.assign({}, currentState, {
				interestRate: numeral(action.value).value(),
			});
		case SET_CURRENT_AGE:
			return Object.assign({}, currentState, {
				currentAge: numeral(action.value).value(),
			});
		case SET_AGE_AT_RETIREMENT:
			return Object.assign({}, currentState, {
				ageAtRetirement: numeral(action.value).value(),
			});
		case SET_AGE_AT_DEATH:
			return Object.assign({}, currentState, {
				ageAtDeath: numeral(action.value).value(),
			});
		case SET_CURRENT_WAGES:
			return Object.assign({}, currentState, {
				currentWages: numeral(action.value).value(),
			});
		case SET_WAGE_GROWTH:
			return Object.assign({}, currentState, {
				wageGrowth: numeral(action.value).value(),
			});
		case SET_AGE_TO_START_SOCSEC:
			return Object.assign({}, currentState, {
				ageToStartSocSec: numeral(action.value).value(),
			});		
		default:
			return currentState;
	};
}

function updateSavingsCalculations(currentState) {
	let savingsAtRetirement = currentState.inputs.initialSavings;
	let currentWages = currentState.inputs.currentWages;
	for (let t = currentState.inputs.currentAge; t < currentState.inputs.ageAtRetirement; t++) {
		// interest on savings
		savingsAtRetirement += savingsAtRetirement*currentState.inputs.interestRate/100;
		// additional savings
		savingsAtRetirement += currentWages*currentState.inputs.savingsRate/100;
		currentWages += currentWages*currentState.inputs.wageGrowth/100;
	}
	let bestRetirementEarnings = 0;
	let bestSavingsAtDeath = 100000000;
	for (let retirementEarnings = 0; retirementEarnings < 300000; retirementEarnings += 500) {
		let savingsAtDeath = savingsAtRetirement;
		for (let t = currentState.inputs.ageAtRetirement; t < currentState.inputs.ageAtDeath; t++) {
			savingsAtDeath += savingsAtDeath*currentState.inputs.interestRate/100;
			savingsAtDeath -= retirementEarnings;
		}
		if (Math.abs(savingsAtDeath) < bestSavingsAtDeath) {
			bestSavingsAtDeath = Math.abs(savingsAtDeath);
			bestRetirementEarnings = retirementEarnings;
		}
	}

	const newCalculations = Object.assign({}, currentState.calculations, {
		calculatingSavingsIncome: false,
		savingsIncome: bestRetirementEarnings,
		calculatingTotalIncome: false,
		totalIncome: bestRetirementEarnings + currentState.calculations.socSecIncome,
	});
	return Object.assign({}, currentState, { calculations: newCalculations });
}

function updateSocSecCalculations(currentState) {
	// assume current income every year
	const socSecWages = currentState.inputs.currentWages > MAX_SOCSEC_WAGES ?
		MAX_SOCSEC_WAGES : currentState.inputs.currentWages;
	const yearsToSocSec = currentState.inputs.ageToStartSocSec - currentState.inputs.currentAge;
	const indexedWages = socSecWages*Math.pow(1 + currentState.inputs.wageGrowth/100, yearsToSocSec);
	const indexedMonthlyWages = indexedWages/12;

	// math from https://www.ssa.gov/pubs/EN-05-10070.pdf
	let remainingWages = indexedMonthlyWages;

	const wageIncrement1 = remainingWages > 926 ? 926 : remainingWages;
	remainingWages -= wageIncrement1;
	let wageIncrement2 = 0;
	if (remainingWages > 0) {
		wageIncrement2 = 5583 - 926;
		if (wageIncrement2 > remainingWages) {
			wageIncrement2 = remainingWages;
		}
		remainingWages -= wageIncrement2;
	}
	const wageIncrement3 = remainingWages;

	const fullSocSecMonthlyIncome = wageIncrement1*0.9 + wageIncrement2*0.32 + wageIncrement3*0.15;
	let actualSocSecMonthlyIncome = fullSocSecMonthlyIncome;

	const reductionYears = 67 - currentState.inputs.ageToStartSocSec;
	if (reductionYears > 0) {
		if (reductionYears > 5) {
		}
		const smallReductionYears = reductionYears >= 3 ? 3 : reductionYears;
		const smallReductionPercent = smallReductionYears*12*5/9;
		const largeReductionYears = reductionYears >= 3 ? reductionYears - 3 : 0;
		const largeReductionPercent = largeReductionYears*12*5/12;

		const reductionPercent = smallReductionPercent + largeReductionPercent;
		actualSocSecMonthlyIncome *= (1 - reductionPercent/100);
	} else if (reductionYears < 0) {
		const delayedYears = currentState.inputs.ageToStartSocSec - 67;
		if (delayedYears > 3) {
		}
		const increasePercent = delayedYears*8;
		actualSocSecMonthlyIncome *= (1 + increasePercent/100);
	}

	let baseSocSecIncome = actualSocSecMonthlyIncome*12;

	const colaYears = currentState.inputs.ageToStartSocSec - 63;
	const socSecIncome = baseSocSecIncome*Math.pow(1.025, colaYears);

	const newCalculations = Object.assign({}, currentState.calculations, {
		calculatingSocSecIncome: false,
		socSecIncome: socSecIncome,
		calculatingTotalIncome: false,
		totalIncome: socSecIncome + currentState.calculations.savingsIncome,
	});
	return Object.assign({}, currentState, { calculations: newCalculations });
}

export function calculatorApp(currentState, action) {
	if (!currentState) {
		const intermediateState = Object.assign({}, INITIAL_STATE, {
			inputs: updateInputs(INITIAL_STATE.inputs, action),
		});
		const intState2 = updateSavingsCalculations(intermediateState);
		return updateSocSecCalculations(intState2);
	}

	switch (action.type) {
		case SET_INITIAL_SAVINGS:
		case SET_SAVINGS_RATE:
		case SET_INTEREST_RATE:
		case SET_CURRENT_AGE:
		case SET_AGE_AT_RETIREMENT:
		case SET_AGE_AT_DEATH:
		case SET_CURRENT_WAGES:
		case SET_WAGE_GROWTH:
		case SET_AGE_TO_START_SOCSEC:
			return Object.assign({}, currentState, {
				inputs: updateInputs(currentState.inputs, action),
			});
		case INVALIDATE_SAVINGS_INCOME:
			return Object.assign({}, currentState, {
				calculations: Object.assign({}, currentState.calculations, {
					calculatingSavingsIncome: true,
				})
			});
		case INVALIDATE_SOCSEC_INCOME:
			return Object.assign({}, currentState, {
				calculations: Object.assign({}, currentState.calculations, {
					calculatingSocSecIncome: true,
				})
			});
		case INVALIDATE_TOTAL_INCOME:
			return Object.assign({}, currentState, {
				calculations: Object.assign({}, currentState.calculations, {
					calculatingTotalIncome: true,
				})
			});
		case CALCULATE_SAVINGS_INCOME:
			return updateSavingsCalculations(currentState);
		case CALCULATE_SOCSEC_INCOME:
			return updateSocSecCalculations(currentState);
		default:
			return currentState;
	}
}
