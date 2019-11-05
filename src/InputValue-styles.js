import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  inputItemRow: {
    margin: theme.spacing(0),
  },

  sliderItem: {
    textAlign: "right",
    [theme.breakpoints.down('xs')]: {
      "margin-left": 0,
      "margin-right": 0,
    },
  },
  slider: {
    width: "10rem",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
    },
  },

  textFieldItem: {
    textAlign: "left",
  },
  textField: {
    width: "10rem",
    [theme.breakpoints.down('xs')]: {
      width: "9rem",
    },
  },

  hidden: {
    display: "none",
  },

  cyanBg: {
    background: "cyan",
  },
  magentaBg: {
    background: "magenta",
  },
  yellowBg: {
    background: "yellow",
  },
  greenBg: {
    background: "#00ff00",
  },
}));
