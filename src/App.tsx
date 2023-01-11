import React, { FC, useCallback, useState, lazy, Suspense } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { Layout } from '@src/layout';

import { Landing } from '@src/pages/landing';

import { AppDrawer } from './components/appdrawer';

import { Context } from '@src/context';
import { useAuthControl } from '@src/hooks/useAuthControl';
import { usePhotos } from '@src/hooks/usePhotos';
import { useDrawer } from '@src/hooks/useDrawer';
import { useTheme } from '@src/hooks/useTheme';

import { FB_APP } from '@src/config';

const LazySettings = lazy(() => import('@src/pages/settings'));
const LazyApplications = lazy(() => import('@src/pages/applications'));

getAnalytics(FB_APP);

export const App: FC = () => {
  const location = useLocation();
  const authData = useAuthControl();
  const appPhotos = usePhotos();
  const appDrawer = useDrawer();

  const { isMobile, theme: currentTheme, toggleTheme } = useTheme();

  const [loading, setLoading] = useState(false);
  const handleLoading = useCallback((load: boolean) => setLoading(load), []);

  return (
    <Context.Provider
      value={{ ...authData, ...appPhotos, ...appDrawer, isMobile, toggleTheme, loading, setLoading: handleLoading }}
    >
      <ThemeProvider theme={currentTheme}>
        <Suspense fallback={<div>Подождите...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />

              {authData.uid?.isAdmin && (
                <>
                  <Route path="applications" element={<LazyApplications />} />

                  <Route path="settings" element={<LazySettings />} />
                </>
              )}

              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
              <Route path="*" element={<Landing />} />
            </Route>
          </Routes>
        </Suspense>

        {isMobile && location.pathname === '/' && <AppDrawer {...appDrawer} />}
      </ThemeProvider>
    </Context.Provider>
  );
};
