import React, { FC, useContext } from 'react';
import { Element } from 'react-scroll';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { Coach } from './Coach';

import { Context } from '@src/context';
import { useCoaches } from './hooks/useCoaches';

import { LandingSectionCommonProps } from '@src/types';

export const Coaches: FC<LandingSectionCommonProps> = (props) => {
  const { name, maxWidth } = props;

  const { isMobile } = useContext(Context);

  const { coaches } = useCoaches();

  return (
    <Element name={name}>
      <Box paddingTop={16}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          align="center"
          sx={{
            color: 'white',
            zIndex: 0,
            maxWidth,
            margin: '0 auto',
            fontWeight: 500,
            padding: '0 32px',
          }}
        >
          Наши тренеры
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            color: 'white',
            zIndex: 0,
            padding: '32px',
            maxWidth,
            margin: '0 auto',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, tenetur quas sunt iure ratione debitis
          dolore tempore, soluta qui, fuga numquam eligendi?
        </Typography>

        <Box
          sx={{
            width: '100%',
          }}
          paddingY={8}
          bgcolor={(theme) => theme.palette.primary.dark}
        >
          <Grid
            container
            spacing={8}
            sx={{
              maxWidth,
              margin: '0 auto',
            }}
          >
            {coaches.map((coach) => (
              <Coach key={coach.id} {...coach} />
            ))}
          </Grid>
        </Box>
      </Box>
    </Element>
  );
};
