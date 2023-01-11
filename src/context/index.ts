/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from 'react';
import { UserType } from '@src/types';

interface ContextType {
  uid: UserType | null;
  isMobile: boolean;
  signIn: () => void;
  logOut: () => void;
  mainSlider: string[];
  gallery: string[];
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleTheme: () => void;
  updateMainSlider: (newSlides: string[]) => void;
  updateGallery: (newSlides: string[]) => void;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const Context = createContext<ContextType>({
  uid: null,
  isMobile: false,
  signIn: () => {},
  logOut: () => {},
  mainSlider: [],
  gallery: [],
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleTheme: () => {},
  updateMainSlider: () => {},
  updateGallery: () => {},
  loading: false,
  setLoading: () => {},
});
