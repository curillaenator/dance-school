import { useState, useEffect, useCallback } from 'react';

import { ref, get } from 'firebase/database';
import { DB } from '@src/config';

import { CoachType } from '@src/types';

export const useDatabase = () => {
  const [coaches, setCoaches] = useState<CoachType[]>([]);

  const updateCoaches = useCallback((newCoaches: CoachType[]) => {
    setCoaches(newCoaches);
  }, []);

  useEffect(() => {
    get(ref(DB, 'coaches')).then((snap) => {
      if (snap.exists()) {
        const data = snap.val() as Record<string, CoachType>;
        setCoaches(Object.values(data));
      }
    });
  }, []);

  return {
    coaches,
    updateCoaches,
  };
};
