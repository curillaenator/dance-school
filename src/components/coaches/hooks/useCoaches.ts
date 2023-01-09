import { useState, useEffect } from 'react';

import { ref, get } from 'firebase/database';
import { DB } from '@src/config';

import { CoachType } from '@src/types';

export const useCoaches = () => {
  const [coaches, setCoaches] = useState<Record<string, CoachType>>({});

  // const add = () => {
  //   const newCoachId = push(child(ref(DB), 'coaches')).key as string;

  //   const coach = {
  //     id: newCoachId,
  //     name: 'Кристина',
  //     description: 'Ведет занятия по румбе для детей и взрослых. Опыт преподавания 8 лет.',
  //     photoURL: 'https://firebasestorage.googleapis.com/v0/b/best-dance-school-ever.appspot.com/o/coaches%2F3.jpg',
  //   };

  //   set(ref(DB, `coaches/${newCoachId}`), coach);
  // };

  useEffect(() => {
    get(ref(DB, 'coaches')).then((snap) => {
      const data = snap.val() as Record<string, CoachType>;
      setCoaches(data);
    });
  }, []);

  return {
    coaches: Object.values(coaches),
  };
};
