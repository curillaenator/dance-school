import React, { FC, useEffect, useState } from 'react';
import { ref as stRef, getDownloadURL } from 'firebase/storage';
import { ST } from '@src/config';

import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

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

export const Coach: FC<CoachType> = (props) => {
  const { name, description, photoURL } = props;

  const [photo, setPhoto] = useState<string | null>(null);
  useEffect(() => {
    getDownloadURL(stRef(ST, `coaches/${photoURL}`)).then((url) => setPhoto(url));
  }, [photoURL]);

  return (
    <Grid xs={12} md={6} lg={4}>
      <Card>
        <Avatar
          src={photo ? photo : undefined}
          sx={{
            width: 236,
            height: 236,
            marginBottom: 2,
          }}
        />

        <Typography variant="h6" fontWeight={500} color={(theme) => theme.palette.background.default} mb={1}>
          {name}
        </Typography>

        <Typography variant="subtitle2" color={(theme) => theme.palette.background.default}>
          {description}
        </Typography>
      </Card>
    </Grid>
  );
};
