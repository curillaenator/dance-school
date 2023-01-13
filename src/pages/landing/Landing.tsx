import React, { FC } from 'react';

import Dialog from '@mui/material/Dialog';

import { Main } from '@src/components/main';
import { Coaches } from '@src/components/coaches';
import { Prices } from '@src/components/prices';
import { Aboutus } from '@src/components/aboutus';
import { Contacts } from '@src/components/contacts';

import { Application } from './components';

import { useModalControl } from '@src/hooks/useModalControl';

const MAX_WIDTH = '1280px';

export const Landing: FC = () => {
  const { open, handleClose, handleOpen } = useModalControl();

  return (
    <>
      <Main name='main' handleOpen={handleOpen} maxWidth={MAX_WIDTH} />
      <Aboutus name='aboutus' maxWidth={MAX_WIDTH} />
      <Coaches name='coaches' maxWidth={MAX_WIDTH} />
      <Prices name='prices' handleOpen={handleOpen} maxWidth={MAX_WIDTH} />
      <Contacts name='contacts' maxWidth={MAX_WIDTH} />

      <Dialog onClose={handleClose} open={open}>
        <Application handleClose={handleClose} />
      </Dialog>
    </>
  );
};
