import { useCallback, ChangeEvent, useContext, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';
import { ST } from '@src/config';

import { Context } from '@src/context';
import { refetchStorage, resizeFile, findStoragePathFromUrl } from '@src/utils';

import { GALLERY_CONFIG } from '@src/shared/constants';
import { StoragePathsType } from '@src/types';

export const usePhotoControl = () => {
  const { mainSlider, updateMainSlider, gallery, updateGallery, loading, setLoading } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  const photoUpdaters: Record<StoragePathsType, (url: string[]) => void> = useMemo(
    () => ({
      mainSlider: updateMainSlider,
      gallery: updateGallery,
    }),
    [updateGallery, updateMainSlider],
  );

  const handleRemove = useCallback(
    async (url: string, storagePath: StoragePathsType) => {
      const fileName = findStoragePathFromUrl(url, storagePath);

      if (!!fileName) {
        try {
          setLoading(true);
          await deleteObject(ref(ST, `${storagePath}/${fileName}`));
          await refetchStorage(storagePath, photoUpdaters[storagePath]);

          enqueueSnackbar('Фото удалено', { variant: 'warning' });
          setLoading(false);
        } catch (err) {
          enqueueSnackbar('Что-то не так :(', { variant: 'error' });
          setLoading(false);
        }
      }
    },
    [photoUpdaters, setLoading, enqueueSnackbar],
  );

  const handleUpload = useCallback(
    async (a: ChangeEvent<HTMLInputElement>, storagePath: StoragePathsType, url?: string) => {
      const files = a.target.files;
      if (!files || !files.length) return;

      setLoading(true);

      const fileNameToReplace = findStoragePathFromUrl(
        url || 'realy-none-existing-file-name.bad-extention',
        storagePath,
      );

      if (fileNameToReplace) {
        const resized = await resizeFile(files[0]);
        await uploadBytes(ref(ST, `${storagePath}/${fileNameToReplace}`), resized);
        refetchStorage(storagePath, photoUpdaters[storagePath]);

        enqueueSnackbar('Фото обновлено', { variant: 'success' });
        setLoading(false);

        return;
      }

      const resized = [];

      for (let i = 0; i < files.length; i++) {
        resized.push(resizeFile(files[i]));
      }

      const resizedFiles = await Promise.all(resized);
      const uploads = resizedFiles.map(async (file) => await uploadBytes(ref(ST, `${storagePath}/${file.name}`), file));

      Promise.all(uploads).then(() => {
        refetchStorage(storagePath, photoUpdaters[storagePath]);

        enqueueSnackbar('Фото загружено', { variant: 'success' });
        setLoading(false);
      });
    },
    [photoUpdaters, setLoading, enqueueSnackbar],
  );

  return {
    gallery: gallery.map((url, i) => ({
      id: `photoId${i}`,
      img: url,
      title: `photo${i}`,
      rows: GALLERY_CONFIG[i]?.rows || 1,
      cols: GALLERY_CONFIG[i]?.cols || 1,
    })),

    mainSlider,
    loading,
    handleUpload,
    handleRemove,
  };
};
