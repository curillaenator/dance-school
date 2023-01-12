import { useCallback, useContext, useState, ChangeEvent } from 'react';

import { ref, set, push, child, update } from 'firebase/database';
import { ref as refST, uploadBytes, deleteObject } from 'firebase/storage';
import { DB, ST } from '@src/config';

import { Context } from '@src/context';
import { resizeFile, debounced } from '@src/utils';

import { CoachType, StaticKeysType, StaticSectionType } from '@src/types';

interface NewCoachType extends Omit<CoachType, 'photoURL'> {
  photoURL: File | null;
}

interface StaticWriteOptionsType {
  path: string;
  value: string;
  setLoading: (isLoading: boolean) => void;
}

const INITIAL_COACH: NewCoachType = {
  id: '',
  name: '',
  description: '',
  photoURL: null,
};

const debouncedStaticWrite = debounced((opts: StaticWriteOptionsType) => {
  set(ref(DB, opts.path), opts.value).then(() => opts.setLoading(false));
});

export const useCoachesControl = () => {
  const { coaches, staticContent, setLoading, updateStaticContent } = useContext(Context);
  const [newCoach, setNewCoach] = useState<NewCoachType>(INITIAL_COACH);

  const handleCoachesStatic = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: StaticKeysType) => {
      setLoading(true);
      updateStaticContent('coaches', { [key]: e.target.value } as Partial<StaticSectionType>);
      debouncedStaticWrite({
        path: `static/coaches/${key}`,
        value: e.target.value,
        setLoading,
      });
    },
    [setLoading, updateStaticContent],
  );

  const handleNewCoach = useCallback((e: ChangeEvent<HTMLInputElement>, key: keyof NewCoachType) => {
    if (key === 'photoURL' && e.target.files !== null) {
      const files = e.target.files;
      setNewCoach((prev) => ({ ...prev, photoURL: files[0] }));
      return;
    }

    setNewCoach((prev) => ({ ...prev, [key]: e.target.value }));
  }, []);

  const addCoach = useCallback(async () => {
    if (!newCoach.photoURL) return;

    setLoading(true);

    const file = newCoach.photoURL;
    const newCoachId = push(child(ref(DB), 'coaches')).key as string;

    const data = {
      ...newCoach,
      id: newCoachId,
      photoURL: file.name,
    };

    const resized = await resizeFile(file);
    await uploadBytes(refST(ST, `coaches/${file.name}`), resized);
    await set(ref(DB, `coaches/${newCoachId}`), data);

    setLoading(false);
    setNewCoach(INITIAL_COACH);
  }, [newCoach, setLoading]);

  const removeCoach = useCallback(
    async (coach: CoachType) => {
      setLoading(true);

      const { id, photoURL } = coach;
      await deleteObject(refST(ST, `coaches/${photoURL}`));
      await update(ref(DB), { [`coaches/${id}`]: null });
      setLoading(false);
    },
    [setLoading],
  );

  return {
    coachesStatic: staticContent.coaches,
    coaches,
    newCoach,
    isNewCoachFilled: !!newCoach.name && !!newCoach.description && !!newCoach.photoURL,
    handleCoachesStatic,
    handleNewCoach,
    removeCoach,
    addCoach,
  };
};
