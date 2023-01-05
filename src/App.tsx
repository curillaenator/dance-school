import React, { FC } from 'react';
import Button from '@mui/material/Button';
import primary from '@mui/material/colors/lime';
// import secondary from '@mui/material/colors/grey';

import { Header } from '@src/components/header';
import { Main } from './components/main';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: primary,
    // secondary: secondary,
  },
});

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main />
    </ThemeProvider>
  );
};
