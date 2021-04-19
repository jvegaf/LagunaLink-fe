import { createMuiTheme } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: '#fafafa',
      paper: '#fff'
    },
    primary: {
      main: '#1565c0',
      light: '#5e92f3',
      dark: '#003c8f'
    },
    secondary: {
      main: '#8d6e63',
      light: '#be9c91',
      dark: '#5f4339'
    },
    text: {
      primary: '#263238',
      secondary: '#546E7A'
    }
  },
  shadows,
  typography
});

export default theme;
