import React, { FC, useContext } from 'react';
import { Element } from 'react-scroll';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

import { VideoGallery } from '@src/components/videogallery';
import { VideoPlayer } from '@src/components/videoplayer';

import { useModalControl } from '@src/hooks/useModalControl';
import { useVideoGallery } from './hooks/useVideoGallery';

import { Context } from '@src/context';
import { jsonToHtml } from '@src/utils';

import { LandingSectionCommonProps, VideoType } from '@src/types';

interface ProgramsProps extends LandingSectionCommonProps {
  handleOpen: () => void;
}

export const Programs: FC<ProgramsProps> = (props) => {
  const { name, maxWidth, handleOpen: handleOpenApplication } = props;
  const { isMobile, staticContent } = useContext(Context);
  const { videos, currentVideo, handlePlayerVideo } = useVideoGallery();
  const { open, handleClose, handleOpen } = useModalControl();

  return (
    <>
      <Element name={name}>
        <Box paddingY={16} bgcolor={(theme) => theme.palette.primary.main}>
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
            {jsonToHtml(staticContent.programs.title)}
          </Typography>

          <VideoGallery
            videos={videos}
            maxWidth={maxWidth}
            isMobile={isMobile}
            handleOpen={(video: VideoType) => {
              handlePlayerVideo(video);
              handleOpen();
            }}
          />

          <Box display='flex' mt={8} justifyContent='center'>
            <Button
              variant='contained'
              color='error'
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
        </Box>
      </Element>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
        <VideoPlayer handleClose={handleClose} id={currentVideo?.id || ''} videoPath={currentVideo?.videoPath || ''} />
      </Dialog>
    </>
  );
};
