import { ptBR } from 'date-fns/locale'

export const currencyFormatter = new Intl.NumberFormat(ptBR.code, {
  style: 'currency',
  currency: 'BRL',
})
