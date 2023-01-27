import React, { FC, useContext, useCallback } from 'react';

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

import { Context } from '@src/context';

const MAX_WIDTH = '1280px';

export const Landing: FC = () => {
  const { open, handleClose, handleOpen } = useModalControl();
  const { setDesiredCoach } = useContext(Context);

  const handleApplicationFormClose = useCallback(() => {
    setDesiredCoach(null);
    handleClose();
  }, [handleClose, setDesiredCoach]);

  return (
    <>
      <Main name='main' handleOpen={handleOpen} maxWidth={MAX_WIDTH} />
      <Aboutus name='aboutus' handleOpen={handleOpen} maxWidth={MAX_WIDTH} />
      <Programs name='programs' handleOpen={handleOpen} maxWidth={MAX_WIDTH} />
      <Photogallery name='photogallery' maxWidth={MAX_WIDTH} />
      <Coaches name='coaches' handleOpen={handleOpen} maxWidth={MAX_WIDTH} />
      <Prices name='prices' handleOpen={handleOpen} maxWidth={MAX_WIDTH} />
      <Contacts name='contacts' maxWidth={MAX_WIDTH} />

      <Dialog onClose={handleApplicationFormClose} open={open}>
        <ApplicationForm handleClose={handleApplicationFormClose} />
      </Dialog>
    </>
  );
};
