import React, { FC, useContext } from 'react';
import { Element } from 'react-scroll';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

import { Background, Application } from './components';

import { Context } from '@src/context';
import { useModalControl } from './hooks/useModalControl';

import { ct } from './constants';

import { LandingSectionCommonProps } from '@src/types';

export const Main: FC<LandingSectionCommonProps> = (props) => {
  const { name } = props;

  const { isMobile } = useContext(Context);
  const { open, handleClose, handleOpen } = useModalControl();

  return (
    <Element name={name}>
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
            background: 'linear-gradient(to bottom, #171717 0%, transparent 20%, transparent 80%, transparent 100%)',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, transparent 0%, transparent 17%, #171717 100%)',
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
            variant={isMobile ? 'h3' : 'h2'}
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
              maxWidth: '1024px',
              margin: '0 auto',
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
              padding: '0 64px',
            }}
          >
            Записаться
          </Button>
        </Box>

        <Dialog onClose={handleClose} open={open}>
          <Application handleClose={handleClose} />
        </Dialog>
      </Box>
    </Element>
  );
};
