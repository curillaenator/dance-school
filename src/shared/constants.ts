import { ToolbarItemType, LandingStaticContentType } from '@src/types';

export const MAIN_SLIDER_DELAY = 3000;
export const MAIN_SLIDER_SPEED = 800;
export const SCROLL_SPEED = 300;

export const TOOLBAR_ITEMS: ToolbarItemType = [
  { title: 'ГЛАВНАЯ', to: 'main' },
  { title: 'О НАС', to: 'aboutus' },
  { title: 'ПРОГРАММЫ', to: 'programs' },
  { title: 'ФОТО', to: 'photogallery' },
  { title: 'ТРЕНЕРЫ', to: 'coaches' },
  { title: 'ЦЕНЫ', to: 'prices' },
  { title: 'КОНТАКТЫ', to: 'contacts' },
];

const DUMMY = JSON.stringify('');

export const INITIAL_STATIC_CONTENT: LandingStaticContentType = {
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
