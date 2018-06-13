import {createMuiTheme } from '@material-ui/core/styles';

export const colors = {
  primary: '#D1347F',
  primary_darker: '#be3175',
  primary_lighter: '#ed4495',
  disabled: '#f3f3f3',
  disabled_text: '#f7f7f7',
  white: '#fff',
}

export default createMuiTheme({
  palette: {
    primary: { 
      main: colors.primary,
      dark: colors.primary_darker,
      contrastText: colors.white
    }, 
    secondary: { 
      main: colors.white,
      dark: colors.disabled,
      contrastText: colors.primary
    }, 
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      root: { // Global variabbles of buttons
        disableRipple: true,
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: 600,
      },
      contained: {
        boxShadow: 'none',
        border: '1px solid #ccc',
        '&:active': {
            boxShadow: 'none',
          },
          '&:focus': {
            boxShadow: 'none'
          },
      },
      flat: { // Normal Button
        disableRipple: true,
        boxShadow: 'none',
        '&:hover': {
          bosShadow: 'none'
        },'&:active': {
          bosShadow: 'none'
        }
      },
      disabled: { // Disabled Button
        background: colors.disabled,
        color: colors.disabled_text
      }
    }
  }
});
