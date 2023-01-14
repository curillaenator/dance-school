import React, { FC } from 'react';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';

import { VideoPreview } from './VideoPreview';

import { VideoGalleryProps } from './interfaces';

export const VideoGallery: FC<VideoGalleryProps> = (props) => {
  const {
    videos,
    maxWidth,
    isMobile,
    editable = false,
    handleOpen = () => {},
    handleRemove = () => {},
    handleUpload = () => {},
  } = props;

  return (
    <Box mb={editable ? 4 : 0}>
      <ImageList
        sx={{
          maxWidth,
          marginX: 'auto',
          paddingX: isMobile ? 0.5 : 4,
        }}
        cols={1}
        rowHeight={isMobile ? 320 : 600}
      >
        {videos.map((video) => (
          <VideoPreview
            key={video.id}
            {...video}
            editable={editable}
            handleOpen={handleOpen}
            handleRemove={handleRemove}
            handleUpload={handleUpload}
          />
        ))}
      </ImageList>
    </Box>
  );
};
