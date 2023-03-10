import React, { FC, useContext, useCallback, useState } from 'react';
import { Element } from 'react-scroll';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { Price } from '@src/components/price';

import { Context } from '@src/context';

import { LandingSectionCommonProps } from '@src/types';

interface PricesProps extends LandingSectionCommonProps {
  handleOpen: () => void;
}

export const Prices: FC<PricesProps> = (props) => {
  const { name, handleOpen, maxWidth } = props;
  const { isMobile, prices } = useContext(Context);

  const [nameHeights, setNameHeights] = useState<number[]>([]);

  const getNameHeight = useCallback((nameHeight: number) => {
    setNameHeights((prev) => [...prev, nameHeight]);
  }, []);

  const maxNameHeight = nameHeights.length ? Math.max(...nameHeights) : undefined;

  return (
    <Element name={name}>
      <Box width='100%' paddingY={16} bgcolor={(theme) => theme.palette.error.dark}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          align='center'
          color={(theme) => theme.palette.text.primary}
          fontWeight={500}
          paddingX={4}
          sx={{
            zIndex: 0,
            maxWidth,
            margin: '0 auto 32px',
          }}
        >
          Цены
        </Typography>

        <Grid
          container
          spacing={8}
          sx={{
            maxWidth,
            margin: '0 auto 64px',
          }}
        >
          {prices.map((price) => (
            <Price key={price.id} {...price} getNameHeight={getNameHeight} nameHeight={maxNameHeight} />
          ))}
        </Grid>

        <Box display='flex' justifyContent='center'>
          <Button
            variant='contained'
            size='large'
            onClick={handleOpen}
            sx={{
              height: 64,
              padding: '0 64px',
              margin: '0 auto',
            }}
          >
            Позвоните мне
          </Button>
        </Box>
      </Box>
    </Element>
  );
};
