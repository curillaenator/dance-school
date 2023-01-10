import { useContext, useState, useCallback } from 'react';
import { Context } from '@src/context';

const CFG = [{ id: 0, rows: 2, cols: 3 }, { id: 1 }, { id: 2 }, { id: 3, cols: 2 }, { id: 4, cols: 2 }];

export const useGallery = () => {
  const { gallery, isMobile } = useContext(Context);

  const [initialSlide, setInitialSlide] = useState<number>(0);
  const handleInitialSlide = useCallback((index: number) => setInitialSlide(index), []);

  return {
    isMobile,
    initialSlide,
    handleInitialSlide,
    photos: gallery,
    gallery: gallery.slice(0, 5).map((url, i) => ({
      id: `photoId${i}`,
      img: url,
      title: `photo${i}`,
      rows: CFG[i].rows || 1,
      cols: CFG[i].cols || 1,
    })),
  };
};
