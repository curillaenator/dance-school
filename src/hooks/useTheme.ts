import { useState, useCallback } from 'react';
import { createTheme, ThemeOptions } from '@mui/material/styles';
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

export const useTheme = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = mode === 'dark' ? DARK : {};

  return {
    theme: createTheme(theme),
    toggleTheme,
  };
};
