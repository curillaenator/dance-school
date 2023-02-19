import { useCallback, useContext } from 'react';
import { ref, update } from 'firebase/database';
import { DB } from '@src/config';

import { Context } from '@src/context';
import { ReviewType } from '@src/types';

export const useReviewsControls = () => {
  const { reviews, setLoading } = useContext(Context);

  const removeReview = useCallback(
    async (review: ReviewType) => {
      setLoading(true);

      await update(ref(DB), { [`reviews/${review.id}`]: null });
      setLoading(false);
    },
    [setLoading],
  );

  return {
    reviews,
    removeReview,
  };
};
