import React, { FC, useContext } from 'react';
import { Element } from 'react-scroll';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

import { Background } from './components';

import { Context } from '@src/context';
import { LandingSectionCommonProps } from '@src/types';

import logoFullImage from '@src/assets/logoFull.png';

interface MainProps extends LandingSectionCommonProps {
  handleOpen: () => void;
}

const ImgStyled = styled.img({
  width: '100%',
  maxWidth: '400px',
  height: '100%',
  objectFit: 'contain',
  padding: '0 32px',
});

export const Main: FC<MainProps> = (props) => {
  const { name, handleOpen } = props;

  const { isMobile } = useContext(Context);

  return (
    <Element name={name}>
      <Box position="relative" height="100vh" width="100%">
        <Background />

        <Box
          width="100%"
          height="100%"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateY(0)',
          }}
        >
          <Box>
            <ImgStyled src={logoFullImage} draggable="false" />
          </Box>

          <Typography
            variant="subtitle1"
            fontSize={isMobile ? 22 : 26}
            color={(theme) => theme.palette.text.primary}
            mb={6}
          >
            Танцевальная Студия
          </Typography>

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
