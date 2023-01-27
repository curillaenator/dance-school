import { useCallback, useState } from 'react';

import { CoachType } from '@src/types';

export const useDesiredCoach = () => {
  const [desiredCoach, setDesiredCoach] = useState<CoachType | null>(null);
  const handleDesiredCoach = useCallback((coach: CoachType | null) => setDesiredCoach(coach), []);

  return {
    desiredCoach,
    setDesiredCoach: handleDesiredCoach,
  };
};
