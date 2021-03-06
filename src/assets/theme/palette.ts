import { colors } from '@mui/material';

const white = '#FFFFFF';
const black = '#000000';
// const whiteText = '#F5F5F5';
const darkText = '#000000';
const main = '#2196F3';
const customGreen = '#FF9800';

const palette = {
  black,
  white,
  primary: {
    contrastText: white,
    main: main,
  },
  secondary: {
    contrastText: white,
    main: customGreen,
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: '#cf6678',
    light: colors.red[400],
  },
  text: {
    primary: darkText,
    secondary: darkText,
    link: darkText,
    dark: darkText,
  },
  icon: colors.blueGrey[600],
  divider: main,
};

export default palette;
