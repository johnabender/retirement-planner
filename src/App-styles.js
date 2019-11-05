import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
      "padding-bottom": theme.spacing(3),
    },
  },
  paper: {
    padding: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },

  valueTotalItem: {
  },
  valueItem: {
  	"margin-top": theme.spacing(5),
  },
  copyrightItem: {
    "margin-top": theme.spacing(5),
    "text-align": "center",
  },

  hideLowerLeft: {
    [theme.breakpoints.down('md')]: {
      display: "none",
    },
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
