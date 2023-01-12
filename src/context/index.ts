import { createContext } from 'react';
import { UserType, CoachType, LandingStaticContentType, StaticSectionType, StaticKeysType } from '@src/types';
import { INITIAL_STATIC_CONTENT } from '@src/shared/constants';

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

  staticContent: LandingStaticContentType;
  updateStaticContent: (key: StaticKeysType, data: Partial<StaticSectionType>) => void;

  coaches: CoachType[];

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

  staticContent: INITIAL_STATIC_CONTENT,
  updateStaticContent: () => {},

  coaches: [],

  loading: false,
  setLoading: () => {},
});
