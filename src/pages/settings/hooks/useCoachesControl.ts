import { useCallback, useContext, useState, ChangeEvent } from 'react';

import { ref, set, push, child } from 'firebase/database';
import { DB, ST } from '@src/config';

import { ref as refST, uploadBytes } from 'firebase/storage';

import { Context } from '@src/context';
import { getDatabaseData, resizeFile } from '@src/utils';

import { CoachType } from '@src/types';

interface NewCoachType extends Omit<CoachType, 'photoURL'> {
  photoURL: File | null;
}

const INITIAL_COACH: NewCoachType = {
  id: '',
  name: '',
  description: '',
  photoURL: null,
};

export const useCoachesControl = () => {
  const { coaches, updateCoaches, setLoading } = useContext(Context);
  const [newCoach, setNewCoach] = useState<NewCoachType>(INITIAL_COACH);

  const handleNewCoach = useCallback((e: ChangeEvent<HTMLInputElement>, key: keyof NewCoachType) => {
    if (key === 'photoURL' && e.target.files !== null) {
      const file = e.target.files;
      setNewCoach((prev) => ({ ...prev, photoURL: file[0] }));
      return;
    }

    setNewCoach((prev) => ({ ...prev, [key]: e.target.value }));
  }, []);

  const addCoach = useCallback(() => {
    if (!newCoach.photoURL) return;

    setLoading(true);

    const file = newCoach.photoURL as File;
    const newCoachId = push(child(ref(DB), 'coaches')).key as string;

    const data = { ...newCoach, id: newCoachId, photoURL: file.name };

    set(ref(DB, `coaches/${newCoachId}`), data).then(async () => {
      const resized = await resizeFile(file);
      await uploadBytes(refST(ST, `coaches/${file.name}`), resized);
      getDatabaseData('coaches', updateCoaches);

      setLoading(false);
      setNewCoach(INITIAL_COACH);
    });
  }, [newCoach]);

  return {
    coaches,
    newCoach,
    isNewCoachFilled: !!newCoach.name && !!newCoach.description && !!newCoach.photoURL,
    handleNewCoach,
    addCoach,
  };
};
