import { useState, useEffect, useCallback } from 'react';

import { ref, get, onValue, off } from 'firebase/database';
import { DB } from '@src/config';

import {
  CoachType,
  LandingStaticContentType,
  StaticSectionType,
  StaticKeysType,
  VideoType,
  PriceType,
} from '@src/types';

import { INITIAL_STATIC_CONTENT } from '@src/shared/constants';

export const useDatabase = () => {
  const [staticContent, setStaticContent] = useState<LandingStaticContentType>(
    INITIAL_STATIC_CONTENT as unknown as LandingStaticContentType,
  );
  const [coaches, setCoaches] = useState<CoachType[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [prices, setPrices] = useState<PriceType[]>([]);

  useEffect(() => {
    const coachesRef = ref(DB, 'coaches');
    const videosRef = ref(DB, 'videos');
    const pricesRef = ref(DB, 'prices');

    get(ref(DB, 'static')).then((snap) => {
      if (snap.exists()) {
        const data = snap.val();
        setStaticContent(data);
      }
    });

    onValue(coachesRef, (snap) => {
      if (snap.exists()) {
        const data = snap.val() as Record<string, CoachType>;
        setCoaches(Object.values(data));
      }
    });

    onValue(pricesRef, (snap) => {
      if (snap.exists()) {
        const data = snap.val() as Record<string, PriceType>;
        setPrices(Object.values(data));
      }
    });

    onValue(videosRef, (snap) => {
      if (snap.exists()) {
        const data = snap.val() as Record<string, VideoType>;
        setVideos(Object.values(data));
      }
    });

    return () => {
      off(coachesRef);
      off(videosRef);
      off(pricesRef);
    };
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
    videos,
    prices,
    staticContent,
    updateStaticContent,
  };
};
