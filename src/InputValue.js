import numeral from 'numeral';
import React from 'react';
import clsx from 'clsx';
import {
	Box,
	Grid,
	InputAdornment,
	Slider,
	TextField,
} from '@material-ui/core';

import { useStyles } from './InputValue-styles.js';

function InputValue({
		label,
		startAdornment="",
		endAdornment="",
		value,
		valueFormat,
		onChange=function(){},
		sliderValues={min: 0, max: 0, step: 1},
		disabled=false,
		}) {
	const classes = useStyles();

	return (
		<Box
			clone
/*
			borderTop={1}
			borderLeft={borderLeft ? 1 : 0}
*/
			borderColor="divider"
		>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				spacing={2}
				className={clsx(classes.inputItemRow)}
			>
				<Grid item xs={6} className={clsx(classes.sliderItem)}>
					<Slider
						min={sliderValues.min}
						max={sliderValues.max}
						step={sliderValues.step}
						marks={(sliderValues.max - sliderValues.min)/sliderValues.step < 25 ? true : []}
						value={numeral(value).value()}
						valueLabelDisplay="auto"
						disabled={disabled}
						onChange={onChange}
						className={sliderValues.max > 0 ? classes.slider : classes.hidden}
					/>
				</Grid>
				<Grid item xs={6} className={clsx(classes.textFieldItem)}>
					<TextField
						variant="outlined"
						label={label}
						value={numeral(value).format(valueFormat)}
						disabled={disabled}
						onChange={onChange}
						InputProps={{
							startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
							endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
						}}
						className={classes.textField}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}

export default InputValue;
