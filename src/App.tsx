import React, { FC, useCallback, useState } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { Layout } from '@src/layout';

import { Landing } from '@src/pages/landing';
import { Settings } from '@src/pages/settings';
import { Applications } from '@src/pages/applications';

import { AppDrawer } from './components/appdrawer';

import { Context } from '@src/context';

import { useAuthControl } from '@src/hooks/useAuthControl';
import { usePhotos } from '@src/hooks/usePhotos';
import { useDatabase } from '@src/hooks/useDatabase';
import { useDrawer } from '@src/hooks/useDrawer';
import { useTheme } from '@src/hooks/useTheme';

import { FB_APP } from '@src/config';

getAnalytics(FB_APP);

export const App: FC = () => {
  const location = useLocation();
  const authData = useAuthControl();
  const appDrawer = useDrawer();

  const databaseData = useDatabase();
  const storageData = usePhotos();

  const appTheme = useTheme();

  const [loading, setLoading] = useState(false);
  const handleLoading = useCallback((load: boolean) => setLoading(load), []);

  return (
    <Context.Provider
      value={{
        ...authData,
        ...storageData,
        ...databaseData,
        ...appDrawer,
        ...appTheme,
        loading,
        setLoading: handleLoading,
      }}
    >
      <ThemeProvider theme={appTheme.theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />

            {authData.uid?.isAdmin && (
              <>
                <Route path="applications" element={<Applications />} />
                <Route path="settings" element={<Settings />} />
              </>
            )}

            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            <Route path="*" element={<Landing />} />
          </Route>
        </Routes>

        {appTheme.isMobile && location.pathname === '/' && <AppDrawer {...appDrawer} />}
      </ThemeProvider>
    </Context.Provider>
  );
};
