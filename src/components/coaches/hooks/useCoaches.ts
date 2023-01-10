import { useState, useEffect, useCallback } from 'react';

import { ref, get, set, push, child } from 'firebase/database';
import { DB } from '@src/config';

import { CoachType } from '@src/types';

export const useCoaches = () => {
  const [coaches, setCoaches] = useState<Record<string, CoachType>>({});

  useEffect(() => {
    get(ref(DB, 'coaches')).then((snap) => {
      const data = snap.val() as Record<string, CoachType>;
      if (snap.exists()) {
        setCoaches(data);
      }
    });
  }, []);

  const addCoach = useCallback(() => {
    const newCoachId = push(child(ref(DB), 'coaches')).key as string;

    const data = {
      id: newCoachId,
      name: 'Крис',
      description: 'Просто Крис.',
      photoURL: '3.jpg',
    };

    set(ref(DB, `coaches/${newCoachId}`), data);
  }, []);

  return {
    coaches: Object.values(coaches),
    addCoach,
  };
};
