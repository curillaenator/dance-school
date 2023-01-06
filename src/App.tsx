import React, { FC } from 'react';

import { Header } from '@src/components/header';
import { Main } from './components/main';
import { Aboutus } from './components/aboutus';

import { ThemeProvider } from '@mui/material/styles';
import { themeDark } from '@src/theme';

export const App: FC = () => {
  return (
    <ThemeProvider theme={themeDark}>
      <Header />
      <Main />
      <Aboutus />
    </ThemeProvider>
  );
};
