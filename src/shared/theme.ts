import { ThemeOptions } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const common: ThemeOptions = {
  typography: {
    fontFamily: ['Montserrat'].join(','),
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '999px',
        },
      },
    },

    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: '999px !important',
    //     },
    //   },
    // },

    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       backgroundImage: 'none !important',
    //     },
    //   },
    // },
  },
};

export const DARK: ThemeOptions = {
  ...common,

  palette: {
    mode: 'dark',

    primary: {
      main: '#D8C3AE',
    },

    secondary: {
      main: grey[600],
    },

    background: {
      default: '#363636',
      paper: '#363636',
    },
  },
};

export const LIGHT: ThemeOptions = {
  ...common,

  palette: {
    mode: 'light',

    primary: {
      main: '#D8C3AE',
    },

    secondary: {
      main: grey[400],
    },

    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
};
