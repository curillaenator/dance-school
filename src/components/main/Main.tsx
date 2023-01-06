import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Background } from './components/Background';

export const Main: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '100vh',
      }}
    >
      <Background />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, #171717 100%)',
        }}
      />

      <Button variant="contained" size="large">
        Записаться
      </Button>
    </Box>
  );
};
