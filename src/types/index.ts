export type ApplicationStepType = 'new' | 'loading' | 'success' | 'error' | 'login' | 'review';

export type ThemeType = 'light' | 'dark';

// Landind and navigation

export type LandingSectionsType =
  | 'reviews'
  | 'main'
  | 'coaches'
  | 'prices'
  | 'aboutus'
  | 'contacts'
  | 'programs'
  | 'photogallery';

export type ToolbarItemType = {
  title: string;
  to: LandingSectionsType;
}[];

export interface LandingSectionCommonProps {
  name: LandingSectionsType;
  maxWidth?: string;
}

// Static landing content

export type StaticKeysType = 'coaches' | 'prices' | 'aboutus' | 'programs' | 'photogallery' | 'contacts';

export interface StaticSectionType {
  title: string;
  subtitle?: string;
}

export type ContactsType = 'tels' | 'email' | 'telegram' | 'whatsapp' | 'instagram' | 'vkontakte' | 'youtube';
export type StaticContactsSectionType = Record<ContactsType, string>;

export type LandingStaticContentType = Record<StaticKeysType, StaticSectionType>;

// Data

export interface UserType {
  uid: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

export interface ApplicationType {
  id: string;
  uid?: null | string;
  name: string;
  tel: string;
  comment: string;
  created: string;
  called: boolean;
  completed: boolean;
}

export interface CoachType {
  id: string;
  name: string;
  description: string;
  photoURL: string;
}

export interface PriceType {
  id: string;
  name: string;
  price: string;
  description: string;
}

export interface VideoType {
  id: string;
  title: string;
  description: string;
  thumbPath: string;
  videoPath: string;
}

export interface ReviewType {
  id: string;
  author: string;
  review: string;
  rating: string;
}

// Storage

export type StoragePathsType = 'mainSlider' | 'gallery';
