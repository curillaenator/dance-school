import { createContext } from 'react';
import { INITIAL_STATIC_CONTENT } from '@src/shared/constants';

import {
  UserType,
  CoachType,
  LandingStaticContentType,
  StaticSectionType,
  StaticKeysType,
  VideoType,
  PriceType,
} from '@src/types';

interface ContextType {
  isMobile: boolean;
  toggleTheme: () => void;

  openDrawer: () => void;
  closeDrawer: () => void;

  uid: UserType | null;
  signIn: () => void;
  logOut: () => void;
  signInWithLogin: (
    email: string,
    pass: string,
    opts?: {
      errCb?: (message: string) => void;
      scCb?: () => void;
    },
  ) => void;
  signUpWithLogin: (
    email: string,
    pass: string,
    opts?: {
      errCb?: (message: string) => void;
      scCb?: () => void;
    },
  ) => void;

  mainSlider: string[];
  gallery: string[];
  updateMainSlider: (newSlides: string[]) => void;
  updateGallery: (newSlides: string[]) => void;

  staticContent: LandingStaticContentType;
  updateStaticContent: (key: StaticKeysType, data: Partial<StaticSectionType>) => void;

  desiredCoach: CoachType | null;
  setDesiredCoach: (coach: CoachType | null) => void;

  coaches: CoachType[];
  videos: VideoType[];
  prices: PriceType[];

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
  signInWithLogin: () => {},
  signUpWithLogin: () => {},

  mainSlider: [],
  gallery: [],
  updateMainSlider: () => {},
  updateGallery: () => {},

  staticContent: INITIAL_STATIC_CONTENT,
  updateStaticContent: () => {},

  desiredCoach: null,
  setDesiredCoach: () => {},

  coaches: [],
  videos: [],
  prices: [],

  loading: false,
  setLoading: () => {},
});
