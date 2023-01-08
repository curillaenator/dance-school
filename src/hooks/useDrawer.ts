import { useState, useCallback } from 'react';

export const useDrawer = () => {
  const [drawer, setDrawer] = useState(false);

  const openDrawer = useCallback(() => {
    setDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawer(false);
  }, []);

  return {
    drawer,
    openDrawer,
    closeDrawer,
  };
};
