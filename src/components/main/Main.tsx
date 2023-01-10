import React, { FC } from 'react';
import { Element } from 'react-scroll';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Background } from './components';
import { LogoFull } from '@src/components/logo/Logo';

// import { Context } from '@src/context';
import { LandingSectionCommonProps } from '@src/types';

interface MainProps extends LandingSectionCommonProps {
  handleOpen: () => void;
}

export const Main: FC<MainProps> = (props) => {
  const { name, maxWidth, handleOpen } = props;

  // const { isMobile } = useContext(Context);

  return (
    <Element name={name}>
      <Box position="relative" height="100vh" width="100%">
        <Background />

        <Box
          width="100%"
          maxWidth={maxWidth}
          mx="auto"
          pt="160px"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: 'translateY(0)',
          }}
        >
          <Box
            width="100%"
            maxHeight="480px"
            overflow="hidden"
            display="flex"
            alignItems="center"
            mb={6}
            justifyContent="center"
          >
            <LogoFull width={800} height={800} />
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={handleOpen}
            sx={{
              height: 64,
              padding: '0 64px',
              marginX: 'auto',
            }}
          >
            Записаться
          </Button>
        </Box>
      </Box>
    </Element>
  );
};
