import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

import { useStyles } from './App-styles.js';
import IncomeDisplay from './IncomeDisplay.js';
import InputValue from './InputValue.js';
import {
  setInitialSavings,
  setSavingsRate,
  setInterestRate,
  setCurrentAge,
  setAgeAtRetirement,
  setAgeAtDeath,
  setCurrentWages,
  setWageGrowth,
  setAgeToStartSocSec,
} from './actions';

function App(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.root}>
        <Typography variant="h2" align="center">Retirement Income Calculator</Typography>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={1}
          >

            <Grid
              item
              xs={12}
              className={clsx(classes.valueTotalItem)}
            >
              <IncomeDisplay
                income={props.calculations.totalIncome}
                incomeValid={!props.calculations.calculatingTotalIncome}
                label="Annual income in retirement"
                large
              />
            </Grid>

            <Grid
              item
              xs={12}
              className={clsx(classes.valueItem)}
            >
              <IncomeDisplay
                income={props.calculations.socSecIncome}
                incomeValid={!props.calculations.calculatingSocSecIncome}
                label={`Income from Social Security (starting in ${new Date().getFullYear() + (props.inputs.ageToStartSocSec - props.inputs.currentAge)})`}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              spacing={1}
            >
              <InputValue
                label="Annual income now"
                startAdornment="$"
                value={props.inputs.currentWages}
                valueFormat="0,0"
                onChange={props.onChangeCurrentWages}
              />

              <InputValue
                label="Wage growth"
                endAdornment="%"
                value={props.inputs.wageGrowth}
                valueFormat="0.0"
                onChange={props.onChangeWageGrowth}
                sliderValues={{min: 0, max: 10, step: 0.5}}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              spacing={1}
            >
              <InputValue
                label="Age now"
                endAdornment="years"
                value={props.inputs.currentAge}
                valueFormat="0"
                onChange={props.onChangeCurrentAge}
              />

              <InputValue
                label="Age to start Social Security benefits"
                endAdornment="years"
                value={props.inputs.ageToStartSocSec}
                valueFormat="0"
                onChange={props.onChangeAgeToStartSocSec}
                sliderValues={{min: 62, max: 70, step: 1}}
              />
            </Grid>

            <Grid
              item
              xs={12}
              className={clsx(classes.valueItem)}
            >
              <IncomeDisplay
                income={props.calculations.savingsIncome}
                incomeValid={!props.calculations.calculatingSavingsIncome}
                label={`Income from savings (starting in ${new Date().getFullYear() + (props.inputs.ageAtRetirement - props.inputs.currentAge)})`}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              spacing={1}
            >
              <InputValue
                label="Savings from income"
                endAdornment="%"
                value={props.inputs.savingsRate}
                valueFormat="0.0"
                onChange={props.onChangeSavingsRate}
                sliderValues={{min: 0, max: 20, step: 0.5}}
              />

              <InputValue
                label="Interest on savings"
                endAdornment="%"
                value={props.inputs.interestRate}
                valueFormat="0.0"
                onChange={props.onChangeInterestRate}
                sliderValues={{min: 0, max: 10, step: 0.5}}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              spacing={1}
            >
              <InputValue
                label="Initial savings"
                startAdornment="$"
                value={props.inputs.initialSavings}
                valueFormat="0,0"
                onChange={props.onChangeInitialSavings}
              />

              <InputValue
                label="Age at retirement"
                endAdornment="years"
                value={props.inputs.ageAtRetirement}
                valueFormat="0"
                onChange={props.onChangeAgeAtRetirement}
                sliderValues={{min: 50, max: 80, step: 1}}
              />

              <InputValue
                label="Age at death"
                endAdornment="years"
                value={props.inputs.ageAtDeath}
                valueFormat="0"
                onChange={props.onChangeAgeAtDeath}
                sliderValues={{min: props.inputs.ageAtRetirement, max: 120, step: 1}}
              />
            </Grid>

            <Grid
              item
              xs={12}
              className={classes.copyrightItem}
            >
              <Typography variant="caption">
                Copyright ©2019 by John Bender. All rights reserved. All mistakes mine.
              </Typography>
            </Grid>

          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) { return state; }

function mapDispatchToProps(dispatch) {
  function getValue(event, value) {
    const v = value;
    if (!v) {
      return event.target.value;
    }
    return v;
  }

  return {
    onChangeInitialSavings: (event, value) => {
      dispatch(setInitialSavings(getValue(event, value)));
    },
    onChangeSavingsRate: (event, value) => {
      dispatch(setSavingsRate(getValue(event, value)));
    },
    onChangeInterestRate: (event, value) => {
      dispatch(setInterestRate(getValue(event, value)));
    },
    onChangeCurrentAge: (event, value) => {
      dispatch(setCurrentAge(getValue(event, value)));
    },
    onChangeAgeAtRetirement: (event, value) => {
      dispatch(setAgeAtRetirement(getValue(event, value)));
    },
    onChangeAgeAtDeath: (event, value) => {
      dispatch(setAgeAtDeath(getValue(event, value)));
    },

    onChangeCurrentWages: (event, value) => {
      dispatch(setCurrentWages(getValue(event, value)));
    },
    onChangeWageGrowth: (event, value) => {
      dispatch(setWageGrowth(getValue(event, value)));
    },
    onChangeAgeToStartSocSec: (event, value) => {
      dispatch(setAgeToStartSocSec(getValue(event, value)));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
