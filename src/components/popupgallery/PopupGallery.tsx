import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import styled from '@emotion/styled';

import Close from '@mui/icons-material/Close';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import styles from './styles.module.scss';

const ImageStyled = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const SwiperStyled = styled(Swiper)({
  width: '100%',
  height: '90vh',
});

interface PopupGalleryProps {
  initialSlide?: number;
  photos: string[];
  handleClose: () => void;
}

export const PopupGallery: FC<PopupGalleryProps> = (props) => {
  const { initialSlide = 0, photos, handleClose } = props;

  return (
    <Box
      className={styles.variables}
      sx={{
        position: 'relative',
        width: '100%',
      }}
    >
      <IconButton
        onClick={handleClose}
        color='primary'
        size='large'
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <Close />
      </IconButton>

      <SwiperStyled
        spaceBetween={0}
        slidesPerView={1}
        modules={[Pagination, Navigation]}
        navigation={true}
        initialSlide={initialSlide}
        pagination={{
          type: 'progressbar',
        }}
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo}>
            <ImageStyled src={photo} />
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </Box>
  );
};