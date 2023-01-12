import { useCallback, useContext, ChangeEvent } from 'react';

import { ref, push, child, update } from 'firebase/database';
import { DB } from '@src/config';

import { Context } from '@src/context';
import { debouncedStaticWrite } from '@src/utils';

import { StaticSectionType } from '@src/types';

export const useAboutusControl = () => {
  const { staticContent, setLoading, updateStaticContent } = useContext(Context);

  const handleAboutusStatic = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: keyof StaticSectionType, id?: string) => {
      const isAdditions = key === 'subtitles' && !!id;

      if (isAdditions) {
        updateStaticContent('aboutus', { [key]: { ...staticContent.aboutus.subtitles, [id]: e.target.value } });
      } else {
        updateStaticContent('aboutus', { [key]: e.target.value } as Partial<StaticSectionType>);
      }

      if (!e.target.value) return;

      setLoading(true);
      debouncedStaticWrite({
        path: isAdditions ? `static/aboutus/${key}/${id}` : `static/aboutus/${key}`,
        value: e.target.value,
        setLoading,
      });
    },
    [staticContent.aboutus.subtitles, setLoading, updateStaticContent],
  );

  const addSubtitle = useCallback(() => {
    const { subtitles } = staticContent.aboutus;
    const newSubtitleId = push(child(ref(DB), 'static/aboutus/subtitles')).key as string;

    const prevSubtitles = subtitles ? subtitles : {};

    updateStaticContent('aboutus', {
      subtitles: { ...prevSubtitles, [newSubtitleId]: '' },
    } as Partial<StaticSectionType>);
  }, [staticContent.aboutus, updateStaticContent]);

  const removeSubtitle = useCallback(
    async (id: string) => {
      setLoading(true);
      await update(ref(DB, 'static/aboutus/subtitles'), { [id]: null });

      const subtitles = { ...staticContent.aboutus.subtitles };
      delete subtitles[id];

      updateStaticContent('aboutus', { subtitles });
      setLoading(false);
    },
    [staticContent.aboutus, updateStaticContent],
  );

  return {
    aboutusStatic: staticContent.aboutus,
    handleAboutusStatic,
    addSubtitle,
    removeSubtitle,
  };
};
