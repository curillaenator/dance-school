import AppBar from '@mui/material/AppBar';
import st from '@emotion/styled';
import { styled } from '@mui/material/styles';

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  // background: `linear-gradient(to bottom, ${theme.palette.background.default} 0%, transparent 100%)`,
  background: theme.palette.background.default,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.secondary.dark}`,
}));

export const LogoStyled = st.img({
  width: '48px',
  height: '48px',
  objectFit: 'cover',
});
