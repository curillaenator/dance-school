import { Reducer } from 'react';

type ErrorsKind = 'name' | 'tel' | 'comment' | 'login';
type ErrorPayload = { key: ErrorsKind; value: string | boolean };
type Errors = Record<ErrorsKind, boolean | string>;

interface ActionType<T = string | ErrorPayload> {
  type:
    | 'SET_LOGIN'
    | 'SET_PASS'
    | 'SET_NAME'
    | 'SET_TEL'
    | 'SET_COMMENT'
    | 'SET_REVIEW_AUTHOR'
    | 'SET_REVIEW_TEXT'
    | 'SET_REVIEW_RATING'
    | 'SET_ERRORS'
    | 'SET_ALL_ERRORS'
    | 'SET_NEW_USER'
    | 'RESET_FORM';
  payload: T;
}

export type ACreator<T = string> = (pl: T) => ActionType<T>;

export type ApplicationKind = 'name' | 'tel' | 'comment';

interface StateType {
  name: string;
  tel: string;
  comment: string;
  login: string;
  pass: string;
  author: string;
  review: string;
  rating: string;
  isNewUser: string;
  errors: Errors;
}

const SET_NAME = 'SET_NAME';
const SET_TEL = 'SET_TEL';
const SET_COMMENT = 'SET_COMMENT';

const SET_LOGIN = 'SET_LOGIN';
const SET_PASS = 'SET_PASS';

const SET_REVIEW_AUTHOR = 'SET_REVIEW_AUTHOR';
const SET_REVIEW_TEXT = 'SET_REVIEW_TEXT';
const SET_REVIEW_RATING = 'SET_REVIEW_RATING';

const SET_NEW_USER = 'SET_NEW_USER';
const RESET_FORM = 'RESET_FORM';

const SET_ALL_ERRORS = 'SET_ALL_ERRORS';
const SET_ERRORS = 'SET_ERRORS';

export const INITIAL_ERRORS: Errors = {
  name: false,
  tel: false,
  comment: false,
  login: '',
};

export const INITIAL_FORM_STATE: StateType = {
  name: '',
  tel: '',
  comment: '',
  login: '',
  pass: '',
  author: '',
  review: '',
  rating: '',
  isNewUser: 'nope',
  errors: INITIAL_ERRORS,
};

export const formReducer: Reducer<StateType, ActionType> = (state, action): StateType => {
  const { type, payload } = action;

  const stringPayload = payload as string;

  switch (type) {
    case SET_NAME:
      return { ...state, name: stringPayload };

    case SET_TEL:
      return { ...state, tel: stringPayload };

    case SET_COMMENT:
      return { ...state, comment: stringPayload };

    case SET_COMMENT:
      return { ...state, comment: stringPayload };

    // ///

    case SET_LOGIN:
      return { ...state, login: stringPayload };

    case SET_PASS:
      return { ...state, pass: stringPayload };

    case SET_NEW_USER:
      return { ...state, isNewUser: stringPayload };

    // ///

    case SET_REVIEW_AUTHOR:
      return { ...state, author: stringPayload };

    case SET_REVIEW_TEXT:
      return { ...state, review: stringPayload };

    case SET_REVIEW_RATING:
      return { ...state, rating: stringPayload };

    // ///

    case RESET_FORM:
      return INITIAL_FORM_STATE;

    // ///

    case SET_ALL_ERRORS:
      return { ...state, errors: INITIAL_ERRORS };

    case SET_ERRORS:
      const pl = payload as ErrorPayload;
      const { key, value } = pl;
      return { ...state, errors: { ...state.errors, [key]: value } };

    default:
      return state;
  }
};

const setName: ACreator = (name) => ({ type: SET_NAME, payload: name });
const setTel: ACreator = (tel) => ({ type: SET_TEL, payload: tel });
const setComment: ACreator = (comment) => ({ type: SET_COMMENT, payload: comment });
const setLogin: ACreator = (login) => ({ type: SET_LOGIN, payload: login });
const setPass: ACreator = (pass) => ({ type: SET_PASS, payload: pass });
const setAuthor: ACreator = (pass) => ({ type: SET_REVIEW_AUTHOR, payload: pass });
const setReview: ACreator = (pass) => ({ type: SET_REVIEW_TEXT, payload: pass });
const setRating: ACreator = (pass) => ({ type: SET_REVIEW_RATING, payload: pass });
const setIsNewUser: ACreator = (isNew) => ({ type: SET_NEW_USER, payload: isNew });

const resetForm: ACreator = () => ({ type: RESET_FORM, payload: 'none' });

const setAllErrors: ACreator = () => ({ type: SET_ALL_ERRORS, payload: 'none' });
const setErrors: ACreator<ErrorPayload> = (payload) => ({ type: SET_ERRORS, payload });

export const actions = {
  setName,
  setTel,
  setComment,
  setLogin,
  setPass,
  setAuthor,
  setReview,
  setRating,
  resetForm,
  setIsNewUser,
};

export const errActions = {
  setAllErrors,
  setErrors,
};

export const ACTIONS_ASSOC: Record<ApplicationKind, ACreator> = {
  name: setName,
  tel: setTel,
  comment: setComment,
};

export type ActionsType = keyof typeof actions;
