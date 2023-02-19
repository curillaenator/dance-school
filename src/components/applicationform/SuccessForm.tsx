import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CheckIcon from '@mui/icons-material/Check';

interface SuccessFormProps {
  title: string;
  subtitle?: string;
  handleClose: () => void;
}

export const SuccessForm: FC<SuccessFormProps> = (props) => {
  const { title, subtitle, handleClose } = props;

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Typography variant='h3' align='left' sx={{ color: 'white' }} fontWeight={500} mb={4}>
        {title}
      </Typography>

      {subtitle && (
        <Typography variant='subtitle1' align='left' sx={{ color: 'white' }} mb={4}>
          {subtitle}
        </Typography>
      )}

      <Button
        variant='contained'
        color='success'
        onClick={handleClose}
        fullWidth
        startIcon={<CheckIcon />}
        sx={{
          height: 64,
        }}
      >
        Готово
      </Button>
    </Box>
  );
};
