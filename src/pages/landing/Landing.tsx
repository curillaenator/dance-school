import React, { FC } from 'react';

import { Main } from '@src/components/main';
import { Coaches } from '@src/components/coaches';

export const Landing: FC = () => {
  return (
    <>
      <Main name="main" />
      <Coaches name="coaches" />
    </>
  );
};
