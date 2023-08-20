import React from 'react';
import type { ToolbarItemType } from '@src/types';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import AutoAwesomeMosaicRoundedIcon from '@mui/icons-material/AutoAwesomeMosaicRounded';
import WebStoriesRoundedIcon from '@mui/icons-material/WebStoriesRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import DialpadRoundedIcon from '@mui/icons-material/DialpadRounded';

export const SECTION_TITLE_FONT_WEIGHT = 700;
export const SECTION_ITEM_TITLE_FONT_WEIGHT = 600;

export const MAIN_SLIDER_DELAY = 3000;
export const MAIN_SLIDER_SPEED = 800;
export const SCROLL_SPEED = 500;

export const TOOLBAR_ITEMS: ToolbarItemType = [
  {
    title: 'ГЛАВНАЯ',
    to: 'main',
    icon: <HomeRoundedIcon color='primary' />,
  },
  {
    title: 'О НАС',
    to: 'aboutus',
    icon: <HelpCenterRoundedIcon color='primary' />,
  },
  {
    title: 'ПРОГРАММЫ',
    to: 'programs',
    icon: <AutoAwesomeMosaicRoundedIcon color='primary' />,
  },
  {
    title: 'ФОТО',
    to: 'photogallery',
    icon: <WebStoriesRoundedIcon color='primary' />,
  },
  {
    title: 'ТРЕНЕРЫ',
    to: 'coaches',
    icon: <PeopleAltRoundedIcon color='primary' />,
  },
  {
    title: 'ЦЕНЫ',
    to: 'prices',
    icon: <LocalOfferRoundedIcon color='primary' />,
  },
  {
    title: 'КОНТАКТЫ',
    to: 'contacts',
    icon: <DialpadRoundedIcon color='primary' />,
  },
];

const DUMMY = JSON.stringify('');

export const INITIAL_STATIC_CONTENT = {
  coaches: {
    title: DUMMY,
    subtitle: DUMMY,
  },
  prices: {
    title: DUMMY,
    subtitle: DUMMY,
  },
  aboutus: {
    title: DUMMY,
    subtitle: DUMMY,
  },
  programs: {
    title: DUMMY,
    subtitle: DUMMY,
  },
  photogallery: {
    title: DUMMY,
    subtitle: DUMMY,
  },
  contacts: {
    tels: '',
    email: '',
    telegram: '',
    whatsapp: '',
    instagram: '',
    vkontakte: '',
    youtube: '',
  },
};

export const GALLERY_CONFIG = [
  { id: 0, rows: 1, cols: 2 },
  { id: 1, rows: 1, cols: 2 },
  { id: 2, rows: 1, cols: 1 },
  { id: 3, rows: 2, cols: 2 },
  { id: 4, rows: 1, cols: 1 },
  { id: 5, rows: 1, cols: 1 },
  { id: 6, rows: 1, cols: 1 },
  { id: 7, rows: 1, cols: 2 },
  { id: 8, rows: 1, cols: 2 },
];
