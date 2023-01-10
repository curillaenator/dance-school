import React, { FC } from 'react';
import { Element } from 'react-scroll';
import YouTube from 'react-youtube';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { PopupGallery } from './PopupGallery';

import { useModalControl } from '@src/hooks/useModalControl';
import { useGallery } from './hooks/useGallery';

import { srcset } from './helpers';
import { GALLERY_ROW_HEIGHT } from './constants';

import { LandingSectionCommonProps } from '@src/types';

import styles from './styles.module.scss';

export const Aboutus: FC<LandingSectionCommonProps> = (props) => {
  const { name, maxWidth } = props;

  const { isMobile, initialSlide, photos, gallery, handleInitialSlide } = useGallery();
  const { open, handleClose, handleOpen } = useModalControl();

  return (
    <Element name={name}>
      <Box paddingTop={16}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          align="center"
          color={(theme) => theme.palette.text.primary}
          fontWeight={500}
          paddingX={4}
          marginX="auto"
          mb={4}
          sx={{
            zIndex: 0,
            maxWidth,
          }}
        >
          Кто мы
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color={(theme) => theme.palette.text.secondary}
          paddingX={4}
          marginX="auto"
          mb={16}
          sx={{
            zIndex: 0,
            maxWidth,
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error adipisci labore molestiae earum consequatur
          autem ipsam, sed dolores dicta aut tempora impedit natus dolorum! Voluptatibus corporis nisi enim recusandae
          possimus.
        </Typography>

        <Box width="100%" paddingY={8} bgcolor={(theme) => theme.palette.primary.main}>
          <ImageList
            sx={{
              maxWidth,
              marginX: 'auto',
              paddingX: 0.5,
            }}
            variant="quilted"
            cols={4}
            rowHeight={GALLERY_ROW_HEIGHT}
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
                  {...srcset(item.img, GALLERY_ROW_HEIGHT, item.rows, item.cols)}
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

        <Box width="100%" paddingTop={8}>
          <Box
            marginX="auto"
            width="100%"
            sx={{
              maxWidth,
            }}
          >
            <YouTube videoId="wKp-rKaMIVQ" className={styles.playerContainer} iframeClassName={styles.iframe} />
          </Box>
        </Box>
      </Box>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
        <PopupGallery photos={photos} initialSlide={initialSlide} handleClose={handleClose} />
      </Dialog>
    </Element>
  );
};
