import React, { FC } from 'react';
import { useSwiper } from 'swiper/react';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import Button from '@mui/material/Button';

interface SwiperButtonProps {
  isNext?: boolean;
  slides?: number;
}

export const SwiperButton: FC<SwiperButtonProps> = (props) => {
  const { isNext } = props;
  const swiper = useSwiper();

  // const [disabled, setDisabled] = useState<boolean>(false);

  // useEffect(() => {
  //   if (isNext) {
  //     setDisabled(swiper.isEnd);
  //   } else {
  //     setDisabled(swiper.isBeginning);
  //   }

  //   const watch = (instance: Swiper) => {
  //     if (isNext) {
  //       setDisabled(instance.isEnd);
  //     } else {
  //       setDisabled(instance.isBeginning);
  //     }
  //   };

  //   swiper.on('slideChange', watch);

  //   return () => swiper.off('slideChange', watch);
  // }, [isNext, swiper, slides]);

  return (
    <Button
      size='small'
      variant='text'
      onClick={() => (isNext ? swiper.slideNext() : swiper.slidePrev())}
      // color='error'
      // disabled={disabled}
      endIcon={isNext ? <ArrowRightIcon /> : undefined}
      startIcon={!isNext ? <ArrowLeftIcon /> : undefined}
    >
      {isNext ? 'Еще' : 'Назад'}
    </Button>
  );
};
