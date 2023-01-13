import { useState, useEffect, useCallback } from 'react';

import { ref, get, set, push, child } from 'firebase/database';
import { DB } from '@src/config';

import { PriceType } from '@src/types';

export const usePrices = () => {
  const [prices, setPrices] = useState<Record<string, PriceType>>({});

  useEffect(() => {
    get(ref(DB, 'prices')).then((snap) => {
      const data = snap.val() as Record<string, PriceType>;
      if (snap.exists()) {
        setPrices(data);
      }
    });
  }, []);

  const addPrice = useCallback(() => {
    const newPriceId = push(child(ref(DB), 'prices')).key as string;

    const data = {
      id: newPriceId,
      name: 'Высокий',
      price: '8000',
      description: 'Продвинутые уроки для уже опытных танцоров.',
    };

    set(ref(DB, `prices/${newPriceId}`), data);
  }, []);

  return {
    prices: Object.values(prices),
    addPrice,
  };
};
