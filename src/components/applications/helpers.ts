const RU = new Intl.DateTimeFormat('ru');

export const getDate = (timestamp: string) => {
  const date = new Date(+timestamp);
  return RU.format(date);
};
