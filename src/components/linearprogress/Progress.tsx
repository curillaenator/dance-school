import React, { FC } from 'react';
import MuiLinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const LinearProgress: FC<LinearProgressProps & { value: number }> = (props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <MuiLinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};
