import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Swipe from '@mui/icons-material/Swipe';

import { TOOLBAR_ITEMS } from '@src/shared/constants';

interface DrawerContentProps {
  drawer: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const DrawerContent: FC<DrawerContentProps> = (props) => {
  const { drawer, openDrawer, closeDrawer } = props;
  const navigate = useNavigate();

  const handleClick = useCallback(
    (to: string) => {
      closeDrawer();
      navigate(to);
    },
    [navigate],
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
          width: '70vw',
          height: '100%',
          backgroundColor: '#171717',
          paddingTop: '120px',
          borderRight: '1px solid rgba(255,255,255, 0.3)',
        }}
        role="presentation"
      >
        <ButtonGroup fullWidth orientation="vertical" size="large" variant="contained">
          {TOOLBAR_ITEMS.map((item) => (
            <Button key={item.title} onClick={() => handleClick(item.to)}>
              {item.title}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </SwipeableDrawer>
  );
};
