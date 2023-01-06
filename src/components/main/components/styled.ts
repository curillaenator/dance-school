import { Swiper } from 'swiper/react';
import styled from '@emotion/styled';

export const ImageStyled = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const SwiperStyled = styled(Swiper)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
});
