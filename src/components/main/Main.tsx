import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { Background, Application } from './components';

import { useModalControl } from './hooks/useModalControl';

import { ct } from './constants';

export const Main: FC = () => {
  const { open, handleClose, handleOpen } = useModalControl();

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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          transform: 'translateY(-4vh)',
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            color: 'white',
            zIndex: 0,
            fontWeight: 500,
            padding: '0 32px',
          }}
        >
          {ct.title}
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            color: 'white',
            zIndex: 0,
            padding: '32px',
          }}
        >
          {ct.subtitle}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleOpen}
          sx={{
            height: 64,
            // borderRadius: '32px',
          }}
        >
          Записаться
        </Button>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              width: '400px',
              maxWidth: '90vw',
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              // height: 300,
              backgroundColor: '#171717',
              borderRadius: '16px',
              padding: '16px 16px',
            }}
          >
            <Application handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
