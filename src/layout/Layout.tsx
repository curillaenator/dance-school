import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
import { Header } from '@src/components/header';
// import { themeDark } from '@src/theme';

export const Layout: FC = () => {
  return (
    // <ThemeProvider theme={themeDark}>
    <>
      <Header />
      <Outlet />
    </>

    // </ThemeProvider>
  );
};
