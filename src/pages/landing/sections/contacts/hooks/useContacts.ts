import { useContext } from 'react';
import { Context } from '@src/context';

import { ContactsType } from '@src/types';

const notSocials = ['tels', 'email'];

export const useContacts = () => {
  const { isMobile, staticContent } = useContext(Context);
  const { contacts } = staticContent;

  const contactsMap = Object.entries(contacts);

  return {
    isMobile,
    socialsMap: contactsMap.filter((c) => !notSocials.includes(c[0])) as unknown as [
      k: Exclude<ContactsType, 'tels' | 'email'>,
      v: string,
    ][],
    parsedContacts: contactsMap.filter((c) => notSocials.includes(c[0])) as unknown as [
      k: Extract<ContactsType, 'tels' | 'email'>,
      v: string,
    ][],
  };
};
