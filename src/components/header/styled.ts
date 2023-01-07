import AppBar from '@mui/material/AppBar';

import st from '@emotion/styled';
import { styled } from '@mui/material/styles';

export const AppBarStyled = styled(AppBar)({
  backgroundColor: 'transparent',
  background: 'none',
  boxShadow: 'none',
});

export const LogoStyled = st.img({
  position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translate(0,-50%)',
  width: 96,
  height: 96,
  objectFit: 'cover',
  borderRadius: '50%',
});
