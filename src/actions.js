export const SET_INITIAL_SAVINGS = 'SET_INITIAL_SAVINGS';
export function setInitialSavings(value) {
	return (dispatch) => {
		recalculateSavingsIncome(dispatch, {
			type: SET_INITIAL_SAVINGS,
			value: value,
		});
	};
}

export const SET_SAVINGS_RATE = 'SET_SAVINGS_RATE';
export function setSavingsRate(value) {
	return (dispatch) => {
		recalculateSavingsIncome(dispatch, {
			type: SET_SAVINGS_RATE,
			value: value,
		});
	};
}

export const SET_INTEREST_RATE = 'SET_INTEREST_RATE';
export function setInterestRate(value) {
	return (dispatch) => {
		recalculateSavingsIncome(dispatch, {
			type: SET_INTEREST_RATE,
			value: value,
		});
	};
}

export const SET_CURRENT_AGE = 'SET_CURRENT_AGE';
export function setCurrentAge(value) {
	return (dispatch) => {
		recalculateSavingsIncome(dispatch, {
			type: SET_CURRENT_AGE,
			value: value,
		});
		recalculateSocSecIncome(dispatch, {
			type: SET_AGE_AT_RETIREMENT,
			value: value,
		});
	};
}

export const SET_AGE_AT_RETIREMENT = 'SET_AGE_AT_RETIREMENT';
export function setAgeAtRetirement(value) {
	return (dispatch) => {
		recalculateSavingsIncome(dispatch, {
			type: SET_AGE_AT_RETIREMENT,
			value: value,
		});
	};
}

export const SET_AGE_AT_DEATH = 'SET_AGE_AT_DEATH';
export function setAgeAtDeath(value) {
	return (dispatch) => {
		recalculateSavingsIncome(dispatch, {
			type: SET_AGE_AT_DEATH,
			value: value,
		});
	};
}

export const SET_CURRENT_WAGES = 'SET_CURRENT_WAGES';
export function setCurrentWages(value) {
	return (dispatch) => {
		recalculateSavingsIncome(dispatch, {
			type: SET_CURRENT_WAGES,
			value: value,
		});
		recalculateSocSecIncome(dispatch, {
			type: SET_CURRENT_WAGES,
			value: value,
		});
	};
}

export const SET_WAGE_GROWTH = 'SET_WAGE_GROWTH';
export function setWageGrowth(value) {
	return (dispatch) => {
		recalculateSavingsIncome(dispatch, {
			type: SET_WAGE_GROWTH,
			value: value,
		});
		recalculateSocSecIncome(dispatch, {
			type: SET_WAGE_GROWTH,
			value: value,
		});
	};
}

export const SET_AGE_TO_START_SOCSEC = 'SET_AGE_TO_START_SOCSEC';
export function setAgeToStartSocSec(value) {
	return (dispatch) => {
		recalculateSocSecIncome(dispatch, {
			type: SET_AGE_TO_START_SOCSEC,
			value: value,
		});
	};
}

export const INVALIDATE_SAVINGS_INCOME = 'INVALIDATE_SAVINGS_INCOME';
export function invalidateSavingsIncome() {
	return { type: INVALIDATE_SAVINGS_INCOME };
}

export const INVALIDATE_SOCSEC_INCOME = 'INVALIDATE_SOCSEC_INCOME';
export function invalidateSocSecIncome() {
	return { type: INVALIDATE_SOCSEC_INCOME };
}

export const INVALIDATE_TOTAL_INCOME = 'INVALIDATE_TOTAL_INCOME';
export function invalidateTotalIncome() {
	return { type: INVALIDATE_TOTAL_INCOME };
}

export const CALCULATE_SAVINGS_INCOME = 'CALCULATE_SAVINGS_INCOME';
export function calculateSavingsIncome() {
	return {
		type: CALCULATE_SAVINGS_INCOME,
	};
}

export const CALCULATE_SOCSEC_INCOME = 'CALCULATE_SOCSEC_INCOME';
export function calculateSocSecIncome() {
	return {
		type: CALCULATE_SOCSEC_INCOME,
	};
}

async function recalculateSavingsIncome(dispatch, action) {
	dispatch(invalidateSavingsIncome());
	dispatch(invalidateTotalIncome());
	dispatch(action);
	await new Promise(resolve => setTimeout(resolve, 0));
	dispatch(calculateSavingsIncome());
}

async function recalculateSocSecIncome(dispatch, action) {
	dispatch(invalidateSocSecIncome());
	dispatch(invalidateTotalIncome());
	dispatch(action);
	await new Promise(resolve => setTimeout(resolve, 0));
	dispatch(calculateSocSecIncome());
}
