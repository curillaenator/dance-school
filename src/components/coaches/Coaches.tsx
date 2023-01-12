import React, { FC, useContext } from 'react';
import { Element } from 'react-scroll';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { Coach } from './Coach';

import { Context } from '@src/context';

import { LandingSectionCommonProps } from '@src/types';

export const Coaches: FC<LandingSectionCommonProps> = (props) => {
  const { name, maxWidth } = props;

  const { isMobile, coaches, staticContent } = useContext(Context);

  return (
    <Element name={name}>
      <Box paddingTop={16}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          align="center"
          color={(theme) => theme.palette.text.primary}
          px={4}
          mb={4}
          mx="auto"
          fontWeight={500}
          maxWidth={maxWidth}
          zIndex={0}
        >
          {staticContent.coaches.title}
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color={(theme) => theme.palette.text.secondary}
          px={4}
          mb={8}
          mx="auto"
          zIndex={0}
        >
          {staticContent.coaches.subtitle}
        </Typography>

        <Box width="100%" paddingY={8} bgcolor={(theme) => theme.palette.primary.main}>
          <Grid container spacing={8} marginX="auto" maxWidth={maxWidth}>
            {coaches.map((coach) => (
              <Coach key={coach.id} {...coach} />
            ))}
          </Grid>
        </Box>
      </Box>
    </Element>
  );
};
