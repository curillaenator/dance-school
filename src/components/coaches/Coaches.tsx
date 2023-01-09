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
  const { name } = props;

  const { isMobile } = useContext(Context);

  const { coaches } = useCoaches();

  return (
    <Element name={name}>
      <Box
        sx={{
          padding: '120px 0',
        }}
      >
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          align="center"
          sx={{
            color: 'white',
            zIndex: 0,
            fontWeight: 500,
            padding: '0 32px',
          }}
        >
          Тренеры
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
          Наши преподаватели — настоящие профессионалы с большим опытом работы и наградами за престижные танцевальные
          соревнования.
        </Typography>

        <Box
          sx={{
            width: '100%',
          }}
          bgcolor={(theme) => theme.palette.primary.dark}
        >
          <Grid
            container
            spacing={8}
            sx={{
              maxWidth: '1024px',
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
