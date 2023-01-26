/* eslint-disable no-console */
import { useState, useCallback, ChangeEvent, useContext, useReducer } from 'react';
import { ref, set, push, child } from 'firebase/database';

import { DB } from '@src/config';
import { Context } from '@src/context';

import { formReducer, INITIAL_FORM_STATE, actions, errActions, ApplicationKind, ACTIONS_ASSOC } from './formReducer';

import { NUMS, MIN_NAME_LENGTH } from '../constants';
import { ApplicationType } from '@src/types';
import { ApplicationProps } from '../interfaces';

const keyWords = {
  name: process.env.AUTH_NAME,
  tel: process.env.AUTH_TEL,
};

const checkTel = (tel: string) => {
  return tel.split('').filter((n) => n !== ' ' && NUMS.includes(+n)).length === 11;
};

export const useApplication = (props: ApplicationProps) => {
  const { handleClose } = props;
  const { signIn, signInWithLogin } = useContext(Context);

  const [formState, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);
  const { name, tel, comment, errors } = formState;

  const [step, setStep] = useState<'new' | 'loading' | 'success' | 'error' | 'login'>('new');

  const submit = useCallback(() => {
    if (name === keyWords.name && tel === keyWords.tel) {
      setStep('login');
      return;
    }

    const isTelValid = checkTel(tel);
    const isNameValid = name.length > MIN_NAME_LENGTH;

    if (!isNameValid || !isTelValid) {
      if (!isNameValid) dispatch(errActions.setErrors({ key: 'name', value: true }));
      if (!isTelValid) dispatch(errActions.setErrors({ key: 'tel', value: true }));
      return;
    }

    setStep('loading');

    const newApplicationId = push(child(ref(DB), 'applications')).key as string;

    const data: ApplicationType = {
      id: newApplicationId,
      name,
      tel,
      comment,
      created: String(+new Date()),
      called: false,
      completed: false,
    };

    set(ref(DB, `applications/${newApplicationId}`), data)
      .then(() => {
        dispatch(actions.resetForm(''));
        setStep('success');
      })
      .catch((err) => {
        console.log(err);
        setStep('error');
      });
  }, [name, tel, comment, dispatch]);

  const cancel = useCallback(() => {
    dispatch(actions.resetForm(''));
    handleClose();
  }, [handleClose, dispatch]);

  const handleApplication = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: ApplicationKind) => {
      if (errors[field]) dispatch(errActions.setErrors({ key: field, value: false }));
      dispatch(ACTIONS_ASSOC[field](e.target.value));
    },
    [errors.name, dispatch],
  );

  const handleLoginForm = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: keyof typeof actions) => {
      if (errors.login) {
        dispatch(errActions.setErrors({ key: 'login', value: '' }));
      }

      const action = actions[field];
      dispatch(action(e.target.value));
    },
    [dispatch, errors.login],
  );

  const handleEmailLogin = useCallback(() => {
    const { login, pass } = formState;

    signInWithLogin(login, pass, {
      scCb: () => {
        dispatch(actions.resetForm(''));
        handleClose();
      },
      errCb: (msg: string) => {
        dispatch(errActions.setErrors({ key: 'login', value: msg }));
      },
    });
  }, [formState, handleClose, signInWithLogin, dispatch]);

  return {
    step,
    formState,
    signIn,
    handleApplication,
    submit,
    cancel,
    handleClose,
    handleLoginForm,
    handleEmailLogin,
  };
};
