import React, { FC } from 'react';

import Dialog from '@mui/material/Dialog';
import { ApplicationForm } from '@src/components/applicationform';

import { Main } from './sections/main';
import { Coaches } from './sections/coaches';
import { Prices } from './sections/prices';
import { Aboutus } from './sections/aboutus';
import { Programs } from './sections/programs';
import { Photogallery } from './sections/photogallery';
import { Contacts } from './sections/contacts';

import { useModalControl } from '@src/hooks/useModalControl';

const MAX_WIDTH = '1280px';

export const Landing: FC = () => {
  const { open, handleClose, handleOpen } = useModalControl();

  return (
    <>
      <Main name='main' handleOpen={handleOpen} maxWidth={MAX_WIDTH} />
      <Aboutus name='aboutus' handleOpen={handleOpen} maxWidth={MAX_WIDTH} />
      <Programs name='programs' handleOpen={handleOpen} maxWidth={MAX_WIDTH} />
      <Photogallery name='photogallery' maxWidth={MAX_WIDTH} />
      <Coaches name='coaches' maxWidth={MAX_WIDTH} />
      <Prices name='prices' handleOpen={handleOpen} maxWidth={MAX_WIDTH} />
      <Contacts name='contacts' maxWidth={MAX_WIDTH} />

      <Dialog onClose={handleClose} open={open}>
        <ApplicationForm handleClose={handleClose} />
      </Dialog>
    </>
  );
};
