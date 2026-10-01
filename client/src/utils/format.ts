const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const number = new Intl.NumberFormat('pt-BR')
const dateTime = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

export const formatCurrency = (value: number) => currency.format(value)
export const formatNumber = (value: number) => number.format(value)
export const formatDateTime = (value: number | Date) => dateTime.format(value)

export function formatChange(value: number) {
  return `${value > 0 ? '+' : ''}${value}%`
}
