import React, { FC, useState, useEffect } from 'react';
import parse from 'html-react-parser';
import styled from '@emotion/styled';
import { ref, getDownloadURL } from 'firebase/storage';
import { ST } from '@src/config';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Tooltip from '@mui/material/Tooltip';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { VideoPreviewProps } from './interfaces';

const ImgStyled = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '4px',
});

const handleDirection = (isModile?: boolean, isEven?: boolean) => {
  if (isModile) {
    return 'column';
  }

  return isEven ? 'row' : 'row-reverse';
};

export const VideoPreview: FC<VideoPreviewProps> = (props) => {
  const {
    id = 'default',
    title = '',
    description = '',
    thumbPath,
    editable,
    videoPath,
    handleOpen,
    isEven,
    isMobile,
    handleRemove = () => {},
    handleEdit = () => {},
  } = props;

  const [img, setImg] = useState<string>('');

  useEffect(() => {
    getDownloadURL(ref(ST, `videos/${id}/${thumbPath}`)).then((url) => setImg(url));
  }, [id, thumbPath]);

  return (
    <ImageListItem cols={1} rows={1} sx={{ overflow: 'hidden' }}>
      <Stack direction={handleDirection(isMobile, isEven)} height='100%'>
        <Box position='relative' width={isMobile ? '100%' : '50%'} height={isMobile ? '33%' : '100%'} flexShrink={0}>
          <ImgStyled src={img} alt={title} loading='lazy' />

          {!editable && (
            <IconButton
              sx={(theme) => ({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: theme.palette.common.white,

                ':hover': {
                  backgroundColor: theme.palette.primary.main,
                },
              })}
              onClick={handleOpen}
            >
              <PlayCircleIcon
                color='error'
                sx={{
                  width: '56px',
                  height: '56px',
                }}
              />
            </IconButton>
          )}

          {editable && (
            <ImageListItemBar
              title={title}
              actionIcon={
                <>
                  <Tooltip title='Редактировать' placement='top'>
                    <IconButton
                      color='primary'
                      onClick={() => handleEdit({ id, title, thumbPath, videoPath, description })}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='Удалить' placement='top'>
                    <IconButton
                      color='error'
                      onClick={() => handleRemove({ id, title, thumbPath, videoPath, description })}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
            />
          )}
        </Box>

        <Box
          width={isMobile ? '100%' : '50%'}
          height={isMobile ? '67%' : '100%'}
          p={4}
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
        >
          <Typography align='center' variant='h4' mb={2}>
            {title}
          </Typography>

          <Typography
            variant='body1'
            align='center'
            mb={2}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '16',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {parse(JSON.parse(description))}
          </Typography>

          {!editable && (
            <Button onClick={handleOpen} startIcon={<PlayCircleIcon />} variant='text' color='error'>
              Смотреть
            </Button>
          )}
        </Box>
      </Stack>
    </ImageListItem>
  );
};
