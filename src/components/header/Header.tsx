import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import { AppBarStyled, LogoStyled, MenuItemStyled } from './styled';

import { usePopover } from './hooks/usePopover';

import logo from '@src/assets/logo.png';

import { HeaderProps } from './interfaces';

export const Header: FC<HeaderProps> = (props) => {
  const { isMobile } = props;
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
          <LogoStyled src={logo} />

          {!isMobile && (
            <ButtonGroup variant="text" sx={{ minHeight: 56 }}>
              <Button sx={{ width: 120 }}>О НАС</Button>

              <Button sx={{ width: 120 }}>ЦЕНЫ</Button>

              <Button sx={{ width: 120 }}>ТРЕНЕРЫ</Button>

              <Button sx={{ width: 120 }}>НОВОСТИ</Button>

              <Button sx={{ width: 120 }}>КОНТАКТЫ</Button>
            </ButtonGroup>
          )}

          {/* <Button
            size="large"
            aria-label="menu"
            onClick={handleClick}
            sx={{
              minHeight: 56,
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translate(0,-50%)',
            }}
          >
            <MenuIcon color="inherit" />
          </Button> */}
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
          transformOrigin={{
            vertical: -8,
            horizontal: 'right',
          }}
        >
          <MenuItemStyled onClick={handleClose}>Войти</MenuItemStyled>
        </Menu>
      </Toolbar>
    </AppBarStyled>
  );
};
