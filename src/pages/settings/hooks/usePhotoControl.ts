import { useCallback, ChangeEvent, useContext } from 'react';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';
import { ST } from '@src/config';

import { Context } from '@src/context';

import { refetchSlides, resizeFile } from './utils';

type StoragePathType = 'mainSlider' | 'gallery';

export const usePhotoControl = () => {
  const { mainSlider, updateMainSlider, gallery, updateGallery, loading, setLoading } = useContext(Context);

  const handleRemoveMainSlider = useCallback(
    (url: string) => {
      setLoading(true);

      const match = url.match(/mainSlider%2F.*\?alt*/);
      const fPath = match ? match[0] : null;

      if (!!fPath) {
        const path = fPath.replace('mainSlider%2F', '').replace('?alt', '');

        deleteObject(ref(ST, `mainSlider/${path}`))
          .then(() => {
            refetchSlides('mainSlider', updateMainSlider);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setLoading(false);
      }
    },
    [setLoading, updateMainSlider],
  );

  const handleRemoveGallery = useCallback(
    (url: string) => {
      setLoading(true);

      const match = url.match(/gallery%2F.*\?alt*/);
      const fPath = match ? match[0] : null;

      if (!!fPath) {
        const path = fPath.replace('gallery%2F', '').replace('?alt', '');

        deleteObject(ref(ST, `gallery/${path}`))
          .then(() => {
            refetchSlides('gallery', updateGallery);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setLoading(false);
      }
    },
    [setLoading, updateGallery],
  );

  const handleUpload = useCallback(
    (a: ChangeEvent<HTMLInputElement>, storagePath: StoragePathType) => {
      setLoading(true);

      const updaters: Record<StoragePathType, (url: string[]) => void> = {
        mainSlider: updateMainSlider,
        gallery: updateGallery,
      };

      const files = a.target.files;

      if (!!files && files.length > 0) {
        const resized = [];

        for (let i = 0; i < files.length; i++) {
          resized.push(resizeFile(files[i]));
        }

        Promise.all(resized).then((res) =>
          res.forEach((file) => {
            uploadBytes(ref(ST, `${storagePath}/${file.name}`), file)
              .then(() => {
                refetchSlides(storagePath, updaters[storagePath]);
                setLoading(false);
              })
              .catch(() => setLoading(false));
          }),
        );
      } else {
        setLoading(false);
      }
    },
    [setLoading, updateGallery, updateMainSlider],
  );

  return {
    gallery,
    mainSlider,
    loading,
    handleUpload,
    handleRemoveMainSlider,
    handleRemoveGallery,
  };
};
