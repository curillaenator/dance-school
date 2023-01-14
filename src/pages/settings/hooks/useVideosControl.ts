import { useCallback, useContext, useState, ChangeEvent } from 'react';

import { ref, set, push, child } from 'firebase/database';
import { ref as refST, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { DB, ST } from '@src/config';

import { resizeFile } from '@src/utils';

import { Context } from '@src/context';

import { VideoType } from '@src/types';

interface NewVideoType extends Omit<VideoType, 'thumbPath' | 'videoPath'> {
  thumbPath: File | null;
  videoPath: File | null;
}

const INITIAL_VIDEO: NewVideoType = {
  id: '',
  title: '',
  thumbPath: null,
  videoPath: null,
};

export const useVideosControl = () => {
  const { videos, setLoading } = useContext(Context);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [newVideo, setNewVideo] = useState<NewVideoType>(INITIAL_VIDEO);

  const handleNewVideo = useCallback((e: ChangeEvent<HTMLInputElement>, key: keyof NewVideoType) => {
    if ((key === 'thumbPath' || key === 'videoPath') && e.target.files !== null) {
      const files = e.target.files;
      setNewVideo((prev) => ({ ...prev, [key]: files[0] }));
      return;
    }

    setNewVideo((prev) => ({ ...prev, [key]: e.target.value }));
  }, []);

  const addVideo = useCallback(async () => {
    if (!newVideo.thumbPath) return;
    if (!newVideo.videoPath) return;

    setLoading(true);

    const thumb = newVideo.thumbPath;
    const video = newVideo.videoPath;
    const newVideoId = push(child(ref(DB), 'videos')).key as string;

    const data = {
      ...newVideo,
      id: newVideoId,
      thumbPath: thumb.name,
      videoPath: video.name,
    };

    // Storage
    const resized = await resizeFile(thumb);
    await uploadBytes(refST(ST, `videos/${newVideoId}/${thumb.name}`), resized);

    setUploadProgress(0);

    const uploadTask = uploadBytesResumable(refST(ST, `videos/${newVideoId}/${video.name}`), video);

    uploadTask.on(
      'state_changed',
      (snap) => {
        const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        console.log(progress);
        setUploadProgress(Math.floor(progress));
      },
      (err) => {
        console.log(err);
      },
      async () => {
        // Database
        await set(ref(DB, `videos/${newVideoId}`), data);

        setUploadProgress(null);
        setLoading(false);
        setNewVideo(INITIAL_VIDEO);
      },
    );
  }, [newVideo, setLoading]);

  return {
    videos,
    newVideo,
    isVideoReadyToUpload: !!newVideo.title && !!newVideo.thumbPath && !!newVideo.videoPath,
    uploadProgress,
    handleNewVideo,
    addVideo,
  };
};
