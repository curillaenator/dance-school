import React, { FC, useState } from 'react';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import { Header } from '@src/components/header';
import { Main } from './components/main';
import { Aboutus } from './components/aboutus';

import { ThemeProvider } from '@mui/material/styles';
import { themeDark } from '@src/theme';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// const drawerBleeding = 56;

export const App: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState<boolean>(true);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <ThemeProvider theme={themeDark}>
      {isMobile && (
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box
            sx={{
              width: '320px',
              height: '100%',
              backgroundColor: 'white',
            }}
          />
        </Drawer>
      )}

      <Header isMobile={isMobile} />
      <Main />
      {/* <Aboutus /> */}
    </ThemeProvider>
  );
};
