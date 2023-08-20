import { useCallback, useContext, useState, ChangeEvent, useEffect } from 'react';
import { scroller } from 'react-scroll';

import { ref, set, push, child, update } from 'firebase/database';
import { ref as refST, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { DB, ST } from '@src/config';

import { SCROLL_SPEED } from '@src/shared/constants';
import { Context } from '@src/context';
import { resizeFile, debouncedWriteDB, inputToHtml, htmlToInput } from '@src/utils';

import { CoachType, StaticSectionType } from '@src/types';

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
  const { coaches, staticContent, setLoading, updateStaticContent } = useContext(Context);
  const [newCoach, setNewCoach] = useState<NewCoachType>(INITIAL_COACH);

  const [coachFormPhoto, setCoachFormPhoto] = useState<string | null>(null);
  const [isCoachEdit, setIsCoachEdit] = useState<boolean>(false);

  const handleCoachesStatic = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: keyof StaticSectionType) => {
      updateStaticContent('coaches', { [key]: inputToHtml(e.target.value) } as Partial<StaticSectionType>);

      if (!e.target.value) return;

      setLoading(true);

      debouncedWriteDB({
        path: `static/coaches/${key}`,
        value: inputToHtml(e.target.value),
        onWriteEnd: () => setLoading(false),
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
    const { id, name, description, photoURL } = newCoach;

    if (!photoURL) return;

    setLoading(true);

    const coachData: CoachType = {
      id: '',
      name: inputToHtml(name),
      description: inputToHtml(description),
      photoURL: '',
    };

    if (typeof photoURL === 'string') {
      coachData.photoURL = photoURL;
    } else {
      const file = photoURL;
      coachData.photoURL = file.name;

      const resized = await resizeFile(file);
      await uploadBytes(refST(ST, `coaches/${file.name}`), resized, {
        cacheControl: 'public,max-age=7200',
        contentType: 'image/jpeg',
      });
    }

    if (!!id) {
      coachData.id = id;
    } else {
      const newCoachId = push(child(ref(DB), 'coaches')).key as string;
      coachData.id = newCoachId;
    }

    await set(ref(DB, `coaches/${coachData.id}`), coachData);

    setLoading(false);
    setIsCoachEdit(false);
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

  const onUpdateCoach = useCallback((coach: CoachType) => {
    const { id, name, description, photoURL } = coach;

    setNewCoach({
      id,
      name: htmlToInput(name),
      description: htmlToInput(description),
      // @ts-expect-error set string instead of file or null
      photoURL,
    });

    setIsCoachEdit(true);

    scroller.scrollTo('coach-edit-form', {
      duration: SCROLL_SPEED,
      smooth: true,
    });
  }, []);

  const onUpdateCoachCancel = useCallback(() => {
    setNewCoach(INITIAL_COACH);
    setIsCoachEdit(false);
  }, []);

  useEffect(() => {
    const { photoURL } = newCoach;

    if (!photoURL) {
      setCoachFormPhoto(null);
      return;
    }

    if (typeof photoURL === 'string') {
      getDownloadURL(refST(ST, `coaches/${photoURL}`)).then((url) => setCoachFormPhoto(url));
      return;
    }

    const localUrl = URL.createObjectURL(newCoach.photoURL as File);
    setCoachFormPhoto(localUrl);
  }, [newCoach]);

  return {
    coachesStatic: staticContent.coaches,
    isCoachEdit,
    coaches,
    newCoach,
    isNewCoachFilled: !!newCoach.name && !!newCoach.description && !!newCoach.photoURL,
    coachFormPhoto,
    handleCoachesStatic,
    handleNewCoach,
    removeCoach,
    addCoach,
    onUpdateCoach,
    onUpdateCoachCancel,
  };
};
