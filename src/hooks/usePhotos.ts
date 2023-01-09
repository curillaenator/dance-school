import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { ST } from '@src/config';

export const usePhotos = () => {
  const [mainSlider, setMainSlider] = useState<string[]>([]);

  useEffect(() => {
    listAll(ref(ST, 'mainSlider'))
      .then((res) => res.items.map((item) => getDownloadURL(item)))
      .then((promises) => Promise.all(promises).then((urls) => setMainSlider(urls)));

    // listAll(ref(ST, 'coaches'))
    //   .then((res) => res.items.map((item) => [item.fullPath, getDownloadURL(item)]))
    //   .then((touples) => Promise.all(touples));
  }, []);

  return {
    mainSlider,
  };
};
