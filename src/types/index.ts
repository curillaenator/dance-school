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
