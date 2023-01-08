import React, { FC } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { Layout } from '@src/layout/Layout';
import { AppDrawer } from './components/appdrawer';
import { Main } from './components/main';
import { Aboutus } from './components/aboutus';
import { Applications } from './components/applications';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Context } from '@src/context';
import { useAuthControl } from '@src/hooks/useAuthControl';
import { usePhotos } from '@src/hooks/usePhotos';
import { useDrawer } from '@src/hooks/useDrawer';

import { themeDark } from '@src/theme';
import { FB_APP } from '@src/config';

getAnalytics(FB_APP);

export const App: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const authData = useAuthControl();
  const appPhotos = usePhotos();
  const appDrawer = useDrawer();

  return (
    <BrowserRouter>
      <Context.Provider value={{ ...authData, ...appPhotos, isMobile, ...appDrawer }}>
        <ThemeProvider theme={themeDark}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="aboutus" element={<Aboutus />} />
              {authData.uid?.isAdmin && <Route path="applications" element={<Applications />} />}
              <Route path="*" element={<Main />} />
            </Route>
          </Routes>

          {isMobile && <AppDrawer {...appDrawer} />}
        </ThemeProvider>
      </Context.Provider>
    </BrowserRouter>
  );
};
