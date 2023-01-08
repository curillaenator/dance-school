import { createTheme } from '@mui/material/styles';
import primary from '@mui/material/colors/yellow';
import secondary from '@mui/material/colors/blueGrey';

export const themeDark = createTheme({
  palette: {
    mode: 'dark',
    primary,
    secondary,
  },
});
