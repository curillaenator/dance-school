/* eslint-disable no-console */
import { useCallback, useState, ChangeEvent, useContext, useReducer, useEffect } from 'react';
import { ref, set, push, child } from 'firebase/database';

import { DB } from '@src/config';
import { Context } from '@src/context';

import {
  formReducer,
  INITIAL_FORM_STATE,
  actions,
  errActions,
  ApplicationKind,
  ACTIONS_ASSOC,
  ActionsType,
} from './formReducer';

import { jsonToHtml, inputToHtml } from '@src/utils';
import { NUMS, MIN_NAME_LENGTH, labels } from '../constants';
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
  const {
    uid,
    desiredCoach,
    applicationFormStep: step,
    setApplicationFormStep: setStep,
    signIn,
    signInWithLogin,
    signUpWithLogin,
    // logOut,
    signInAnon,
  } = useContext(Context);

  const [successContent, setSuccessContent] = useState({
    title: 'Супер!',
    subtitle: labels.subtitleSuccess,
  });

  useEffect(() => {
    if (step === 'new') {
      setSuccessContent({
        title: 'Супер!',
        subtitle: 'Мы получили вашу заявку и свяжемся с Вами в самое ближайшее время!!!',
      });
    }

    if (step === 'review') {
      setSuccessContent({
        title: 'Супер!',
        subtitle: 'Спасибо за ваш отзыв!!!',
      });
    }
  }, [step]);

  const [formState, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);
  const { name, tel, comment, errors } = formState;

  const submit = useCallback(() => {
    if (name === keyWords.name && tel === keyWords.tel) {
      setStep('login');
      return;
    }

    const submitAfterSignAnon = () => {
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
          console.log(err.message);
          setStep('error');
        });
    };

    signInAnon(submitAfterSignAnon);
  }, [uid, name, tel, comment, setStep, dispatch, signInAnon]);

  const cancel = useCallback(() => {
    dispatch(actions.resetForm(''));
    handleClose();
  }, [handleClose, dispatch]);

  const handleApplicationForm = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: ApplicationKind) => {
      if (errors[field]) dispatch(errActions.setErrors({ key: field, value: false }));
      dispatch(ACTIONS_ASSOC[field](e.target.value));
    },
    [errors, dispatch],
  );

  const handleReviewForm = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: ActionsType) => {
      const action = actions[field];
      dispatch(action(e.target.value));
    },
    [dispatch],
  );

  const handleReviewApply = useCallback(() => {
    const writeReview = () => {
      const { author, review, rating } = formState;
      const newReviewId = push(child(ref(DB), 'reviews')).key as string;

      const data = {
        id: newReviewId,
        author,
        review: inputToHtml(review),
        rating,
      };

      set(ref(DB, `reviews/${newReviewId}`), data)
        .then(() => {
          dispatch(actions.resetForm(''));
          setStep('success');
        })
        .catch((err) => {
          console.log(err);
          setStep('error');
        });
    };

    setStep('loading');
    signInAnon(writeReview);
  }, [formState, signInAnon, setStep, dispatch]);

  const handleLoginForm = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: ActionsType) => {
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

  const handleEmailSignUp = useCallback(() => {
    const { login, pass } = formState;

    signUpWithLogin(login, pass, {
      scCb: () => {
        dispatch(actions.resetForm(''));
        handleClose();
      },
      errCb: (msg: string) => {
        dispatch(errActions.setErrors({ key: 'login', value: msg }));
      },
    });
  }, [formState, handleClose, signUpWithLogin, dispatch]);

  const handleIsNewUser = useCallback(() => {
    dispatch(actions.setIsNewUser(formState.isNewUser === 'nope' ? 'yep' : 'nope'));
  }, [formState.isNewUser]);

  useEffect(() => {
    if (!!desiredCoach) {
      dispatch(actions.setComment(`Хочу к тренеру ${jsonToHtml(desiredCoach.name)}`));
    }
  }, [desiredCoach]);

  return {
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
  };
};
