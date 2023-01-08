export const getDate = (timestamp: string) => {
  const date = new Date(+timestamp);

  return new Date(+timestamp).toLocaleString('ru', {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
  });
};
