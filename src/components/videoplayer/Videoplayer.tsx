import React, { FC, useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { ST } from '@src/config';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface VideoPlayerProps {
  id: string;
  videoPath: string;
  handleClose: () => void;
}

export const VideoPlayer: FC<VideoPlayerProps> = (props) => {
  const { id, videoPath, handleClose } = props;

  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    getDownloadURL(ref(ST, `videos/${id}/${videoPath}`)).then((url) => setSrc(url));
  }, [id, videoPath]);

  return (
    <Box position='relative' width='100%' height='100%'>
      <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: 0,
          zIndex: 10,
          color: 'white',
          borderRadius: 1,
        }}
        onClick={handleClose}
      >
        <CloseIcon
          sx={{
            width: '48px',
            height: '48px',
          }}
        />
      </IconButton>

      {src && (
        <video
          controls
          autoPlay
          width='100%'
          style={{ maxHeight: '90vh' }}
          // crossOrigin='anonymous'
        >
          <source src={src} type='video/mp4' />
        </video>
      )}
    </Box>
  );
};
