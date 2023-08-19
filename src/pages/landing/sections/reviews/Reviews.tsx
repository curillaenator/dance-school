import React, { FC, useContext } from 'react';
import { Element } from 'react-scroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import styled from '@emotion/styled';

import { Review } from '@src/components/review';
import { SwiperButton } from './SwiperButton';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// import TelegramIcon from '@mui/icons-material/Telegram';

import type { LandingSectionCommonProps } from '@src/types';

import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';

import { Context } from '@src/context';

import styles from './styles.module.css';

const SwiperStyled = styled(Swiper)({
  width: '100%',
  minHeight: '256px',
});

interface ReviewsProps extends LandingSectionCommonProps {
  handleOpen?: () => void;
}

export const Reviews: FC<ReviewsProps> = (props) => {
  const { name, maxWidth, handleOpen = () => {} } = props;

  const { isMobile, reviews } = useContext(Context);

  return (
    <Element name={name}>
      <Box width='100%' paddingY={16} bgcolor={(theme) => theme.palette.common.white}>
        <Typography
          variant={isMobile ? 'h5' : 'h3'}
          fontWeight={isMobile ? 600 : 500}
          align='center'
          color={(theme) => theme.palette.background.default}
          px={4}
          mb={4}
          mx='auto'
          maxWidth={maxWidth}
          zIndex={0}
        >
          Отзывы
        </Typography>

        <Box maxWidth={maxWidth} mx='auto' className={styles.swiperVars}>
          <SwiperStyled
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={500}
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            // effect={'fade'}
            loop
          >
            <Box display='flex' justifyContent='space-between' px={4} mb={4}>
              <SwiperButton slides={reviews.length} />
              <SwiperButton slides={reviews.length} isNext />
            </Box>

            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <Review {...review} isMobile={isMobile} />
              </SwiperSlide>
            ))}
          </SwiperStyled>
        </Box>

        <Box maxWidth={maxWidth} mx='auto' display='flex' justifyContent='center'>
          <Button variant='contained' size='large' startIcon={<RateReviewRoundedIcon />} onClick={handleOpen}>
            Оставить отзыв
          </Button>
        </Box>
      </Box>
    </Element>
  );
};
