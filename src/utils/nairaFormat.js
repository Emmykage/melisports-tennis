const NGNaira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
});
const nairaFormat = (amount) => NGNaira.format(amount);
export { nairaFormat, NGNaira };
