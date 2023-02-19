import React, { FC, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';

import ReviewsIcon from '@mui/icons-material/Reviews';

import { ActionsType } from './hooks/formReducer';

interface ReviewForm {
  author: string;
  review: string;
  rating: string;
  handleReviewForm: (e: ChangeEvent<HTMLInputElement>, field: ActionsType) => void;
  handleReviewApply: () => void;
}

export const ReviewForm: FC<ReviewForm> = (props) => {
  const { author, review, rating, handleReviewForm, handleReviewApply } = props;

  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center' gap={2}>
      <FormControl variant='outlined' fullWidth>
        <TextField
          id='review-author'
          label='Ваше имя'
          type='text'
          sx={{ marginBottom: 2 }}
          autoFocus
          value={author}
          onChange={(e) => handleReviewForm(e as ChangeEvent<HTMLInputElement>, 'setAuthor')}
          autoComplete='off'
          required
        />

        <TextField
          id='review-text'
          label='Ваш интресный отзыв'
          type='text'
          value={review}
          onChange={(e) => handleReviewForm(e as ChangeEvent<HTMLInputElement>, 'setReview')}
          autoComplete='off'
          required
          multiline
          minRows={4}
          maxRows={6}
        />
      </FormControl>

      <Rating
        name={author}
        value={Number(rating)}
        onChange={(e, value) =>
          handleReviewForm(
            {
              // @ts-expect-error костыль, че
              target: {
                value: String(value),
              },
            },
            'setRating',
          )
        }
        sx={{
          mx: 'auto',
        }}
      />

      <Button
        onClick={handleReviewApply}
        startIcon={<ReviewsIcon />}
        variant='contained'
        sx={{ px: '96px', height: '56px' }}
        disabled={author.length < 3 || review.length < 10 || rating.length < 1 || rating === 'null'}
      >
        Оставить отзыв
      </Button>
    </Box>
  );
};
