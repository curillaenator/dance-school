import { useCallback, useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = useCallback((load: boolean) => setLoading(load), []);

  return {
    loading,
    setLoading: handleLoading,
  };
};
