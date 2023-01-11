import React, { FC, useContext, useCallback } from 'react';
import { scroller } from 'react-scroll';
import { useNavigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';

import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';

import { Context } from '@src/context';
import { usePopover } from './hooks/usePopover';

import { TOOLBAR_ITEMS, SCROLL_SPEED } from '@src/shared/constants';
import { AppBarStyled, LogoStyled } from './styled';

import logoImg from '@src/assets/logo.png';

export const Header: FC = () => {
  const { uid, isMobile, loading, logOut, openDrawer } = useContext(Context);
  const { target, popoverId, open, handleClick, handleClose } = usePopover({});

  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === '/';
  const buttonSize = '48px';

  const handleScroll = useCallback((to: string) => {
    scroller.scrollTo(to, {
      duration: SCROLL_SPEED,
      smooth: true,
    });
  }, []);

  // костыль для lazy, чтобы меню успело закрыться перед переходом
  const handleNavigate = useCallback(
    (to: string) => {
      const closed = new Promise((res) => {
        handleClose();
        setTimeout(() => res(true), 0);
      });

      closed.then(() => navigate(to));
    },
    [handleClose, navigate],
  );

  return (
    <AppBarStyled>
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
        {isMobile && isLanding && (
          <IconButton
            size="large"
            onClick={openDrawer}
            color="primary"
            sx={{
              position: 'absolute',
              top: '50%',
              left: isMobile ? '16px' : '32px',
              transform: 'translate(0,-50%)',
            }}
          >
            {<SwipeRightIcon color="inherit" />}
          </IconButton>
        )}

        {!isLanding && (
          <IconButton
            size="large"
            onClick={() => navigate('/')}
            color="primary"
            sx={{
              position: 'absolute',
              top: '50%',
              left: isMobile ? '16px' : '32px',
              transform: 'translate(0,-50%)',
            }}
          >
            {<ArrowBackIcon color="inherit" />}
          </IconButton>
        )}

        {!isMobile && isLanding && (
          <ButtonGroup variant="text">
            {TOOLBAR_ITEMS.map((item) => (
              <Button key={item.title} sx={{ width: 120, minHeight: 56 }} onClick={() => handleScroll(item.to)}>
                {item.title}
              </Button>
            ))}
          </ButtonGroup>
        )}

        {!isLanding && loading && <CircularProgress />}

        {uid?.isAdmin ? (
          <Button
            onClick={handleClick}
            sx={{
              position: 'absolute',
              top: '50%',
              right: isMobile ? '24px' : '32px',
              transform: 'translate(0,-50%)',
              padding: 0,
              minWidth: buttonSize,
            }}
          >
            <Avatar
              src={uid.photoURL || undefined}
              sx={{
                width: buttonSize,
                height: buttonSize,
              }}
            />
          </Button>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              right: isMobile ? '24px' : '32px',
              transform: 'translate(0,-50%)',
            }}
          >
            <LogoStyled src={logoImg} />
          </Box>
        )}
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
        <MenuList sx={{ minWidth: 200 }}>
          <MenuItem onClick={() => handleNavigate('/applications')} sx={{ height: 48 }}>
            <ListItemIcon>
              <ListIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Заявки</ListItemText>
          </MenuItem>

          <MenuItem onClick={() => handleNavigate('/settings')} sx={{ height: 48 }}>
            <ListItemIcon>
              <SettingsIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Настройки</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              logOut();
              handleClose();
            }}
            sx={{ height: 48 }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Выйти</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </AppBarStyled>
  );
};
