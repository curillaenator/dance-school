import React, { FC, useRef, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';

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
  nameHeight?: number;
  removePrice?: (price: PriceType) => void;
  updatePrice?: (price: PriceType) => void;
  getNameHeight?: (height: number) => void;
}

export const Price: FC<PriceProps> = (props) => {
  const {
    id,
    name,
    description,
    price,
    editable,
    nameHeight,
    removePrice = () => {},
    updatePrice = () => {},
    getNameHeight = () => {},
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nameHeight && ref.current?.clientHeight) getNameHeight(ref.current?.clientHeight);
  }, [nameHeight, getNameHeight]);

  return (
    <Grid xs={12} md={6} lg={4}>
      <Card sx={{ position: 'relative' }}>
        {editable && (
          <>
            <IconButton
              color='primary'
              sx={{ position: 'absolute', top: -32, right: 48, zIndex: 10 }}
              onClick={() => updatePrice({ id, name, price, description })}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              color='primary'
              sx={{ position: 'absolute', top: -32, right: 0, zIndex: 10 }}
              onClick={() => removePrice({ id, name, price, description })}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </>
        )}

        <Box
          // display='flex'
          // alignItems='center'
          // justifyContent='center'
          ref={ref}
          height={nameHeight}
          mb={2}
        >
          <Typography variant='h3' fontWeight={700} color={(theme) => theme.palette.text.primary} fontSize={32}>
            {name}
          </Typography>
        </Box>

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
