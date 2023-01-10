import { useEffect, useState, useCallback } from 'react';
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { UserType } from '@src/types';

const PROVIDER = new GoogleAuthProvider();
const ADMINS = JSON.parse(process.env.ADMINS as string) as string[];

export const useAuthControl = () => {
  const [uid, setUid] = useState<UserType | null>(null);
  const auth = getAuth();

  const signIn = useCallback(() => {
    signInWithPopup(auth, PROVIDER);
  }, [auth]);

  const logOut = useCallback(() => {
    signOut(auth);
  }, [auth]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUid(null);
        return;
      }

      const { uid, photoURL } = user;

      setUid({
        uid,
        photoURL,
        isAdmin: ADMINS.includes(uid),
      });
    });
  }, [auth]);

  return {
    uid,
    signIn,
    logOut,
  };
};
