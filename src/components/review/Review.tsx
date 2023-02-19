import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { jsonToHtml } from '@src/utils';
// import { Context } from '@src/context';
import { ReviewType } from '@src/types';

interface ReviewProps extends ReviewType {
  editable?: boolean;
  onRemove?: (review: ReviewType) => void;
  isMobile?: boolean;
}

export const Review: FC<ReviewProps> = (props) => {
  const { id, author, review, rating, editable, onRemove = () => {}, isMobile } = props;
  // const { isMobile } = useContext(Context);

  return (
    <Box
      width='100%'
      height='100%'
      p={isMobile ? 4 : 8}
      display='flex'
      alignItems='center'
      flexDirection='column'
      position='relative'
    >
      {editable && (
        <IconButton
          color='error'
          sx={{ position: 'absolute', top: 32, right: 32, zIndex: 10 }}
          onClick={() => onRemove({ id, author, review, rating })}
        >
          <DeleteRoundedIcon />
        </IconButton>
      )}
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
