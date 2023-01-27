import { useContext, useState, useCallback } from 'react';
import { Context } from '@src/context';

import { GALLERY_CONFIG } from '@src/shared/constants';
import { VideoType } from '@src/types';

export const useGallery = () => {
  const { gallery, isMobile, videos } = useContext(Context);

  const [initialSlide, setInitialSlide] = useState<number>(0);
  const [currentVideo, setCurrentVideo] = useState<VideoType | null>(null);

  const handleInitialSlide = useCallback((index: number) => setInitialSlide(index), []);
  const handlePlayerVideo = useCallback((video: VideoType) => setCurrentVideo(video), []);

  return {
    isMobile,
    initialSlide,
    handleInitialSlide,
    handlePlayerVideo,
    videos,
    currentVideo,
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
