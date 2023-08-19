import { Swiper } from 'swiper/react';
import styled from '@emotion/styled';

export const ImageStyled = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const SwiperStyled = styled(Swiper)({
  position: 'absolute',
  top: '120px',
  left: 0,
  width: '100%',
  height: 'calc(100% - 120px)',
  zIndex: 0,
});
