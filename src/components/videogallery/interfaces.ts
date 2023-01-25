import { VideoType } from '@src/types';

export interface VideoPreviewProps extends VideoType {
  handleOpen?: () => void;
  isMobile?: boolean;
  editable?: boolean;
  handleRemove?: (video: VideoType) => void;
  handleEdit?: (video: VideoType) => void;
  isEven?: boolean;
}

export interface VideoGalleryProps {
  videos: VideoType[];
  isMobile: boolean;
  maxWidth?: string;
  handleOpen?: (video: VideoType) => void;
  editable?: boolean;
  handleRemove?: (video: VideoType) => void;
  handleEdit?: (video: VideoType) => void;
}
