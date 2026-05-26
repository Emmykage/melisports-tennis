const NGNaira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
})

const nairaFormat = (amount) => {
  if (
    amount === '' ||
    amount === null ||
    amount === undefined
  ) {
    return NGNaira.format(0)
  }

  const value = Number(amount)

  return NGNaira.format(
    Number.isNaN(value) ? 0 : value
  )
}

export { nairaFormat, NGNaira }