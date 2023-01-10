import React, { FC } from 'react';

import Dialog from '@mui/material/Dialog';

import { Main } from '@src/components/main';
import { Coaches } from '@src/components/coaches';
import { Prices } from '@src/components/prices';
import { Aboutus } from '@src/components/aboutus';
import { Contacts } from '@src/components/contacts';

import { Application } from './components';

import { useModalControl } from '@src/hooks/useModalControl';

export const Landing: FC = () => {
  const { open, handleClose, handleOpen } = useModalControl();

  return (
    <>
      <Main name="main" handleOpen={handleOpen} />
      <Coaches name="coaches" />
      <Aboutus name="aboutus" />
      <Prices name="prices" handleOpen={handleOpen} />
      <Contacts name="contacts" />

      <Dialog onClose={handleClose} open={open}>
        <Application handleClose={handleClose} />
      </Dialog>
    </>
  );
};
