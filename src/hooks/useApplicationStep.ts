import { useCallback, useState } from 'react';

import { ApplicationStepType } from '@src/types';

export const useApplicationStep = () => {
  const [applicationFormStep, setApplicationFormStep] = useState<ApplicationStepType>('new');
  const handleApplicationFormStep = useCallback((step: ApplicationStepType) => setApplicationFormStep(step), []);

  return {
    applicationFormStep,
    setApplicationFormStep: handleApplicationFormStep,
  };
};
