import React, { FC, useCallback } from 'react';
import { scroller } from 'react-scroll';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { Logo } from '@src/components/logo';

import { TOOLBAR_ITEMS, SCROLL_SPEED } from '@src/shared/constants';

interface DrawerContentProps {
  drawer: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const AppDrawer: FC<DrawerContentProps> = (props) => {
  const { drawer, openDrawer, closeDrawer } = props;

  const handleScroll = useCallback(
    (to: string) => {
      closeDrawer();

      scroller.scrollTo(to, {
        duration: SCROLL_SPEED,
        smooth: true,
      });
    },
    [closeDrawer],
  );

  return (
    <SwipeableDrawer
      anchor="left"
      open={drawer}
      onOpen={openDrawer}
      onClose={closeDrawer}
      ModalProps={{
        keepMounted: true,
      }}
      swipeAreaWidth={32}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8vh',
          width: '70vw',
          height: '100%',
          backgroundColor: 'transparent',
          paddingTop: '15vh',
          borderRight: '1px solid rgba(255,255,255, 0.3)',
        }}
        role="presentation"
      >
        <ButtonGroup fullWidth orientation="vertical" size="large" variant="contained">
          {TOOLBAR_ITEMS.map((item) => (
            <Button key={item.title} onClick={() => handleScroll(item.to)}>
              {item.title}
            </Button>
          ))}
        </ButtonGroup>

        <Box
          width="100%"
          maxHeight="400px"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Logo width={600} height={600} />
        </Box>

        {/* <ImgStyled src={svg} /> */}
      </Box>
    </SwipeableDrawer>
  );
};
