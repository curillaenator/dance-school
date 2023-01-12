import { useState, useEffect, useCallback } from 'react';

import { ref, get } from 'firebase/database';
import { DB } from '@src/config';

import { CoachType, LandingStaticContentType, StaticSectionType, StaticKeysType } from '@src/types';

import { INITIAL_STATIC_CONTENT } from '@src/shared/constants';

export const useDatabase = () => {
  const [coaches, setCoaches] = useState<CoachType[]>([]);
  const [staticContent, setStaticContent] = useState<LandingStaticContentType>(INITIAL_STATIC_CONTENT);

  useEffect(() => {
    get(ref(DB, 'static')).then((snap) => {
      if (snap.exists()) {
        const data = snap.val() as LandingStaticContentType;
        setStaticContent(data);
      }
    });

    get(ref(DB, 'coaches')).then((snap) => {
      if (snap.exists()) {
        const data = snap.val() as Record<string, CoachType>;
        setCoaches(Object.values(data));
      }
    });
  }, []);

  const updateStaticContent = useCallback((key: StaticKeysType, data: Partial<StaticSectionType>) => {
    setStaticContent((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...data,
      },
    }));
  }, []);

  return {
    coaches,
    staticContent,
    updateStaticContent,
  };
};
