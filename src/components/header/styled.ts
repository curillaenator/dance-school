import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';

import st from '@emotion/styled';
import { styled } from '@mui/material/styles';

export const ButtonStyled = styled(Button)({
  padding: '0',
  minWidth: 96,
  height: 96,
  color: 'white',
  borderRadius: '50%',
  ':hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export const IconButtonStyled = styled(ButtonStyled)({
  position: 'absolute',
  top: '50%',
  right: 0,
  transform: 'translate(0,-50%)',
});

export const AppBarStyled = styled(AppBar)({
  backgroundColor: 'transparent',
  background: 'linear-gradient(to bottom, #171717, transparent 100%)',
  boxShadow: 'none',
});

export const LogoStyled = st.img({
  width: 96,
  height: 96,
  objectFit: 'cover',
  borderRadius: '50%',
  margin: '0 16px',
  flexShrink: 0,
});

export const MenuItemStyled = styled(MenuItem)({
  minWidth: 200,
});
