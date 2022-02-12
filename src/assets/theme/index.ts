import { createTheme } from '@mui/material/styles';

import palette from './palette';
import typography from './typography';

const theme = createTheme({
  palette: {
    mode: 'light',
    ...palette,
  },
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;
