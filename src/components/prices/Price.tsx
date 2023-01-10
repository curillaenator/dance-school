import React, { FC } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import { PriceType } from '@src/types';

const Card = styled(Paper)({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  boxShadow: 'none',
});

export const Price: FC<PriceType> = (props) => {
  const { name, description, price } = props;

  return (
    <Grid xs={12} md={6} lg={4}>
      <Card>
        <Typography variant="h4" fontWeight={500} color={(theme) => theme.palette.text.primary} mb={1}>
          {name}
        </Typography>

        <Divider />

        <Typography variant="subtitle2" color={(theme) => theme.palette.text.primary} mb={1}>
          {price}
        </Typography>

        <Typography variant="subtitle2" color={(theme) => theme.palette.text.primary}>
          {description}
        </Typography>
      </Card>
    </Grid>
  );
};
