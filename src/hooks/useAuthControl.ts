import { useEffect, useState, useCallback } from 'react';
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { UserType } from '@src/types';

const provider = new GoogleAuthProvider();

const ADMINS: Record<string, string> = {
  '2YP21NrYIHgU52Abi1ATdsE6zjL2': 'curillaenator@gmail.com',
};

const isAdminCheck = (uid: string, email: string | null) => uid in ADMINS && ADMINS[uid] === email;

export const useAuthControl = () => {
  const [uid, setUid] = useState<UserType | null>(null);

  const auth = getAuth();

  const signIn = useCallback(() => {
    signInWithPopup(auth, provider);
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

      const { uid, photoURL, email } = user;
      setUid({ uid, photoURL, isAdmin: isAdminCheck(uid, email) });
    });
  }, [auth]);

  return {
    uid,
    signIn,
    logOut,
  };
};
