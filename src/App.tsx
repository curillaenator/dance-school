import React, { FC } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@mui/material/styles';

import { Layout } from '@src/layout';

import { Landing } from '@src/pages/landing';
import { Applications } from '@src/pages/applications';

import { AppDrawer } from './components/appdrawer';

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
              <Route index element={<Landing />} />

              {authData.uid?.isAdmin && <Route path="applications" element={<Applications />} />}

              <Route path="*" element={<Landing />} />
            </Route>
          </Routes>

          {isMobile && <AppDrawer {...appDrawer} />}
        </ThemeProvider>
      </Context.Provider>
    </BrowserRouter>
  );
};
