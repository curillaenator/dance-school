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
  ReviewType,
} from '@src/types';

import { INITIAL_STATIC_CONTENT } from '@src/shared/constants';

export const useDatabase = () => {
  const [staticContent, setStaticContent] = useState<LandingStaticContentType>(
    INITIAL_STATIC_CONTENT as unknown as LandingStaticContentType,
  );
  const [coaches, setCoaches] = useState<CoachType[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [prices, setPrices] = useState<PriceType[]>([]);
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    const coachesRef = ref(DB, 'coaches');
    const videosRef = ref(DB, 'videos');
    const pricesRef = ref(DB, 'prices');
    const reviewsRef = ref(DB, 'reviews');

    get(ref(DB, 'static')).then((snap) => {
      if (snap.exists()) {
        const data = snap.val();
        setStaticContent(data);
      }
    });

    onValue(reviewsRef, (snap) => {
      if (snap.exists()) {
        const data = snap.val() as Record<string, ReviewType>;
        setReviews(Object.values(data).reverse());
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
      off(reviewsRef);
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
    reviews,
    staticContent,
    updateStaticContent,
  };
};
