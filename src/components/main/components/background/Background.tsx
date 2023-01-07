import React, { FC, useContext } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';

import { Context } from '@src/context';

import { ImageStyled, SwiperStyled } from './styled';

import 'swiper/css';
import 'swiper/css/effect-fade';

export const Background: FC = () => {
  const { mainSlider } = useContext(Context);

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
      {mainSlider.map((photo, i) => (
        <SwiperSlide key={`photo${i}`}>
          <ImageStyled src={photo} />
        </SwiperSlide>
      ))}
    </SwiperStyled>
  );
};
