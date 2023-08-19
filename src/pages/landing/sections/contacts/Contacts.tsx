import React, { FC, useEffect, useState, useCallback, useRef } from 'react';
import { Element } from 'react-scroll';
import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { debounced } from '@src/utils';

import { SOCIAL_ICONS_ASSOC, NON_SOCIAL_ICONS_ASSOC } from './constants';

import { useContacts } from './hooks/useContacts';

import { LandingSectionCommonProps } from '@src/types';

export const LogoStyled = styled.img({
  width: '48px',
  height: '48px',
  objectFit: 'cover',
});

export const Contacts: FC<LandingSectionCommonProps> = (props) => {
  const { name, maxWidth } = props;
  const { isMobile, socialsMap, parsedContacts } = useContacts();

  const getMapWidth = (innerWidth: number) => {
    if (innerWidth > 1280) return 1280 - 64;
    return innerWidth - 64 - (isMobile ? 0 : 12);
  };

  const [mapWidth, setMapWidth] = useState<number>(getMapWidth(window.innerWidth));

  const ref = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line
  const debouncedSetWidth = useCallback(
    debounced((e: Event) => {
      if (!ref.current || !e) return;
      setMapWidth(ref.current.clientWidth - 64);
    }, 100),
    [],
  );

  useEffect(() => {
    window.addEventListener('resize', debouncedSetWidth);
    return () => window.removeEventListener('resize', debouncedSetWidth);
  }, [debouncedSetWidth]);

  useEffect(() => {
    if (!ref.current) return;
    setMapWidth(ref.current.clientWidth - 64);
  }, []);

  return (
    <Element name={name}>
      <Typography
        variant={isMobile ? 'h5' : 'h3'}
        fontWeight={600}
        align='center'
        color={(theme) => theme.palette.text.primary}
        px={4}
        mb={4}
        mt={16}
        mx='auto'
        maxWidth={maxWidth}
        zIndex={0}
      >
        Контакты
      </Typography>

      <Box maxWidth={maxWidth} mx='auto' px={4} ref={ref}>
        <Typography color={(theme) => theme.palette.text.secondary} variant='subtitle1' textAlign={'left'} mb={2}>
          Где мы находимся:
        </Typography>

        <iframe
          src='https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=45642266991'
          width={mapWidth}
          height={384}
          // frameBorder='0'
          style={{
            border: 'none',
            outline: 'none',
            borderRadius: '8px',
          }}
        ></iframe>
      </Box>

      <Box
        display='flex'
        flexDirection={isMobile ? 'column' : 'row'}
        maxWidth={maxWidth}
        mx='auto'
        gap={isMobile ? 4 : 2}
        p={4}
        marginBottom={16}
        justifyContent='space-between'
        alignItems='center'
      >
        <Box
          flexShrink={0}
          minWidth='240px'
          display={isMobile ? 'flex' : 'block'}
          flexDirection='column'
          alignItems='center'
        >
          {parsedContacts.map((contact) => (
            <Box display='flex' gap={1} key={contact[0]}>
              {NON_SOCIAL_ICONS_ASSOC[contact[0]]}
              <Typography color={(theme) => theme.palette.text.secondary} variant='subtitle1'>
                {contact[1]}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box maxWidth={300} display='flex' alignItems='center' gap={2} flexDirection={isMobile ? 'column' : 'row'}>
          <LogoStyled src='images/logo.png' />
          <Typography
            color={(theme) => theme.palette.text.secondary}
            variant='subtitle1'
            textAlign={isMobile ? 'center' : 'left'}
          >
            Профессиональная студия спортивно-бальных танцев «БАСТИОН»
          </Typography>
        </Box>

        <Box
          display='flex'
          gap={1}
          flexShrink={0}
          height='fit-content'
          minWidth='240px'
          justifyContent={isMobile ? 'center' : 'flex-end'}
        >
          {socialsMap.map((social) => (
            <IconButton color='secondary' href={social[1]} key={social[0]} target='_blank'>
              {SOCIAL_ICONS_ASSOC[social[0]]}
            </IconButton>
          ))}
        </Box>
      </Box>
    </Element>
  );
};
