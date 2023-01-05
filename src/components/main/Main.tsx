import React, { FC } from 'react';
import Box from '@mui/material/Box';

import styled from '@emotion/styled';

import mainPic from '@src/assets/main.jpg';

const ImageStyled = styled.img({
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const Main: FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 'calc(100vh - 120px)',
      }}
    >
      <ImageStyled src={mainPic} />
    </Box>
  );
};
