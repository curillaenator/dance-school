import Resizer from 'react-image-file-resizer';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { ST, DB } from '@src/config';

import { ref as dbRef, get } from 'firebase/database';

export const resizeFile = (file: File, toSize = 1440): Promise<File> => {
  return new Promise((resolve) =>
    Resizer.imageFileResizer(file, toSize, toSize, 'JPEG', 85, 0, (resized) => resolve(resized as File), 'file'),
  );
};

export const refetchStorage = (path: string, setter: (urls: string[]) => void) => {
  listAll(ref(ST, path))
    .then((res) => res.items.map((item) => getDownloadURL(item)))
    .then((promises) => Promise.all(promises).then((urls) => setter(urls)));
};

export const getDatabaseData = <T>(path: string, setter: (data: T[]) => void) => {
  get(dbRef(DB, path)).then((snap) => {
    if (snap.exists()) {
      const data = snap.val() as Record<string, T>;
      setter(Object.values(data));
    }
  });
};
