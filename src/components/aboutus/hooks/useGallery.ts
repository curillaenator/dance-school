import { useContext, useState, useCallback } from 'react';
import { Context } from '@src/context';

const GALLERY_CGF = [
  { id: 0, rows: 2, cols: 2 },
  { id: 1 },
  { id: 2 },
  { id: 3, cols: 2 },
  { id: 4, cols: 2 },
  { id: 5, rows: 2, cols: 2 },
  { id: 6 },
  { id: 7 },
];

export const useGallery = () => {
  const { gallery } = useContext(Context);

  const [initialSlide, setInitialSlide] = useState<number>(0);
  const handleInitialSlide = useCallback((index: number) => setInitialSlide(index), []);

  return {
    initialSlide,
    handleInitialSlide,
    photos: gallery,
    gallery: gallery.map((url, i) => ({
      id: `photoId${i}`,
      img: url,
      title: `photo${i}`,
      rows: GALLERY_CGF[i].rows || 1,
      cols: GALLERY_CGF[i].cols || 1,
    })),
  };
};
