const NGNaira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
});
const naira_format = (amount) => NGNaira.format(amount);
export { naira_format };
