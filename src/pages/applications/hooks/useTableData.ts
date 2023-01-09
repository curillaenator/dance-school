import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, off, update } from 'firebase/database';
import { DB } from '@src/config';

import { ApplicationType } from '@src/types';

export const useTableData = () => {
  const [applications, setApplications] = useState<Record<string, ApplicationType>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(-1);

  const applicationsRef = ref(DB, 'applications');

  useEffect(() => {
    onValue(applicationsRef, (snap) => {
      const data = snap.val();
      setApplications(data);
    });

    return () => off(applicationsRef);
  }, [applicationsRef]);

  const updateCalled = useCallback(
    (application: ApplicationType) => {
      const { id, called } = application;
      update(applicationsRef, { [`${id}/called`]: !called });
    },
    [applicationsRef],
  );

  const remove = useCallback(
    (id: string) => {
      if (confirm('Точно удалить?')) {
        update(applicationsRef, { [id]: null });

        if (!!selected) {
          setSelected(null);
        }
      }
    },
    [selected, applicationsRef],
  );

  const selectApplication = useCallback((id: string | null) => {
    setSelected(id);
  }, []);

  // pagination handlers

  const handleChangePage = useCallback((event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return {
    applications,
    rowsPerPage,
    selected,
    page,
    updateCalled,
    remove,
    handleChangePage,
    handleChangeRowsPerPage,
    selectApplication,
  };
};
