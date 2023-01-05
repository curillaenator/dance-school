import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

import st from '@emotion/styled';

import { styled } from '@mui/material/styles';

import { usePopover } from './hooks/usePopover';

import logo from '@src/assets/logo.png';

const IconButtonStyled = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  right: 0,
  transform: 'translate(0,-50%)',
});

const ButtonStyled = styled(Button)({
  padding: '0 32px',
  color: 'white',
  ':hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

const AppBarStyled = styled(AppBar)({
  backgroundColor: 'transparent',
  background: 'linear-gradient(to bottom, #171717, transparent 100%)',
  boxShadow: 'none',
});

const LogoStyled = st.img({
  width: 96,
  height: 96,
  objectFit: 'cover',
  borderRadius: '50%',
  margin: '16px 16px 0',
  flexShrink: 0,
});

export const Header: FC = () => {
  const { target, popoverId, open, handleClick, handleClose } = usePopover({});

  return (
    <AppBarStyled>
      <Toolbar variant="regular">
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'çenter',
            justifyContent: 'center',
            flexWrap: 'wrap',
            // gap: 4,
            position: 'relative',
            minHeight: 120,
          }}
        >
          <ButtonStyled>О НАС</ButtonStyled>
          <ButtonStyled>ЦЕНЫ</ButtonStyled>

          <LogoStyled src={logo} />

          <ButtonStyled>НОВОСТИ</ButtonStyled>
          <ButtonStyled>КОНТАКТЫ</ButtonStyled>

          <IconButtonStyled size="large" aria-label="menu" onClick={handleClick}>
            <MenuIcon color="inherit" />
          </IconButtonStyled>
        </Box>

        <Menu
          id={popoverId}
          open={open}
          anchorEl={target}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Войти</MenuItem>
        </Menu>
      </Toolbar>
    </AppBarStyled>
  );
};
