export const labels = {
  title: 'Оставьте ваши контактные данные',
  titleSuccess: 'Супер!',
  name: 'Ваше имя',
  nameError: 'Слишком короткое имя',
  tel: 'Телефон для свзязи',
  telError: 'Введен некорректный номер',
  comment: 'Ваши пожелания или комментарии',
  subtitle:
    'Нажимая на кнопку "Отправить", вы даете согласие на обработку персональных данных и соглашаетесь c политикой конфиденциальности',
  subtitleSuccess: 'Мы получили вашу заявку и свяжемся с Вами в самое ближайшее время!!!',
};

export const NUMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const MIN_NAME_LENGTH = 5;

export const ERROR_MESSAGES_ASSOC: Record<string, string> = {
  'Firebase: Error (auth/user-not-found).': 'Нет такого пользователя',
  'Firebase: Error (auth/invalid-email).': 'Некорректный логин',
  'Firebase: Error (auth/wrong-password).': 'Некорректный пароль',
};
