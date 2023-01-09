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

export type LandingSectionsType = 'main' | 'coaches';

export type ToolbarItemType = {
  title: string;
  to: LandingSectionsType;
}[];

export interface LandingSectionCommonProps {
  name: LandingSectionsType;
}
