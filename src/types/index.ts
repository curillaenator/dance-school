export type ThemeType = 'light' | 'dark';

// Landind and navigation

export type LandingSectionsType = 'main' | 'coaches' | 'prices' | 'aboutus' | 'contacts';

export type ToolbarItemType = {
  title: string;
  to: LandingSectionsType;
}[];

export interface LandingSectionCommonProps {
  name: LandingSectionsType;
  maxWidth?: string;
}

// Static landing content

export type StaticKeysType = 'coaches' | 'prices' | 'aboutus';

export interface StaticSectionType {
  title: string;
  subtitle?: string;
  subtitles?: Record<string, string>;
}

export type LandingStaticContentType = Record<StaticKeysType, StaticSectionType>;

// Data

export interface UserType {
  uid: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

export interface ApplicationType {
  id: string;
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

// Storage

export type StoragePathsType = 'mainSlider' | 'gallery';
