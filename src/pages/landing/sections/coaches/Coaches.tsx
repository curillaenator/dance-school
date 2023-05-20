import React, { FC, useContext, useCallback, useRef } from 'react';
import { Element } from 'react-scroll';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Dialog from '@mui/material/Dialog';

import { Coach } from '@src/components/coach';
import { PopupGallery } from '@src/components/popupgallery';

import { useModalControl } from '@src/hooks/useModalControl';

import { Context } from '@src/context';
import { jsonToHtml } from '@src/utils';
import { LandingSectionCommonProps, CoachType } from '@src/types';

interface CoachesProps extends LandingSectionCommonProps {
  handleOpen: () => void;
}

export const Coaches: FC<CoachesProps> = (props) => {
  const { name, maxWidth, handleOpen } = props;

  const { isMobile, coaches, staticContent, setDesiredCoach } = useContext(Context);

  const handleOpenApplicationFormWithComment = useCallback(
    (desiredCoach: CoachType) => {
      setDesiredCoach(desiredCoach);
      handleOpen();
    },
    [setDesiredCoach, handleOpen],
  );

  const { open: photoOpen, handleClose: handlePhotoClose, handleOpen: handlePhotoOpen } = useModalControl();

  const coachPhotoRef = useRef<string | null>(null);

  const openCoachPhoto = useCallback(
    (coachPhotoUrl: string | null) => {
      coachPhotoRef.current = coachPhotoUrl;
      handlePhotoOpen();
    },
    [handlePhotoOpen],
  );

  return (
    <>
      <Element name={name}>
        <Box width='100%' paddingY={16} bgcolor={(theme) => theme.palette.primary.main}>
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            align='center'
            color={(theme) => theme.palette.background.default}
            px={4}
            mb={4}
            mx='auto'
            fontWeight={500}
            maxWidth={maxWidth}
            zIndex={0}
          >
            {jsonToHtml(staticContent.coaches.title)}
          </Typography>

          <Typography
            variant='subtitle1'
            align='center'
            color={(theme) => theme.palette.background.default}
            px={4}
            mb={16}
            mx='auto'
            zIndex={0}
            maxWidth={maxWidth}
          >
            {jsonToHtml(staticContent.coaches.subtitle || '')}
          </Typography>

          <Grid container spacing={8} marginX='auto' maxWidth={maxWidth}>
            {coaches.map((coach) => (
              <Coach
                key={coach.id}
                isMobile={isMobile}
                {...coach}
                handleOpen={handleOpenApplicationFormWithComment}
                coachAvatarOnClick={openCoachPhoto}
              />
            ))}
          </Grid>
        </Box>
      </Element>

      <Dialog onClose={handlePhotoClose} open={photoOpen} fullWidth maxWidth='lg'>
        <PopupGallery photos={[String(coachPhotoRef.current)]} handleClose={handlePhotoClose} />
      </Dialog>
    </>
  );
};
