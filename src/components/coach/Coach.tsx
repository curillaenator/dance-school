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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        )}

        <Avatar
          src={photo ? photo : undefined}
          sx={{
            width: isMobile ? 236 : 256,
            height: isMobile ? 236 : 256,
            marginBottom: 2,
          }}
        />

        <Typography
          variant='h4'
          fontSize={24}
          fontWeight={500}
          color={(theme) => theme.palette.background.default}
          mb={1}
        >
          {jsonToHtml(name)}
        </Typography>

        <Typography variant='subtitle2' color={(theme) => theme.palette.background.default} mb={isEditable ? 0 : 2}>
          {jsonToHtml(description)}
        </Typography>

        {!isEditable && (
          <Box display='flex' justifyContent='center'>
            <Button
              startIcon={<ThumbUpIcon />}
              variant='text'
              color='error'
              size='medium'
              onClick={() => handleOpen({ id, name, description, photoURL })}
              sx={{ margin: '0 auto 12px' }}
            >
              Хочу к тренеру
            </Button>
          </Box>
        )}
      </Card>
    </Grid>
  );
};
