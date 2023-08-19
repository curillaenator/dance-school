import React, { FC, useContext } from 'react';
import { Element } from 'react-scroll';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

import { Gallery } from '@src/components/photogallery';
import { PopupGallery } from '@src/components/popupgallery';

import { useModalControl } from '@src/hooks/useModalControl';
import { useGallery } from './hooks/useGallery';

import { Context } from '@src/context';
import { jsonToHtml } from '@src/utils';
import { LandingSectionCommonProps } from '@src/types';

export const Photogallery: FC<LandingSectionCommonProps> = (props) => {
  const { maxWidth, name } = props;
  const { isMobile, staticContent } = useContext(Context);
  const { initialSlide, photos, gallery, handleInitialSlide } = useGallery();
  const { open, handleClose, handleOpen } = useModalControl();

  return (
    <>
      <Element name={name}>
        <Box paddingY={16}>
          <Typography
            variant={isMobile ? 'h5' : 'h3'}
            fontWeight={isMobile ? 600 : 500}
            align='center'
            color={(theme) => theme.palette.text.primary}
            paddingX={4}
            marginX='auto'
            mb={8}
            sx={{
              zIndex: 0,
              maxWidth,
            }}
          >
            {jsonToHtml(staticContent.photogallery.title)}
          </Typography>

          <Gallery
            gallery={gallery}
            maxWidth={maxWidth}
            isMobile={isMobile}
            handleOpen={handleOpen}
            handleInitialSlide={handleInitialSlide}
          />
        </Box>
      </Element>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
        <PopupGallery photos={photos} initialSlide={initialSlide} handleClose={handleClose} />
      </Dialog>
    </>
  );
};
