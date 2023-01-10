import React, { FC } from 'react';
import { Element } from 'react-scroll';

import { Box } from '@mui/material';

import { LandingSectionCommonProps } from '@src/types';

export const Aboutus: FC<LandingSectionCommonProps> = (props) => {
  const { name } = props;

  return (
    <Element name={name}>
      <Box
        sx={{
          height: '80vh',
        }}
      ></Box>
    </Element>
  );
};
