import React, { FC } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';

import { ImageStyled, SwiperStyled } from './styled';

import { photos } from './constants';

import 'swiper/css';
import 'swiper/css/effect-fade';

export const Background: FC = () => {
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
      {photos.map((photo) => (
        <SwiperSlide>
          <ImageStyled src={photo} />
        </SwiperSlide>
      ))}
    </SwiperStyled>
  );
};
