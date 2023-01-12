import React, { FC } from 'react';
import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Tooltip from '@mui/material/Tooltip';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ChangeCircle from '@mui/icons-material/ChangeCircle';

import { GALLERY_ROW_HEIGHT } from './constants';
import { srcset } from './helpers';
import { GalleryProps } from './interfaces';

const ImgStyled = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: `transform 0.8s cubic-bezier(.4,.1,.47,1.34)`,
  filter: 'brightness(0.9)',

  ':hover': {
    transform: 'scale(1.1)',
    filter: 'brightness(1)',
  },
});

export const Gallery: FC<GalleryProps> = (props) => {
  const {
    gallery,
    maxWidth,
    isMobile,
    editable = false,
    handleOpen = () => {},
    handleInitialSlide = () => {},
    handleRemove = () => {},
    handleUpload = () => {},
  } = props;

  return (
    <Box
      width="100%"
      paddingY={editable ? 0.5 : 16}
      my={editable ? 0 : 16}
      mb={editable ? 4 : 0}
      bgcolor={(theme) => theme.palette.primary.main}
    >
      <ImageList
        sx={{
          maxWidth,
          marginX: 'auto',
          paddingX: isMobile ? 0.5 : 4,
        }}
        variant="quilted"
        cols={4}
        rowHeight={GALLERY_ROW_HEIGHT}
      >
        {gallery.map(({ cols, rows, id, title, img }, i) => (
          <ImageListItem
            key={id}
            cols={cols || 1}
            rows={rows || 1}
            sx={{
              borderRadius: 1,
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <ImgStyled
              {...srcset(img, GALLERY_ROW_HEIGHT, rows, cols)}
              alt={title}
              loading="lazy"
              onClick={() => {
                handleInitialSlide(i);
                handleOpen();
              }}
            />

            {editable && (
              <ImageListItemBar
                actionIcon={
                  <>
                    <Tooltip title="Заменить" placement="top">
                      <IconButton color="primary" component="label">
                        <ChangeCircle />
                        <input hidden accept="image/*" type="file" onChange={(e) => handleUpload(e, 'gallery', img)} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Удалить" placement="top">
                      <IconButton color="error" onClick={() => handleRemove(img, 'gallery')}>
                        <DeleteRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                }
              />
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
