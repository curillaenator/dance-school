import { useContext, useState, useCallback } from 'react';
import { Context } from '@src/context';

import { GALLERY_CONFIG } from '@src/shared/constants';

export const useGallery = () => {
  const { gallery, isMobile } = useContext(Context);

  const [initialSlide, setInitialSlide] = useState<number>(0);
  const handleInitialSlide = useCallback((index: number) => setInitialSlide(index), []);

  return {
    isMobile,
    initialSlide,
    handleInitialSlide,
    photos: gallery,
    gallery: gallery.slice(0, GALLERY_CONFIG.length).map((url, i) => ({
      id: `photoId${i}`,
      img: url,
      title: `photo${i}`,
      rows: GALLERY_CONFIG[i].rows || 1,
      cols: GALLERY_CONFIG[i].cols || 1,
    })),
  };
};
