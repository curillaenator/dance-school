import { ToolbarItemType, LandingStaticContentType } from '@src/types';

export const TOOLBAR_ITEMS: ToolbarItemType = [
  { title: 'ГЛАВНАЯ', to: 'main' },
  { title: 'ТРЕНЕРЫ', to: 'coaches' },
  { title: 'О НАС', to: 'aboutus' },
  { title: 'ЦЕНЫ', to: 'prices' },
  { title: 'КОНТАКТЫ', to: 'contacts' },
];

export const SCROLL_SPEED = 300;

export const INITIAL_STATIC_CONTENT: LandingStaticContentType = {
  coaches: {
    title: 'Тренеры',
    subtitle: '',
  },
  prices: {
    title: 'Цены',
    subtitle: '',
  },
  activities: {
    title: 'Наши активности',
    subtitle: '',
  },
};
