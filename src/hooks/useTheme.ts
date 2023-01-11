import { useState, useCallback } from 'react';
import { createTheme, ThemeOptions, useTheme as useGlobalTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { grey } from '@mui/material/colors';

const DARK: ThemeOptions = {
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
};

const LIGHT: ThemeOptions = {
  typography: {
    fontFamily: ['Montserrat'].join(','),
  },

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

export const useTheme = () => {
  const globalTheme = useGlobalTheme();
  const isMobile = useMediaQuery(globalTheme.breakpoints.down('md'));

  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = mode === 'dark' ? DARK : LIGHT;

  return {
    isMobile,
    theme: createTheme(theme),
    toggleTheme,
  };
};
