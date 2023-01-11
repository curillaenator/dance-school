import Resizer from 'react-image-file-resizer';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { ST } from '@src/config';

export const resizeFile = (file: File): Promise<File> => {
  return new Promise((resolve) =>
    Resizer.imageFileResizer(file, 1440, 1440, 'JPEG', 85, 0, (resized) => resolve(resized as File), 'file'),
  );
};

export const refetchSlides = (path: string, setter: (urls: string[]) => void) => {
  listAll(ref(ST, path))
    .then((res) => res.items.map((item) => getDownloadURL(item)))
    .then((promises) => Promise.all(promises).then((urls) => setter(urls)));
};
