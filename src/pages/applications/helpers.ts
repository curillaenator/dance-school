const RU = new Intl.DateTimeFormat('ru');

export const getDate = (timestamp: string) => {
  const date = new Date(+timestamp);
  return RU.format(date);
};

export const processLongName = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.slice(0, 16))
    .join(' ');
};
