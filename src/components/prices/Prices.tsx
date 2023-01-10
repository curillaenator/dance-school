import React, { FC, useContext } from 'react';
import { Element } from 'react-scroll';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { Price } from './Price';

import { Context } from '@src/context';

import { usePrices } from './hooks/usePrices';

import { LandingSectionCommonProps } from '@src/types';

interface PricesProps extends LandingSectionCommonProps {
  handleOpen: () => void;
}

export const Prices: FC<PricesProps> = (props) => {
  const { name, handleOpen } = props;

  const { isMobile } = useContext(Context);

  const { prices } = usePrices();

  return (
    <Element name={name}>
      <Box
        sx={{
          width: '100%',
        }}
        paddingY={8}
        bgcolor={(theme) => theme.palette.success.main}
      >
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          align="center"
          color={(theme) => theme.palette.text.primary}
          fontWeight={500}
          paddingX={4}
          sx={{
            zIndex: 0,
            maxWidth: '1024px',
            margin: '0 auto 32px',
          }}
        >
          Цены
        </Typography>

        <Grid
          container
          spacing={8}
          sx={{
            maxWidth: '1024px',
            margin: '0 auto 64px',
          }}
        >
          {prices.map((price) => (
            <Price key={price.id} {...price} />
          ))}
        </Grid>

        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={handleOpen}
            sx={{
              height: 64,
              padding: '0 64px',
              margin: '0 auto',
            }}
          >
            Оставить заявку
          </Button>
        </Box>
      </Box>
    </Element>
  );
};
