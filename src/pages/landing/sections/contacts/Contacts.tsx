import React, { FC } from 'react';
import { Element } from 'react-scroll';
import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

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

  return (
    <Element name={name}>
      <Box
        display='flex'
        flexDirection={isMobile ? 'column' : 'row'}
        maxWidth={maxWidth}
        mx='auto'
        gap={isMobile ? 4 : 2}
        p={4}
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
              <Typography color='secondary'>{contact[1]}</Typography>
            </Box>
          ))}
        </Box>

        <Box maxWidth={300} display='flex' alignItems='center' gap={2} flexDirection={isMobile ? 'column' : 'row'}>
          <LogoStyled src='images/logo.png' />
          <Typography color='secondary' variant='body1' textAlign={isMobile ? 'center' : 'left'}>
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
