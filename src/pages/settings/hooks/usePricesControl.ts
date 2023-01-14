import { useState, useCallback, useContext, ChangeEvent } from 'react';
import { ref, set, push, child, update } from 'firebase/database';
import { DB } from '@src/config';

import { Context } from '@src/context';
import { PriceType } from '@src/types';

const INITIAL_PRICE: PriceType = {
  id: '',
  name: '',
  price: '',
  description: '',
};

export const usePricesControl = () => {
  const { prices, setLoading } = useContext(Context);
  const [newPrice, setNewPrice] = useState<PriceType>(INITIAL_PRICE);

  const handleNewPrice = useCallback((e: ChangeEvent<HTMLInputElement>, key: keyof PriceType) => {
    setNewPrice((prev) => ({ ...prev, [key]: e.target.value }));
  }, []);

  const addPrice = useCallback(async () => {
    setLoading(true);

    const newPriceId = push(child(ref(DB), 'prices')).key as string;

    await set(ref(DB, `prices/${newPriceId}`), {
      ...newPrice,
      id: newPriceId,
    });

    setLoading(false);
    setNewPrice(INITIAL_PRICE);
  }, [newPrice, setLoading]);

  const removePrice = useCallback(
    async (price: PriceType) => {
      setLoading(true);

      await update(ref(DB), { [`prices/${price.id}`]: null });
      setLoading(false);
    },
    [setLoading],
  );

  return {
    prices,
    newPrice,
    isNewPriceFilled: newPrice.name && newPrice.price && newPrice.description,
    handleNewPrice,
    addPrice,
    removePrice,
  };
};
