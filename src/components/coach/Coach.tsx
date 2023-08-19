import React, { FC, useEffect, useState } from 'react';
import { ref as stRef, getDownloadURL } from 'firebase/storage';
import { ST } from '@src/config';

import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import AnnouncementRoundedIcon from '@mui/icons-material/AnnouncementRounded';

import { styled } from '@mui/material/styles';

import { jsonToHtml } from '@src/utils';
import { CoachType } from '@src/types';

const Card = styled(Paper)({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  boxShadow: 'none',
});

interface CoachInterface extends CoachType {
  isMobile: boolean;
  isEditable?: boolean;
  onUpdate?: (coach: CoachType) => void;
  onDelete?: (coach: CoachType) => void;
  handleOpen?: (coach: CoachType) => void;
  coachAvatarOnClick?: (coachPhotoUrl: string | null) => void;
}

export const Coach: FC<CoachInterface> = (props) => {
  const {
    id,
    name,
    description,
    photoURL,
    isEditable,
    isMobile,

    onUpdate = () => {},
    onDelete = () => {},
    handleOpen = () => {},
    coachAvatarOnClick = () => {},
  } = props;

  const [photo, setPhoto] = useState<string | null>(null);
  useEffect(() => {
    getDownloadURL(stRef(ST, `coaches/${photoURL}`)).then((url) => setPhoto(url));
  }, [photoURL]);

  return (
    <Grid xs={12} md={6} lg={6}>
      <Card
        sx={{
          position: 'relative',
        }}
      >
        {isEditable && (
          <>
            <IconButton
              color='error'
              onClick={() => onDelete({ id, name, description, photoURL })}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 10,
              }}
            >
              <DeleteRoundedIcon />
            </IconButton>

            <IconButton
              color='error'
              onClick={() => onUpdate({ id, name, description, photoURL })}
              sx={{
                position: 'absolute',
                top: 0,
                right: '48px',
                zIndex: 10,
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        )}

        {isEditable ? (
          <Avatar
            src={photo ? photo : undefined}
            sx={{
              width: isMobile ? 236 : 256,
              height: isMobile ? 236 : 256,
              marginBottom: 2,
            }}
          />
        ) : (
          <IconButton onClick={() => coachAvatarOnClick(photo)} sx={{ marginBottom: 4 }}>
            <Avatar
              variant='circular'
              src={photo ? photo : undefined}
              sx={{
                width: isMobile ? 236 : 256,
                height: isMobile ? 236 : 256,
              }}
            />
          </IconButton>
        )}

        <Typography
          variant='h4'
          fontSize={isMobile ? 20 : 24}
          fontWeight={isMobile ? 600 : 500}
          color={(theme) => theme.palette.background.default}
          mb={2}
        >
          {jsonToHtml(name)}
        </Typography>

        <Typography variant='subtitle1' color={(theme) => theme.palette.secondary.main} mb={isEditable ? 0 : 2}>
          {jsonToHtml(description)}
        </Typography>

        {!isEditable && (
          <Box display='flex' justifyContent='center'>
            <Button
              startIcon={<AnnouncementRoundedIcon />}
              variant='text'
              // color='error'
              size='medium'
              onClick={() => handleOpen({ id, name, description, photoURL })}
              sx={{
                margin: '0 auto 12px',
                borderRadius: '8px',
              }}
            >
              Хочу к тренеру
            </Button>
          </Box>
        )}
      </Card>
    </Grid>
  );
};
