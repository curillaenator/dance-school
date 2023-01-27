import React, { FC } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { styled } from '@mui/material/styles';
import { jsonToHtml } from '@src/utils';
import { PriceType } from '@src/types';

const Card = styled(Paper)({
  textAlign: 'center',
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  boxShadow: 'none',
});

interface PriceProps extends PriceType {
  editable?: boolean;
  removePrice?: (price: PriceType) => void;
}

export const Price: FC<PriceProps> = (props) => {
  const { id, name, description, price, editable, removePrice = () => {} } = props;

  return (
    <Grid xs={12} md={6} lg={4}>
      <Card sx={{ position: 'relative' }}>
        {editable && (
          <IconButton
            color='primary'
            sx={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}
            onClick={() => removePrice({ id, name, price, description })}
          >
            <DeleteRoundedIcon />
          </IconButton>
        )}

        <Typography
          variant='h3'
          fontWeight={700}
          color={(theme) => theme.palette.text.primary}
          mb={2}
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
        >
          {name}
        </Typography>

        <Divider
          sx={{
            borderColor: 'rgba(255,255,255,0.5)',
            marginBottom: 2,
          }}
        />

        <Typography variant='subtitle2' color={(theme) => theme.palette.text.primary} mb={2}>
          {price}
        </Typography>

        <Typography variant='subtitle2' color={(theme) => theme.palette.text.primary}>
          {jsonToHtml(description)}
        </Typography>
      </Card>
    </Grid>
  );
};
