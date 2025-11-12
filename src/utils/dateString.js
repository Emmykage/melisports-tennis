const localDateString = (date) => {
  const d = new Date(date);

  return `${d.toDateString()} ${d.toLocaleTimeString()}`;
};

export default localDateString;
