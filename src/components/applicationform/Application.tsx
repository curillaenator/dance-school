/* eslint-disable no-console */

import React, { ChangeEvent, FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

// import CheckIcon from '@mui/icons-material/Check';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';

import { ReviewForm } from './ReviewForm';
import { SuccessForm } from './SuccessForm';

import { MaskedTelephone } from './MaskedTelephone';

import { useApplication } from './hooks/useApplication';

import { labels, ERROR_MESSAGES_ASSOC } from './constants';
import { ApplicationProps } from './interfaces';

export const Application: FC<ApplicationProps> = (props) => {
  const {
    step,
    formState,
    successContent,
    signIn,
    handleApplicationForm,
    submit,
    cancel,
    handleClose,
    handleLoginForm,
    handleEmailLogin,
    handleEmailSignUp,
    handleIsNewUser,
    handleReviewForm,
    handleReviewApply,
  } = useApplication(props);

  return (
    <Box
      sx={{
        maxWidth: 640,
        padding: 2,
      }}
    >
      {step === 'login' && (
        <Box width='100%' display='flex' flexDirection='column' alignItems='center' gap={2}>
          <FormControl variant='outlined' fullWidth>
            <FormControlLabel
              control={<Switch checked={formState.isNewUser === 'yep'} onChange={handleIsNewUser} />}
              label='Зарегаться'
              sx={{ mb: 2 }}
            />

            <TextField
              id='login'
              label='Логин'
              type='email'
              sx={{ marginBottom: 2 }}
              autoFocus
              value={formState.login}
              onChange={(e) => handleLoginForm(e as ChangeEvent<HTMLInputElement>, 'setLogin')}
              autoComplete='off'
              required
            />

            <TextField
              id='password'
              label='Пароль'
              type='password'
              value={formState.pass}
              onChange={(e) => handleLoginForm(e as ChangeEvent<HTMLInputElement>, 'setPass')}
              autoComplete='off'
              required
            />
          </FormControl>

          {!!formState.errors.login && (
            <Typography color='error'>{ERROR_MESSAGES_ASSOC[formState.errors.login as string]}</Typography>
          )}

          <Button
            onClick={formState.isNewUser === 'yep' ? handleEmailSignUp : handleEmailLogin}
            startIcon={<LoginIcon />}
            variant='contained'
            sx={{ px: '96px', height: '56px' }}
          >
            {formState.isNewUser === 'nope' ? 'Войти' : 'Дай админку!'}
          </Button>

          <Typography mt={2} width='100%' align='center'>
            или через Гугл
          </Typography>

          <IconButton
            color='primary'
            sx={{ zIndex: 10 }}
            onClick={() => {
              handleClose();
              signIn();
            }}
          >
            <GoogleIcon
              color='inherit'
              sx={{
                width: '56px',
                height: '56px',
              }}
            />
          </IconButton>
        </Box>
      )}

      {step === 'review' && (
        <ReviewForm {...formState} handleReviewForm={handleReviewForm} handleReviewApply={handleReviewApply} />
      )}

      {step === 'success' && <SuccessForm {...successContent} handleClose={handleClose} />}

      {step === 'loading' && <CircularProgress color='inherit' />}

      {step === 'new' && (
        <>
          <Typography variant='h5' align='left' sx={{ color: 'white' }} fontWeight={500} mb={4}>
            {labels.title}
          </Typography>

          <FormControl variant='outlined' fullWidth>
            <TextField
              id='applicant-name'
              label={formState.errors.name ? labels.nameError : labels.name}
              sx={{ marginBottom: 2 }}
              autoFocus
              value={formState.name}
              onChange={(e) => handleApplicationForm(e as ChangeEvent<HTMLInputElement>, 'name')}
              autoComplete='off'
              error={formState.errors.name as boolean}
              required
            />

            <TextField
              id='telephone'
              label={formState.errors.tel ? labels.telError : labels.tel}
              sx={{ marginBottom: 2 }}
              value={formState.tel}
              onChange={(e) => handleApplicationForm(e as ChangeEvent<HTMLInputElement>, 'tel')}
              autoComplete='off'
              error={formState.errors.tel as boolean}
              required
              InputProps={{
                // @ts-expect-error description
                inputComponent: MaskedTelephone,
              }}
            />

            <TextField
              id='comment'
              label={labels.comment}
              sx={{ marginBottom: 4 }}
              value={formState.comment}
              autoComplete='off'
              onChange={(e) => handleApplicationForm(e as ChangeEvent<HTMLInputElement>, 'comment')}
              multiline
              minRows={2}
              maxRows={4}
            />
          </FormControl>

          <ButtonGroup sx={{ marginBottom: 2, height: '56px' }} fullWidth>
            <Button variant='contained' onClick={submit}>
              Отправить
            </Button>

            <Button variant='outlined' onClick={cancel}>
              Отмена
            </Button>
          </ButtonGroup>

          <Typography variant='subtitle2' align='left' sx={{ color: 'rgba(255,255,255,0.5)' }}>
            {labels.subtitle}
          </Typography>
        </>
      )}
    </Box>
  );
};
