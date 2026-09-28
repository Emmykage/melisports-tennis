const localDateString = (date) => {
  const d = new Date(date);

  return `${d.toDateString()} ${d.toLocaleTimeString()}`;
};
export const localDate = (date) => {
  const today = new Date(date);

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate; // Example: "04/10/2024"
};
export default localDateString;
