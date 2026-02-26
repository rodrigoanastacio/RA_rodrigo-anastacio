export const maskHelpers = {
  phone: (value: string): string => {
    const numbers = value.replace(/\D/g, '').slice(0, 11)
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  },

  unmask: (value: string): string => {
    return value.replace(/\D/g, '')
  }
}
