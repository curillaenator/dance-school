import { createContext } from 'react';
import { UserType } from '@src/types';

interface ContextType {
  uid: UserType | null;
  isMobile: boolean;
  signIn: () => void;
  logOut: () => void;
  mainSlider: string[];
}

export const Context = createContext<ContextType>({
  uid: null,
  isMobile: false,
  signIn: () => {},
  logOut: () => {},
  mainSlider: [],
});
