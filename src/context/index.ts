/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from 'react';
import { UserType, CoachType } from '@src/types';

interface ContextType {
  isMobile: boolean;
  toggleTheme: () => void;

  openDrawer: () => void;
  closeDrawer: () => void;

  uid: UserType | null;
  signIn: () => void;
  logOut: () => void;

  mainSlider: string[];
  gallery: string[];
  updateMainSlider: (newSlides: string[]) => void;
  updateGallery: (newSlides: string[]) => void;

  coaches: CoachType[];
  updateCoaches: (newCoaches: CoachType[]) => void;

  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const Context = createContext<ContextType>({
  isMobile: false,
  toggleTheme: () => {},

  openDrawer: () => {},
  closeDrawer: () => {},

  uid: null,
  signIn: () => {},
  logOut: () => {},

  mainSlider: [],
  gallery: [],
  updateMainSlider: () => {},
  updateGallery: () => {},

  coaches: [],
  updateCoaches: () => {},

  loading: false,
  setLoading: () => {},
});
