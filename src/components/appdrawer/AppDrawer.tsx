import React, { FC, useCallback } from 'react';
import { scroller } from 'react-scroll';
import styled from '@emotion/styled';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { TOOLBAR_ITEMS, SCROLL_SPEED } from '@src/shared/constants';

interface DrawerContentProps {
  drawer: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const ImgStyled = styled.img({
  width: '100%',
  objectFit: 'contain',
  padding: '0 32px',
});

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
      anchor='left'
      open={drawer}
      onOpen={openDrawer}
      onClose={closeDrawer}
      ModalProps={{
        keepMounted: true,
      }}
      swipeAreaWidth={56}
    >
      <Box
        width='70vw'
        maxWidth='256px'
        height='100%'
        pt='15vh'
        borderRight={(theme) => `1px solid ${theme.palette.primary.main}`}
        role='presentation'
      >
        <ButtonGroup
          fullWidth
          orientation='vertical'
          size='large'
          variant='contained'
          sx={{
            marginBottom: 8,
          }}
        >
          {TOOLBAR_ITEMS.map((item) => (
            <Button
              key={item.title}
              onClick={() => handleScroll(item.to)}
              sx={{
                borderRadius: 0,
              }}
            >
              {item.title}
            </Button>
          ))}
        </ButtonGroup>

        <ImgStyled src='images/logo.png' />
      </Box>
    </SwipeableDrawer>
  );
};
