import { useState, useCallback } from 'react';
import { createTheme } from '@mui/material/styles';

import { THEMES } from '@src/theme';

export const useTheme = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return {
    theme: createTheme(THEMES[mode]),
    toggleTheme,
  };
};
