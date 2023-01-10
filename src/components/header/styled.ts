import AppBar from '@mui/material/AppBar';

import { styled } from '@mui/material/styles';

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  background: `linear-gradient(to bottom, ${theme.palette.background.default} 0%, transparent 100%)`,
  boxShadow: 'none',
}));
