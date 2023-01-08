import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';

import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import MenuIcon from '@mui/icons-material/Menu';
import { List, Logout, Settings, SwipeRight } from '@mui/icons-material';

import { Context } from '@src/context';
import { usePopover } from './hooks/usePopover';

import { TOOLBAR_ITEMS } from '@src/shared/constants';
import { AppBarStyled } from './styled';

export const Header: FC = () => {
  const { uid, signIn, isMobile, logOut, openDrawer } = useContext(Context);
  const { target, popoverId, open, handleClick, handleClose } = usePopover({});

  const navigate = useNavigate();

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
        {isMobile && (
          <IconButton
            size="large"
            onClick={openDrawer}
            color="primary"
            sx={{
              // minHeight: 56,
              position: 'absolute',
              top: '50%',
              left: '32px',
              transform: 'translate(0,-50%)',
            }}
          >
            <SwipeRight color="inherit" />
          </IconButton>
        )}

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
              right: '32px',
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
              right: '32px',
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
            sx={{ height: 48 }}
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
            sx={{ height: 48 }}
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
            sx={{ height: 48 }}
          >
            <ListItemIcon>
              <Logout fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Выйти</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </AppBarStyled>
  );
};
