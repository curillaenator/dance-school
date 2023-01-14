import React, { FC, useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { ST } from '@src/config';

import Box from '@mui/material/Box';

export const VideoPlayer: FC<{ id: string; videoPath: string }> = (props) => {
  const { id, videoPath } = props;

  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    getDownloadURL(ref(ST, `videos/${id}/${videoPath}`)).then((url) => setSrc(url));
  }, [id, videoPath]);

  return (
    <Box>
      {src && (
        <video controls width='100%'>
          <source src={src} />
        </video>
      )}
    </Box>
  );
};
