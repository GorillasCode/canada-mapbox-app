import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b71c1c',
    },
    secondary: {
      main: '#d32f2f',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          letterSpacing: 1,
          fontWeight: 'bold',
          padding: '12px 16px',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #b71c1c 30%, #d32f2f 90%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(45deg, #9a0007 30%, #c62828 90%)',
          },
        },
      },
    },
  },
});

export default theme;