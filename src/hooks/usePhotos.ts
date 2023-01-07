import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { ST } from '@src/config';

export const usePhotos = () => {
  const [mainSlider, setMainSlider] = useState<string[]>([]);

  useEffect(() => {
    console.log('fires');

    listAll(ref(ST, 'mainSlider'))
      .then((res) => res.items.map((item) => getDownloadURL(item)))
      .then((promises) => Promise.all(promises).then((urls) => setMainSlider(urls)));
  }, []);

  return {
    mainSlider,
  };
};
