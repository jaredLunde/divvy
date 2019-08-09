export let range = n => [...Array(n).keys()]
export const formatDate = (date = new Date()) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return `${monthNames[monthIndex]} ${day}, ${year}`
}
export const foreign = (members, id) => {
  for (let member of members)
    if (member.id === id)
      return member
}
export const formatCurrency = value => (new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})).format(value)
export const formatNumber = value => (new Intl.NumberFormat('en-US')).format(value)