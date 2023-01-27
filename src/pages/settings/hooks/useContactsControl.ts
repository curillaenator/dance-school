import { useContext, useCallback, ChangeEvent } from 'react';

import { Context } from '@src/context';
import { debouncedWriteDB } from '@src/utils';
import { StaticContactsSectionType, ContactsType } from '@src/types';

export const useContactsControl = () => {
  const { staticContent, updateStaticContent, setLoading } = useContext(Context);

  const handleContactsStatic = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: ContactsType) => {
      updateStaticContent('contacts', { [key]: e.target.value });

      if (!e.target.value) return;

      setLoading(true);

      debouncedWriteDB({
        path: `static/contacts/${key}`,
        value: e.target.value,
        onWriteEnd: () => setLoading(false),
      });
    },
    [setLoading, updateStaticContent],
  );

  return {
    staticContacts: staticContent.contacts as unknown as StaticContactsSectionType,
    handleContactsStatic,
  };
};
