/* eslint-disable no-console */
import { useState, useCallback, ChangeEvent, useContext } from 'react';
import { ref, set, push, child } from 'firebase/database';

import { DB } from '@src/config';
import { Context } from '@src/context';

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
  const { signIn } = useContext(Context);

  const [name, setName] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const [errors, setErrors] = useState({ name: false, tel: false, comment: false });

  const [step, setStep] = useState<'new' | 'loading' | 'success' | 'error'>('new');

  const clear = useCallback(() => {
    setName('');
    setTel('');
    setComment('');
  }, []);

  const submit = useCallback(() => {
    if (name === keyWords.name && tel === keyWords.tel) {
      handleClose();
      signIn();
      return;
    }

    const isTelValid = checkTel(tel);
    const isNameValid = name.length > MIN_NAME_LENGTH;

    if (!isNameValid || !isTelValid) {
      if (!isNameValid) setErrors((prev) => ({ ...prev, name: true }));
      if (!isTelValid) setErrors((prev) => ({ ...prev, tel: true }));
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
        clear();
        setStep('success');
      })
      .catch((err) => {
        console.log(err);
        setStep('error');
      });
  }, [name, tel, comment, clear, handleClose, signIn]);

  const cancel = useCallback(() => {
    clear();
    handleClose();
  }, [handleClose, clear]);

  const handleName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (errors.name) {
        setErrors((prev) => ({ ...prev, name: false }));
      }

      setName(e.target.value);
    },
    [errors.name],
  );

  const handleTel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (errors.tel) {
        setErrors((prev) => ({ ...prev, tel: false }));
      }

      setTel(e.target.value);
    },
    [errors.tel],
  );

  const handleComment = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }, []);

  return {
    name,
    tel,
    comment,
    errors,
    step,
    handleName,
    handleTel,
    handleComment,
    submit,
    cancel,
    handleClose,
  };
};
