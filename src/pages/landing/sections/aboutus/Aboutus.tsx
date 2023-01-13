import React, { FC, useContext } from 'react';
import { Element } from 'react-scroll';
import YouTube from 'react-youtube';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

import { Gallery } from '@src/components/photogallery';
import { PopupGallery } from '@src/components/popupgallery';

import { useModalControl } from '@src/hooks/useModalControl';
import { useGallery } from './hooks/useGallery';

import { Context } from '@src/context';

import { LandingSectionCommonProps } from '@src/types';

import styles from './styles.module.scss';

export const Aboutus: FC<LandingSectionCommonProps> = (props) => {
  const { name, maxWidth } = props;
  const { isMobile, staticContent } = useContext(Context);
  const { initialSlide, photos, gallery, handleInitialSlide } = useGallery();
  const { open, handleClose, handleOpen } = useModalControl();

  return (
    <Element name={name}>
      <Box paddingTop={16}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          align='center'
          color={(theme) => theme.palette.text.primary}
          fontWeight={500}
          paddingX={4}
          marginX='auto'
          mb={4}
          sx={{
            zIndex: 0,
            maxWidth,
          }}
        >
          {staticContent.aboutus.title}
        </Typography>

        <Typography
          variant='subtitle1'
          align='center'
          color={(theme) => theme.palette.text.secondary}
          paddingX={4}
          mb={1}
          marginX='auto'
          sx={{
            zIndex: 0,
            maxWidth,
          }}
        >
          {staticContent.aboutus.subtitle}
        </Typography>

        {staticContent.aboutus.subtitles &&
          Object.entries(staticContent.aboutus.subtitles).map(([key, subtitle]) => (
            <Typography
              key={key}
              variant='subtitle1'
              align='center'
              color={(theme) => theme.palette.text.secondary}
              paddingX={4}
              mb={1}
              marginX='auto'
              sx={{
                zIndex: 0,
                maxWidth,
              }}
            >
              {subtitle}
            </Typography>
          ))}

        <Gallery
          gallery={gallery}
          maxWidth={maxWidth}
          isMobile={isMobile}
          handleOpen={handleOpen}
          handleInitialSlide={handleInitialSlide}
        />

        <Box width='100%' paddingTop={8}>
          <Box
            marginX='auto'
            width='100%'
            sx={{
              maxWidth,
            }}
          >
            <YouTube videoId='wKp-rKaMIVQ' className={styles.playerContainer} iframeClassName={styles.iframe} />
          </Box>
        </Box>
      </Box>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
        <PopupGallery photos={photos} initialSlide={initialSlide} handleClose={handleClose} />
      </Dialog>
    </Element>
  );
};
