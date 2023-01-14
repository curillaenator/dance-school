import { ChangeEvent } from 'react';
import { StoragePathsType } from '@src/types';

// export interface GalleryType {
//   id: string;
//   img: string;
//   title: string;
//   rows: number;
//   cols: number;
// }

export interface GalleryProps {
  previews: string[];
  isMobile: boolean;
  maxWidth?: string;
  handleOpen?: () => void;
  editable?: boolean;
  handleRemove?: (url: string, storagePath: StoragePathsType) => void;
  handleUpload?: (a: ChangeEvent<HTMLInputElement>, storagePath: StoragePathsType, url?: string) => void;
}
