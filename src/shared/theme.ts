import { ThemeOptions } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const common: ThemeOptions = {
  typography: {
    fontFamily: ['Inter'].join(','),
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
        sizeLarge: {
          height: '56px',
        },
        sizeMedium: {
          height: '48px',
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        rounded: {
          borderRadius: '8px',
          boxShadow: 'inset 0 0 0 2px var(--color-primary)',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundImage: 'none',
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
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
      // default: '#363636',
      // paper: '#363636',
      default: grey[900],
      paper: grey[900],
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
