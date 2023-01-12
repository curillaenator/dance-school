import { ToolbarItemType, LandingStaticContentType } from '@src/types';

export const TOOLBAR_ITEMS: ToolbarItemType = [
  { title: 'ГЛАВНАЯ', to: 'main' },
  { title: 'О НАС', to: 'aboutus' },
  { title: 'ТРЕНЕРЫ', to: 'coaches' },
  { title: 'ЦЕНЫ', to: 'prices' },
  { title: 'КОНТАКТЫ', to: 'contacts' },
];

export const SCROLL_SPEED = 300;

export const INITIAL_STATIC_CONTENT: LandingStaticContentType = {
  coaches: {
    title: 'Тренеры',
    subtitle: '',
    subtitles: {},
  },
  prices: {
    title: 'Цены',
    subtitle: '',
    subtitles: {},
  },
  aboutus: {
    title: 'Наши активности',
    subtitle: '',
    subtitles: {},
  },
};
