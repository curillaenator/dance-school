import { useContext, useState, useCallback } from 'react';
import { Context } from '@src/context';

import { VideoType } from '@src/types';

export const useVideoGallery = () => {
  const { videos } = useContext(Context);
  const [currentVideo, setCurrentVideo] = useState<VideoType | null>(null);
  const handlePlayerVideo = useCallback((video: VideoType) => setCurrentVideo(video), []);

  return {
    handlePlayerVideo,
    videos,
    currentVideo,
  };
};
