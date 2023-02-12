import { useState, useCallback, useContext, ChangeEvent } from 'react';
import { ref, set, push, child, update } from 'firebase/database';
import { DB } from '@src/config';

import { Context } from '@src/context';
import { inputToHtml, htmlToInput } from '@src/utils';
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
  const [isPriceEdit, setIsPriceEdit] = useState<boolean>(false);

  const handleNewPrice = useCallback((e: ChangeEvent<HTMLInputElement>, key: keyof PriceType) => {
    setNewPrice((prev) => ({ ...prev, [key]: e.target.value }));
  }, []);

  const addPrice = useCallback(async () => {
    const { id, name, description, price } = newPrice;

    setLoading(true);

    const priceData: PriceType = {
      id: '',
      name,
      price,
      description: inputToHtml(description),
    };

    if (!!id) {
      priceData.id = id;
    } else {
      const newPriceId = push(child(ref(DB), 'prices')).key as string;
      priceData.id = newPriceId;
    }

    await set(ref(DB, `prices/${priceData.id}`), priceData);

    setLoading(false);
    setIsPriceEdit(false);
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

  const onUpdatePrice = useCallback((price: PriceType) => {
    setIsPriceEdit(true);
    setNewPrice({
      ...price,
      description: htmlToInput(price.description),
    });
  }, []);

  const onUpdatePriceCancel = useCallback(() => {
    setIsPriceEdit(false);
    setNewPrice(INITIAL_PRICE);
  }, []);

  return {
    prices,
    newPrice,
    isNewPriceFilled: newPrice.name && newPrice.price && newPrice.description,
    isPriceEdit,
    handleNewPrice,
    addPrice,
    removePrice,
    onUpdatePrice,
    onUpdatePriceCancel,
  };
};
