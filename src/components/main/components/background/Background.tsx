import React, { FC, useContext } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';

import { Context } from '@src/context';

import { ImageStyled, SwiperStyled } from './styled';

export const Background: FC = () => {
  const { mainSlider } = useContext(Context);
  const theme = useTheme();

  return (
    <>
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

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(to bottom, ${theme.palette.background.default} 0%, transparent 23%, transparent 100%)`,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(to bottom, transparent 0%, transparent 17%, ${theme.palette.background.default} 100%)`,
        }}
      />
    </>
  );
};
