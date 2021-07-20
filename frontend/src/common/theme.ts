import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createTheme({
  overrides: {
    MuiLink: {
      root: {
        '& .MuiTypography-body1': {
          color: 'white'
        }
      }
    },
    MuiTypography: {
      body1: {
        fontSize: '0.875rem',
        color: 'rgba(255,255,255,0.72)'
      }
    }
  },
  palette: {
   
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: 'rgba(255,255,255,0.72)',
      light: 'rgba(255,255,255,0.72)'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;