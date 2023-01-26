import { useEffect, useState, useCallback } from 'react';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { UserType } from '@src/types';

type SignWithLoginType = (
  email: string,
  pass: string,
  opts?: {
    errCb?: (message: string) => void;
    scCb?: () => void;
  },
) => void;

const PROVIDER = new GoogleAuthProvider();
const ADMINS = JSON.parse(process.env.ADMINS as string) as string[];

const DEFAULT_LOGIN_OPTS = { errCb: () => {}, scCb: () => {} };

const auth = getAuth();

export const useAuthControl = () => {
  const [uid, setUid] = useState<UserType | null>(null);

  const signIn = useCallback(() => {
    signInWithPopup(auth, PROVIDER);
  }, []);

  const logOut = useCallback(() => {
    signOut(auth);
  }, []);

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
  }, []);

  const signInWithLogin: SignWithLoginType = useCallback((email, pass, opts = DEFAULT_LOGIN_OPTS) => {
    const { errCb = () => {}, scCb = () => {} } = opts;

    signInWithEmailAndPassword(auth, email, pass)
      .then(() => scCb())
      .catch((err) => errCb(err.message));
  }, []);

  const signUpWithLogin: SignWithLoginType = useCallback((email, pass, opts = DEFAULT_LOGIN_OPTS) => {
    const { errCb = () => {}, scCb = () => {} } = opts;

    console.log(email, pass);

    createUserWithEmailAndPassword(auth, email, pass)
      .then(() => scCb())
      .catch((err) => {
        console.log(err);
        errCb(err.message);
      });
  }, []);

  return {
    uid,
    signIn,
    logOut,
    signInWithLogin,
    signUpWithLogin,
  };
};
