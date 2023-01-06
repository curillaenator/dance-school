import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import { AppBarStyled, ButtonStyled, LogoStyled, IconButtonStyled, MenuItemStyled } from './styled';

import { usePopover } from './hooks/usePopover';

import logo from '@src/assets/logo.png';

export const Header: FC = () => {
  const { target, popoverId, open, handleClick, handleClose } = usePopover({});

  return (
    <AppBarStyled>
      <Toolbar variant="regular">
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
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
          <MenuItemStyled onClick={handleClose}>Войти</MenuItemStyled>
        </Menu>
      </Toolbar>
    </AppBarStyled>
  );
};
