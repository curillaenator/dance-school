/* eslint-disable no-console */
import { useCallback, useContext, useState, useEffect, ChangeEvent } from 'react';
import { scroller } from 'react-scroll';
import { useSnackbar } from 'notistack';

import { ref, set, push, child, update } from 'firebase/database';
import { ref as refST, uploadBytes, uploadBytesResumable, deleteObject, getDownloadURL } from 'firebase/storage';
import { DB, ST } from '@src/config';

import { debouncedWriteDB, inputToHtml, resizeFile } from '@src/utils';

import { Context } from '@src/context';

import { SCROLL_SPEED } from '@src/shared/constants';
import { VideoType, StaticSectionType } from '@src/types';

interface EditableVideoData {
  thumbPath: File | string | null;
  videoPath: File | string | null;
}

interface NewVideoType extends Omit<VideoType, 'thumbPath' | 'videoPath'>, EditableVideoData {}

const INITIAL_VIDEO: NewVideoType = {
  id: '',
  title: '',
  description: '',
  thumbPath: null,
  videoPath: null,
};

const INITIAL_PREV_VIDEO_DATA = { thumbPath: '', videoPath: '' };

export const useVideosControl = () => {
  const { videos, setLoading, staticContent, updateStaticContent } = useContext(Context);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const [videoForm, setVideoForm] = useState<NewVideoType>(INITIAL_VIDEO);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [prevVideoData, setPrevVideoData] = useState<EditableVideoData>(INITIAL_PREV_VIDEO_DATA);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    const resolveCoverImage = async () => {
      const { id, thumbPath } = videoForm;

      if (!thumbPath) {
        setCoverPreview(null);
        return;
      }

      if (typeof thumbPath === 'string') {
        const coverURL = await getDownloadURL(refST(ST, `videos/${id}/${thumbPath}`));
        setCoverPreview(coverURL);
        return;
      }

      setCoverPreview(URL.createObjectURL(videoForm.thumbPath as File));
    };

    resolveCoverImage();
  }, [videoForm]);

  const handleVideosStatic = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: keyof StaticSectionType) => {
      updateStaticContent('programs', { [key]: inputToHtml(e.target.value) } as Partial<StaticSectionType>);

      if (!e.target.value) return;

      setLoading(true);

      debouncedWriteDB({
        path: `static/programs/${key}`,
        value: inputToHtml(e.target.value),
        onWriteEnd: () => setLoading(false),
      });
    },
    [setLoading, updateStaticContent],
  );

  const handleNewVideo = useCallback((e: ChangeEvent<HTMLInputElement>, key: keyof NewVideoType) => {
    if ((key === 'thumbPath' || key === 'videoPath') && e.target.files !== null) {
      const files = e.target.files;
      setVideoForm((prev) => ({ ...prev, [key]: files[0] }));
      return;
    }

    setVideoForm((prev) => ({ ...prev, [key]: e.target.value }));
  }, []);

  const editVideo = useCallback((video: VideoType) => {
    setIsEdit(true);
    setPrevVideoData({ thumbPath: video.thumbPath, videoPath: video.videoPath });
    setVideoForm({
      ...video,
      description: JSON.parse(video.description.replace(/<br \/>/g, '\\n')),
    });

    scroller.scrollTo('video-edit-form', {
      duration: SCROLL_SPEED,
      smooth: true,
    });
  }, []);

  const cancelEdit = useCallback(() => {
    setPrevVideoData(INITIAL_PREV_VIDEO_DATA);
    setIsEdit(false);
    setVideoForm(INITIAL_VIDEO);
  }, []);

  const removeVideo = useCallback(
    async (video: VideoType) => {
      const { id, title, thumbPath, videoPath } = video;

      setLoading(true);

      try {
        await deleteObject(refST(ST, `videos/${id}/${thumbPath}`));
        await deleteObject(refST(ST, `videos/${id}/${videoPath}`));
        await update(ref(DB), { [`videos/${id}`]: null });

        enqueueSnackbar(`Запись с видео ${title} удалена`, { variant: 'warning' });
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    },
    [setLoading, enqueueSnackbar],
  );

  const addVideo = useCallback(async () => {
    if (!videoForm.thumbPath) return;
    if (!videoForm.videoPath) return;

    setLoading(true);

    const thumb = videoForm.thumbPath as File;
    const video = videoForm.videoPath as File;
    const newVideoId = push(child(ref(DB), 'videos')).key as string;

    const data = {
      ...videoForm,
      id: newVideoId,
      description: JSON.stringify(videoForm.description)?.replace(/\\n/g, '<br />'),
      thumbPath: thumb.name,
      videoPath: video.name,
    };

    // Storage
    const resized = await resizeFile(thumb);
    await uploadBytes(refST(ST, `videos/${newVideoId}/${thumb.name}`), resized, {
      cacheControl: 'public,max-age=7200',
      contentType: 'image/jpeg',
    });

    setUploadProgress(0);

    const uploadTask = uploadBytesResumable(refST(ST, `videos/${newVideoId}/${video.name}`), video);

    uploadTask.on(
      'state_changed',
      (snap) => {
        const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
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

        enqueueSnackbar(`Запись с видео ${videoForm.title} добавлена`, { variant: 'success' });
        setVideoForm(INITIAL_VIDEO);
      },
    );
  }, [videoForm, setLoading, enqueueSnackbar]);

  const updateVideo = useCallback(() => {
    setLoading(true);

    const data: Partial<NewVideoType> = {
      id: videoForm.id,
      title: videoForm.title,
      description: JSON.stringify(videoForm.description)?.replace(/\\n/g, '<br />'),
      ...prevVideoData,
    };

    const thumbProcess = async () => {
      if (prevVideoData.thumbPath !== videoForm.thumbPath) {
        const thumb = videoForm.thumbPath as File;
        data.thumbPath = thumb.name;

        const resized = await resizeFile(thumb);

        await uploadBytes(refST(ST, `videos/${data.id}/${thumb.name}`), resized, {
          cacheControl: 'public,max-age=7200',
          contentType: 'image/jpeg',
        });
        await deleteObject(refST(ST, `videos/${data.id}/${prevVideoData.thumbPath}`));
        return 'done';
      } else {
        return 'thumb unchanged';
      }
    };

    const videoProcess = new Promise((resolve: (value: string) => void) => {
      if (prevVideoData.videoPath !== videoForm.videoPath) {
        const video = videoForm.videoPath as File;

        data.videoPath = video.name;

        setUploadProgress(0);

        const uploadTask = uploadBytesResumable(refST(ST, `videos/${data.id}/${video.name}`), video);

        uploadTask.on(
          'state_changed',
          (snap) => {
            const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
            setUploadProgress(Math.floor(progress));
          },
          (err) => {
            console.log(err);
          },
          async () => {
            await deleteObject(refST(ST, `videos/${data.id}/${prevVideoData.videoPath}`));

            setUploadProgress(null);
            resolve('done');
          },
        );
      } else {
        resolve('video unchanged');
      }
    });

    Promise.all([thumbProcess(), videoProcess])
      .then(() => {
        update(ref(DB), { [`videos/${data.id}`]: data });
      })
      .then(() => {
        enqueueSnackbar(`Запись с видео ${videoForm.title} обновлена`, { variant: 'success' });

        setLoading(false);
        setIsEdit(false);
        setVideoForm(INITIAL_VIDEO);
        setPrevVideoData(INITIAL_PREV_VIDEO_DATA);
      });
  }, [setLoading, prevVideoData, videoForm, enqueueSnackbar]);

  return {
    videosStatic: staticContent.programs,
    videos,
    newVideo: videoForm,
    isVideoReadyToUpload:
      !!videoForm.title && !!videoForm.description && !!videoForm.thumbPath && !!videoForm.videoPath,
    uploadProgress,
    isEdit,
    coverPreview,
    handleVideosStatic,
    handleNewVideo,
    addVideo,
    removeVideo,
    editVideo,
    updateVideo,
    cancelEdit,
  };
};
