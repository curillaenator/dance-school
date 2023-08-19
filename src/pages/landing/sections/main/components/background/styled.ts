import { Swiper } from 'swiper/react';
import styled from '@emotion/styled';

export const ImageStyled = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const SwiperStyled = styled(Swiper)<{ isMobile?: boolean }>(({ isMobile }) => {
  return {
    position: 'absolute',
    top: `${isMobile ? '80px' : '120px'}`,
    left: 0,
    width: '100%',
    height: `calc(100% - ${isMobile ? '80px' : '120px'})`,
    zIndex: 0,
  };
});
