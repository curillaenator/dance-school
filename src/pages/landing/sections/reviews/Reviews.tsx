import React, { FC, useContext } from 'react';
import { Element } from 'react-scroll';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation } from 'swiper';
import styled from '@emotion/styled';

import { Review } from '@src/components/review';
import { SwiperButton } from './SwiperButton';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// import TelegramIcon from '@mui/icons-material/Telegram';

import { LandingSectionCommonProps } from '@src/types';

import { Context } from '@src/context';

import styles from './styles.module.css';

const SwiperStyled = styled(Swiper)({
  width: '100%',
  minHeight: '256px',
});

const R = [
  {
    id: 'review-1',
    author: 'Klark Kent',
    review: JSON.stringify(
      'ТОП тренер студии по латиноамериканской программе танцев. В танцах уже более 25 лет. Стаж преподавания более 15 лет. <br /><br /> Лучшие результаты учеников: чемпионы России в юниорской категории, чемпионы Москвы в юниорской категории, финалисты Чемпионата Мира в категории Молодежь. Помимо основной тренерской деятельности в Москве, работала по приглашению в других городах России, а также, проводила семинары в Китае.<br /><br /> В своей работе особое внимание уделяет механике движения и сложной координации. Раскрывает личный потенциал каждого подопечного.',
    ),
    rating: '2',
  },
  {
    id: 'review-2',
    author: 'Kent Klark',
    review: JSON.stringify('sudgcjksd isdchysiuod c douiscysdiu'),
    rating: '5',
  },
].reverse();

interface ReviewsProps extends LandingSectionCommonProps {
  handleOpen?: () => void;
}

export const Reviews: FC<ReviewsProps> = (props) => {
  const { name, maxWidth, handleOpen = () => {} } = props;

  const { isMobile } = useContext(Context);

  return (
    <Element name={name}>
      <Box width='100%' paddingY={16} bgcolor={(theme) => theme.palette.primary.main}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          align='center'
          color={(theme) => theme.palette.background.default}
          px={4}
          mb={4}
          mx='auto'
          fontWeight={500}
          maxWidth={maxWidth}
          zIndex={0}
        >
          Отзывы
        </Typography>

        <Box maxWidth={maxWidth} mx='auto' className={styles.swiperVars}>
          <SwiperStyled spaceBetween={0} slidesPerView={1}>
            <Box display='flex' justifyContent='space-between' px={4} mb={4}>
              <SwiperButton />
              <SwiperButton isNext />
            </Box>

            {R.map((review) => (
              <SwiperSlide key={review.id}>
                <Review {...review} />
              </SwiperSlide>
            ))}
          </SwiperStyled>
        </Box>

        <Box maxWidth={maxWidth} mx='auto' display='flex' justifyContent='center'>
          <Button
            variant='contained'
            size='large'
            color='success'
            onClick={handleOpen}
            sx={{
              height: 64,
              padding: '0 64px',
            }}
          >
            Оставить отзыв
          </Button>
        </Box>
      </Box>
    </Element>
  );
};
