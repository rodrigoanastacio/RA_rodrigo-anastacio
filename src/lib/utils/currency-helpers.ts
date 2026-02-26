export const currencyHelpers = {
  format: (value: number | string): string => {
    const amount = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(amount)) return 'R$ 0,00'

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount)
  },

  parse: (value: string): number => {
    const cleanValue = value.replace(/\D/g, '')
    return Number(cleanValue) / 100
  },

  formatInput: (value: string): string => {
    const cleanValue = value.replace(/\D/g, '')
    const amount = Number(cleanValue) / 100

    return amount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
}
