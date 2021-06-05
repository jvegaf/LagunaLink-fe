import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

let theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: '#fafafa',
      paper: '#fff'
    },
    primary: {
      main: '#0078c0',
      light: '#59a7f3',
      dark: '#004d8f'
    },
    secondary: {
      main: '#c04800',
      light: '#f97735',
      dark: '#891500'
    },
    text: {
      primary: '#202124',
      secondary: '#546E7A'
    }
  },
  shadows,
  typography
});

theme = responsiveFontSizes(theme)

export default theme;
