import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  smallSpinner: {
    "margin-top": "2px",
  },
  largeSpinner: {
    "margin-top": "2px",
  },

  incomeDisplay: {
    "text-align": "center",
    /*
    [theme.breakpoints.up('md')]: {
      "text-align": "right",
      "margin-left": -theme.spacing(1),
      "margin-right": theme.spacing(1),
    },
    */
  },

  hidden: {
    display: "none",
  },
}));
