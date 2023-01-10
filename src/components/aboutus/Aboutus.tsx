import React, { FC } from 'react';
import { Element } from 'react-scroll';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { PopupGallery } from './PopupGallery';

import { useModalControl } from '@src/hooks/useModalControl';
import { useGallery } from './hooks/useGallery';

import { srcset } from './helpers';

import { LandingSectionCommonProps } from '@src/types';

export const Aboutus: FC<LandingSectionCommonProps> = (props) => {
  const { name } = props;

  const { initialSlide, photos, gallery, handleInitialSlide } = useGallery();
  const { open, handleClose, handleOpen } = useModalControl();

  return (
    <Element name={name}>
      <Box
        sx={{
          paddingY: 8,
        }}
      >
        <ImageList
          sx={{
            maxWidth: '1024px',
            marginX: 'auto',
            paddingX: 0.5,
          }}
          variant="quilted"
          cols={4}
          rowHeight={200}
        >
          {gallery.map((item, i) => (
            <ImageListItem
              key={item.id}
              cols={item.cols || 1}
              rows={item.rows || 1}
              sx={{
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: '0.1s ease-in-out',

                ':hover': {
                  filter: 'saturate(110%) brightness(0.9)',
                },

                ':active': {
                  filter: 'saturate(120%) brightness(0.8)',
                },
              }}
            >
              <img
                {...srcset(item.img, 200, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
                onClick={() => {
                  handleInitialSlide(i);
                  handleOpen();
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
        <PopupGallery photos={photos} initialSlide={initialSlide} handleClose={handleClose} />
      </Dialog>
    </Element>
  );
};
