import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, off, update } from 'firebase/database';
import { DB } from '@src/config';

import { ApplicationType } from '@src/types';

export const useData = () => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);

  const applicationsRef = ref(DB, 'applications');

  useEffect(() => {
    onValue(applicationsRef, (snap) => {
      const data = snap.val();
      setApplications(Object.values(data).reverse() as ApplicationType[]);
      // console.log(Object.values(data));
    });

    return () => off(applicationsRef);
  }, []);

  const updateCalled = useCallback((application: ApplicationType) => {
    const { id, called } = application;
    update(applicationsRef, { [`${id}/called`]: !called });
  }, []);

  const remove = useCallback((application: ApplicationType) => {
    const { id } = application;
    update(applicationsRef, { [id]: null });
  }, []);

  return {
    applications,
    updateCalled,
    remove,
  };
};
