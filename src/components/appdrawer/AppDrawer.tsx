import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { TOOLBAR_ITEMS } from '@src/shared/constants';
import svg from '@src/assets/drawerDecor1.svg';

const ImgStyled = styled.img({
  height: '50%',
});

interface DrawerContentProps {
  drawer: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const AppDrawer: FC<DrawerContentProps> = (props) => {
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8vh',
          width: '70vw',
          height: '100%',
          backgroundColor: '#171717',
          paddingTop: '15vh',
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

        <ImgStyled src={svg} />
      </Box>
    </SwipeableDrawer>
  );
};
