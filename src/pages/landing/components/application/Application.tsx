/* eslint-disable no-console */

import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import CheckIcon from '@mui/icons-material/Check';

import { MaskedTelephone } from './MaskedTelephone';

import { useApplication } from './hooks/useApplication';

import { labels } from './constants';
import { ApplicationProps } from './interfaces';

export const Application: FC<ApplicationProps> = (props) => {
  const { name, tel, comment, errors, step, handleName, handleTel, handleComment, submit, cancel, handleClose } =
    useApplication(props);

  return (
    <Box
      sx={{
        maxWidth: 640,
        padding: 2,
      }}
    >
      {step === 'success' && (
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Typography variant="h3" align="left" sx={{ color: 'white' }} fontWeight={500} mb={4}>
            {labels.titleSuccess}
          </Typography>

          <Typography variant="subtitle1" align="left" sx={{ color: 'white' }} mb={4}>
            {labels.subtitleSuccess}
          </Typography>

          <Button
            variant="contained"
            color="success"
            onClick={handleClose}
            fullWidth
            startIcon={<CheckIcon />}
            sx={{
              height: 64,
            }}
          >
            Готово
          </Button>
        </Box>
      )}

      {step === 'loading' && <CircularProgress color="inherit" />}

      {step === 'new' && (
        <>
          <Typography variant="h5" align="left" sx={{ color: 'white' }} fontWeight={500} mb={4}>
            {labels.title}
          </Typography>

          <FormControl variant="outlined" fullWidth>
            <TextField
              id="applicant-name"
              label={errors.name ? labels.nameError : labels.name}
              sx={{ marginBottom: 2 }}
              autoFocus
              value={name}
              onChange={handleName}
              autoComplete="off"
              error={errors.name}
              required
            />

            <TextField
              id="telephone"
              label={errors.tel ? labels.telError : labels.tel}
              sx={{ marginBottom: 2 }}
              value={tel}
              onChange={handleTel}
              autoComplete="off"
              error={errors.tel}
              required
              InputProps={{
                // @ts-expect-error description
                inputComponent: MaskedTelephone,
              }}
            />

            <TextField
              id="comment"
              label={labels.comment}
              sx={{ marginBottom: 4 }}
              value={comment}
              autoComplete="off"
              onChange={handleComment}
              multiline
              minRows={2}
              maxRows={4}
            />
          </FormControl>

          <ButtonGroup sx={{ marginBottom: 2, height: '56px' }} fullWidth>
            <Button variant="contained" onClick={submit}>
              Отправить
            </Button>

            <Button variant="outlined" onClick={cancel}>
              Отмена
            </Button>
          </ButtonGroup>

          <Typography variant="subtitle2" align="left" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            {labels.subtitle}
          </Typography>
        </>
      )}
    </Box>
  );
};
