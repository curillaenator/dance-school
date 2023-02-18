import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { jsonToHtml } from '@src/utils';

interface ReviewProps {
  id: string;
  author: string;
  review: string;
  rating: string;
}

export const Review: FC<ReviewProps> = (props) => {
  const { author, review, rating } = props;
  return (
    <Box width='100%' height='100%' px={8} py={8} display='flex' alignItems='center' flexDirection='column'>
      <Typography
        variant='h4'
        fontSize={24}
        fontWeight={500}
        color={(theme) => theme.palette.background.default}
        mb={4}
        textAlign='center'
      >
        {author}
      </Typography>

      <Typography variant='subtitle2' color={(theme) => theme.palette.background.default} mb={4} textAlign='center'>
        {jsonToHtml(review)}
      </Typography>

      <Rating
        name={author}
        value={Number(rating)}
        readOnly
        sx={{
          mx: 'auto',
        }}
      />
    </Box>
  );
};
