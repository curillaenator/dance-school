import { useState, useCallback, ChangeEvent } from 'react';
import { ref, set, push, child } from 'firebase/database';

import { DB } from '@src/config';

import { NUMS, MIN_NAME_LENGTH } from '../constants';
import { ApplicationProps } from '../interfaces';

const checkTel = (tel: string) => {
  return tel.split('').filter((n) => n !== ' ' && NUMS.includes(+n)).length === 11;
};

export const useApplication = (props: ApplicationProps) => {
  const { handleClose } = props;

  const [name, setName] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [errors, setErrors] = useState({ name: false, tel: false });
  const [step, setStep] = useState<'new' | 'loading' | 'success' | 'error'>('new');

  const submit = useCallback(() => {
    const isTelValid = checkTel(tel);
    const isNameValid = name.length > MIN_NAME_LENGTH;

    if (!isNameValid || !isTelValid) {
      if (!isNameValid) setErrors((prev) => ({ ...prev, name: true }));
      if (!isTelValid) setErrors((prev) => ({ ...prev, tel: true }));
      return;
    }

    setStep('loading');

    const data = {
      name,
      tel,
      created: String(+new Date()),
    };

    const newApplicationId = push(child(ref(DB), 'applications')).key;

    set(ref(DB, `applications/${newApplicationId}`), data)
      .then(() => {
        setName('');
        setTel('');
        setStep('success');
      })
      .catch((err) => {
        setStep('error');
        console.log(err);
      });
  }, [name, tel, handleClose]);

  const cancel = useCallback(() => {
    setName('');
    setTel('');
    handleClose();
  }, [handleClose]);

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

  return {
    name,
    tel,
    errors,
    step,
    handleName,
    handleTel,
    submit,
    cancel,
    handleClose,
  };
};
