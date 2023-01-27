import { useCallback, useContext, ChangeEvent } from 'react';

import { Context } from '@src/context';
import { debouncedWriteDB, inputToHtml } from '@src/utils';

import { StaticSectionType } from '@src/types';

export const useAboutusControl = () => {
  const { staticContent, setLoading, updateStaticContent } = useContext(Context);

  const handleAboutusStatic = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: keyof StaticSectionType) => {
      updateStaticContent('aboutus', { [key]: inputToHtml(e.target.value) } as Partial<StaticSectionType>);

      if (!e.target.value) return;

      setLoading(true);

      debouncedWriteDB({
        path: `static/aboutus/${key}`,
        value: inputToHtml(e.target.value),
        onWriteEnd: () => setLoading(false),
      });
    },
    [setLoading, updateStaticContent],
  );

  return {
    aboutusStatic: staticContent.aboutus,
    handleAboutusStatic,
  };
};
