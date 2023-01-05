import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

import { usePopover } from './hooks/usePopover';

import { toolbar } from './constants';

// const StyledToolbar = styled(Toolbar)(() => ({
//   minHeight: 120,
//   justifyContent: 'space-between',
// }));

export const Header: FC = () => {
  const { target, popoverId, open, handleClick, handleClose } = usePopover({});

  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            minHeight: 120,
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'çenter',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="h3">Dance</Typography>

            <ButtonGroup>
              {toolbar.map((button) => (
                <Button key={button} variant="text" color="secondary">
                  {button}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          <IconButton size="large" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
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
    </AppBar>
    // </Box>
  );
};
