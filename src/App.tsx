import React, { FC } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from '@src/layout/Layout';
import { Main } from './components/main';
import { Aboutus } from './components/aboutus';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Context } from '@src/context';
import { useAuthControl } from '@src/hooks/useAuthControl';

import { FB_APP } from '@src/config';

getAnalytics(FB_APP);

export const App: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const authData = useAuthControl();

  return (
    <Context.Provider value={{ ...authData, isMobile }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="aboutus" element={<Aboutus />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};
