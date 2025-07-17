const localDate = (date) => {
  const d = new Date(date);

  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  return `${month}-${day}-${year}`;
};

export default localDate;
