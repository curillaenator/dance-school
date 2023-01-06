import React, { FC } from 'react';

import { Header } from '@src/components/header';
import { Main } from './components/main';

import { ThemeProvider } from '@mui/material/styles';
import { themeDark } from '@src/theme';

export const App: FC = () => {
  return (
    <ThemeProvider theme={themeDark}>
      <Header />
      <Main />
    </ThemeProvider>
  );
};
