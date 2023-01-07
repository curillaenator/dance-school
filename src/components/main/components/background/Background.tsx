import React, { FC } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';

import { ImageStyled, SwiperStyled } from './styled';
import { usePhotos } from './hooks/usePhotos';

import 'swiper/css';
import 'swiper/css/effect-fade';

export const Background: FC = () => {
  const { photos } = usePhotos();

  return (
    <SwiperStyled
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      speed={1200}
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{
        clickable: false,
      }}
      navigation={false}
      modules={[Autoplay, EffectFade]}
      effect={'fade'}
    >
      {photos.map((photo, i) => (
        <SwiperSlide key={`photo${i}`}>
          <ImageStyled src={photo} />
        </SwiperSlide>
      ))}
    </SwiperStyled>
  );
};
