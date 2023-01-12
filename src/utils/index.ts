import Resizer from 'react-image-file-resizer';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { ST } from '@src/config';

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

export const debounced = <T>(cb: (...args: T[]) => void, delay = 2000) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: T[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
