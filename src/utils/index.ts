import Resizer from 'react-image-file-resizer';
import { ref as refST, getDownloadURL, listAll } from 'firebase/storage';
import { ref as refDB, set } from 'firebase/database';
import { ST, DB } from '@src/config';

import { StoragePathsType } from '@src/types';

// process utils

export const resizeFile = (file: File, toSize = 1440): Promise<File> => {
  return new Promise((resolve) =>
    Resizer.imageFileResizer(file, toSize, toSize, 'JPEG', 85, 0, (resized) => resolve(resized as File), 'file'),
  );
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

// firebase api utils

export const findStoragePathFromUrl = (url: string, path: StoragePathsType) => {
  const matchers = {
    mainSlider: url.match(/mainSlider%2F.*\?alt*/),
    gallery: url.match(/gallery%2F.*\?alt*/),
  };

  // @ts-expect-error because
  const fullPath = matchers[path] ? matchers[path][0] : null;

  if (!!fullPath) return fullPath.replace(`${path}%2F`, '').replace('?alt', '');
};

export const refetchStorage = (path: string, setter: (urls: string[]) => void) => {
  listAll(refST(ST, path))
    .then((res) => res.items.map((item) => getDownloadURL(item)))
    .then((promises) => Promise.all(promises).then((urls) => setter(urls)));
};

interface StaticWriteOptionsType {
  path: string;
  value: string;
  onWriteEnd?: () => void;
}

export const debouncedWriteDB = debounced((opts: StaticWriteOptionsType) => {
  const { path, value, onWriteEnd = () => {} } = opts;
  set(refDB(DB, path), value).then(() => onWriteEnd());
});
