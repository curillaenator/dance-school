import { ThemeOptions } from '@mui/material/styles';
import { ThemeType } from '@src/types';

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
      background: {
        default: '#ffffff',
        paper: '#e6e6e6',
      },
    },
  },
};
