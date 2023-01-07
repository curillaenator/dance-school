import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { ST } from '@src/config';

export const usePhotos = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const photosRef = ref(ST, 'mainSlider');

    const getPhotosUrls = async () => {
      const asd = await listAll(photosRef).then((res) => res.items.map((item) => getDownloadURL(item)));
      Promise.all(asd).then((result) => setPhotos(result));
    };

    getPhotosUrls();
  }, []);

  return {
    photos,
  };
};
