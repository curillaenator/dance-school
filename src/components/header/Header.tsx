import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import MenuIcon from '@mui/icons-material/Menu';
import { List, Logout, Settings } from '@mui/icons-material';

import { Context } from '@src/context';
import { usePopover } from './hooks/usePopover';

import { TOOLBAR_ITEMS } from './constants';
import { AppBarStyled, LogoStyled } from './styled';
import logo from '@src/assets/logo.png';

export const Header: FC = () => {
  const { uid, signIn, isMobile, logOut } = useContext(Context);
  const { target, popoverId, open, handleClick, handleClose } = usePopover({});

  const navigate = useNavigate();

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
          {/* <LogoStyled src={logo} /> */}

          {!isMobile && (
            <ButtonGroup variant="text" sx={{ minHeight: 56 }}>
              {TOOLBAR_ITEMS.map((item) => (
                <Button sx={{ width: 120 }} key={item.title} onClick={() => navigate(item.to)}>
                  {item.title}
                </Button>
              ))}
            </ButtonGroup>
          )}

          {!uid && (
            <Button
              size="large"
              onClick={signIn}
              sx={{
                minHeight: 56,
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translate(0,-50%)',
              }}
            >
              <MenuIcon color="inherit" />
            </Button>
          )}

          {uid?.isAdmin && (
            <Button
              onClick={handleClick}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translate(0,-50%)',
              }}
            >
              <Avatar src={uid.photoURL || undefined} sx={{ width: 56, height: 56 }} />
            </Button>
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
            <MenuItem
              onClick={() => {
                navigate('/applications');
                handleClose();
              }}
              sx={{ marginBottom: 1, height: 56 }}
            >
              <ListItemIcon>
                <List fontSize="medium" />
              </ListItemIcon>
              <ListItemText>Заявки</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
              }}
              sx={{ marginBottom: 1, height: 56 }}
            >
              <ListItemIcon>
                <Settings fontSize="medium" />
              </ListItemIcon>
              <ListItemText>Настройки</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={() => {
                logOut();
                handleClose();
              }}
              sx={{ height: 56 }}
            >
              <ListItemIcon>
                <Logout fontSize="medium" />
              </ListItemIcon>
              <ListItemText>Выйти</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      </Toolbar>
    </AppBarStyled>
  );
};
