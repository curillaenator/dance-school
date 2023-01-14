import { useState, useCallback } from 'react';
import { createTheme, useTheme as useGlobalTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { DARK, LIGHT } from '@src/shared/theme';

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
