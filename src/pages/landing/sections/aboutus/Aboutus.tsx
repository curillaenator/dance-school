import React, { FC, useContext, useState } from 'react';
import { Element } from 'react-scroll';
import parse from 'html-react-parser';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

import { Gallery } from '@src/components/photogallery';
import { PopupGallery } from '@src/components/popupgallery';

import { VideoGallery } from '@src/components/videogallery';
import { VideoPlayer } from '@src/components/videoplayer';

import { useModalControl } from '@src/hooks/useModalControl';
import { useGallery } from './hooks/useGallery';

import { Context } from '@src/context';

import { LandingSectionCommonProps, VideoType } from '@src/types';

interface AboutusProps extends LandingSectionCommonProps {
  handleOpen: () => void;
}

export const Aboutus: FC<AboutusProps> = (props) => {
  const { name, maxWidth, handleOpen: handleOpenApplication } = props;

  const [modalContent, setModalContent] = useState<'photo' | 'video'>('photo');

  const { isMobile, staticContent } = useContext(Context);

  const { initialSlide, videos, currentVideo, photos, gallery, handleInitialSlide, handlePlayerVideo } = useGallery();
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
          {parse(JSON.parse(staticContent.aboutus.title))}
        </Typography>

        <Typography
          variant='subtitle1'
          align='center'
          color={(theme) => theme.palette.text.secondary}
          paddingX={4}
          mb={8}
          marginX='auto'
          sx={{
            zIndex: 0,
            maxWidth,
          }}
        >
          {parse(JSON.parse(staticContent.aboutus.subtitle || ''))}
        </Typography>

        <Box display='flex' justifyContent='center'>
          <Button
            variant='contained'
            size='large'
            onClick={handleOpenApplication}
            sx={{
              height: 64,
              padding: '0 64px',
              margin: '0 auto',
            }}
          >
            Оставить заявку
          </Button>
        </Box>

        <Box paddingY={16} mt={16} bgcolor={(theme) => theme.palette.primary.main}>
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            align='center'
            color={(theme) => theme.palette.background.default}
            fontWeight={500}
            paddingX={4}
            marginX='auto'
            mb={8}
            sx={{
              zIndex: 0,
              maxWidth,
            }}
          >
            {staticContent.aboutus.info}
          </Typography>

          <VideoGallery
            videos={videos}
            maxWidth={maxWidth}
            isMobile={isMobile}
            handleOpen={(video: VideoType) => {
              setModalContent('video');
              handlePlayerVideo(video);
              handleOpen();
            }}
          />
        </Box>

        <Box paddingY={16}>
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            align='center'
            color={(theme) => theme.palette.text.primary}
            fontWeight={500}
            paddingX={4}
            marginX='auto'
            mb={8}
            sx={{
              zIndex: 0,
              maxWidth,
            }}
          >
            Фотогаллерея
          </Typography>

          <Gallery
            gallery={gallery}
            maxWidth={maxWidth}
            isMobile={isMobile}
            handleOpen={() => {
              setModalContent('photo');
              handleOpen();
            }}
            handleInitialSlide={handleInitialSlide}
          />
        </Box>
      </Box>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
        {modalContent === 'photo' && (
          <PopupGallery photos={photos} initialSlide={initialSlide} handleClose={handleClose} />
        )}

        {modalContent === 'video' && (
          <VideoPlayer
            handleClose={handleClose}
            id={currentVideo?.id || ''}
            videoPath={currentVideo?.videoPath || ''}
          />
        )}
      </Dialog>
    </Element>
  );
};
