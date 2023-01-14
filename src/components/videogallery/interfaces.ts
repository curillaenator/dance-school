import { ChangeEvent } from 'react';
import { StoragePathsType, VideoType } from '@src/types';

export interface VideoPreviewProps extends VideoType {
  handleOpen?: () => void;
  editable?: boolean;
  handleRemove?: (url: string, storagePath: StoragePathsType) => void;
  handleUpload?: (a: ChangeEvent<HTMLInputElement>, storagePath: StoragePathsType, url?: string) => void;
}

export interface VideoGalleryProps {
  videos: VideoType[];
  isMobile: boolean;
  maxWidth?: string;
  handleOpen?: () => void;
  editable?: boolean;
  handleRemove?: (url: string, storagePath: StoragePathsType) => void;
  handleUpload?: (a: ChangeEvent<HTMLInputElement>, storagePath: StoragePathsType, url?: string) => void;
}
