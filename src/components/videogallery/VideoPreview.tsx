import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { ref, getDownloadURL } from 'firebase/storage';
import { ST } from '@src/config';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Tooltip from '@mui/material/Tooltip';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ChangeCircle from '@mui/icons-material/ChangeCircle';
import PlayCircle from '@mui/icons-material/PlayCircle';

import { VideoPreviewProps } from './interfaces';

const ImgStyled = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const VideoPreview: FC<VideoPreviewProps> = (props) => {
  const { id, title, thumbPath, editable, handleOpen } = props;

  const [img, setImg] = useState<string>('');

  useEffect(() => {
    getDownloadURL(ref(ST, `videos/${id}/${thumbPath}`)).then((url) => setImg(url));
  }, [id, thumbPath]);

  return (
    <ImageListItem
      cols={1}
      rows={1}
      sx={(theme) => ({
        borderRadius: 1,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.background.default}`,
      })}
    >
      <Stack direction='row' height='100%'>
        <Box
          width='50%'
          height='100%'
          sx={{
            position: 'relative',
          }}
        >
          <ImgStyled src={img} alt={title} loading='lazy' />

          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            onClick={handleOpen}
          >
            <PlayCircle
              color='primary'
              sx={{
                width: '56px',
                height: '56px',
              }}
            />
          </IconButton>

          {editable && (
            <ImageListItemBar
              title={title}
              actionIcon={
                <>
                  <Tooltip title='Заменить' placement='top'>
                    <IconButton color='primary' component='label'>
                      <ChangeCircle />
                      <input hidden accept='image/*' type='file' onChange={() => {}} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='Удалить' placement='top'>
                    <IconButton color='error' onClick={() => {}}>
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
            />
          )}
        </Box>

        <Box width='50%' height='100%' py={4}>
          <Typography align='center' variant='h4'>
            {title}
          </Typography>
        </Box>
      </Stack>
    </ImageListItem>
  );
};
