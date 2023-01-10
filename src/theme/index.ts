import { ThemeOptions } from '@mui/material/styles';
import { ThemeType } from '@src/types';
import { grey } from '@mui/material/colors';
// import gray

export const THEMES: Record<ThemeType, ThemeOptions> = {
  dark: {
    typography: {
      fontFamily: ['Montserrat'].join(','),
    },
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
  },
  light: {
    typography: {
      fontFamily: ['Montserrat'].join(','),
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#D8C3AE',
      },
      secondary: grey,
      background: {
        default: '#ffffff',
        paper: '#e6e6e6',
      },
    },
  },
};
