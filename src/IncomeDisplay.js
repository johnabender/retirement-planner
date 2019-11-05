import numeral from 'numeral';
import React from 'react';
import clsx from 'clsx';
import {
	CircularProgress,
	Grid,
	Typography,
} from '@material-ui/core';

import { useStyles } from './IncomeDisplay-styles.js';

function IncomeDisplay({
		income,
		incomeValid,
		label,
		large=false,
	}) {
	const classes = useStyles();
	return (
		<Grid
			item
			xs={12}
			container
			direction="column"
			spacing={0}
			className={classes.incomeDisplay}
		>
			<Grid item>
				<Typography variant={large ? "subtitle1" : "subtitle2"}>
					{label}
				</Typography>
			</Grid>
			<Grid item>
				<Typography
					variant={large ? "h3" : "h5"}
					className={incomeValid ? "" : classes.hidden }
				>
					{numeral(income).format('$0,0')}
				</Typography>
				<CircularProgress
					className={clsx(classes.smallSpinner, incomeValid ? classes.hidden : "")} 
					size={large ? "2.6rem" : "1.5rem"} // match theme.typography.h5.fontSize
				/>
			</Grid>
		</Grid>
	);
}

export default IncomeDisplay;
