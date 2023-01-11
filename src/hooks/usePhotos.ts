import { useState, useEffect, useCallback } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { ST } from '@src/config';

export const usePhotos = () => {
  const [mainSlider, setMainSlider] = useState<string[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);

  useEffect(() => {
    listAll(ref(ST, 'mainSlider'))
      .then((res) => res.items.map((item) => getDownloadURL(item)))
      .then((promises) => Promise.all(promises).then((urls) => setMainSlider(urls)));

    listAll(ref(ST, 'gallery'))
      .then((res) => res.items.map((item) => getDownloadURL(item)))
      .then((promises) => Promise.all(promises).then((urls) => setGallery(urls)));
  }, []);

  const updateMainSlider = useCallback((newSlides: string[]) => {
    setMainSlider(newSlides);
  }, []);

  const updateGallery = useCallback((newPhotos: string[]) => {
    setGallery(newPhotos);
  }, []);

  return {
    mainSlider,
    gallery,
    updateMainSlider,
    updateGallery,
  };
};
