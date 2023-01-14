import React, { FC } from 'react';
import styled from '@emotion/styled';

import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import Tooltip from '@mui/material/Tooltip';

// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// import ChangeCircle from '@mui/icons-material/ChangeCircle';

// import { GALLERY_CONFIG } from '@src/shared/constants';
import { GALLERY_ROW_HEIGHT } from './constants';
// import { srcset } from './helpers';
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

export const VideoGallery: FC<GalleryProps> = (props) => {
  const {
    previews,
    maxWidth,
    isMobile,
    editable = false,
    handleOpen = () => {},
    // handleInitialSlide = () => {},
    // handleRemove = () => {},
    // handleUpload = () => {},
  } = props;

  return (
    <Box mb={editable ? 4 : 0}>
      <ImageList
        sx={{
          maxWidth,
          marginX: 'auto',
          paddingX: isMobile ? 0.5 : 4,
        }}
        // variant='quilted'
        cols={2}
        rowHeight={GALLERY_ROW_HEIGHT}
      >
        {previews.map((img, i) => (
          <ImageListItem
            key={`video-preview-${i}`}
            cols={1}
            rows={1}
            sx={{
              borderRadius: 1,
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <ImgStyled
              src={img}
              // alt={title}
              loading='lazy'
              onClick={handleOpen}
            />

            {/* {editable && (
              <ImageListItemBar
                actionIcon={
                  <>
                    <Tooltip title='Заменить' placement='top'>
                      <IconButton color='primary' component='label'>
                        <ChangeCircle />
                        <input hidden accept='image/*' type='file' onChange={(e) => handleUpload(e, 'gallery', img)} />
                      </IconButton>
                    </Tooltip>

                    {gallery.length > GALLERY_CONFIG.length && (
                      <Tooltip title='Удалить' placement='top'>
                        <IconButton color='error' onClick={() => handleRemove(img, 'gallery')}>
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                }
              />
            )} */}
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
