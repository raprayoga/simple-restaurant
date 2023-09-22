export const formRules = {
  required: {
    value: true,
    message: 'Field ini Harus diisi',
  },
  minNominal: (number: number) => ({
    value: number,
    message: 'Harus lebih besar dari ' + (number - 1),
  }),
  maxLength: (number: number) => ({
    value: number,
    message: 'Panjang karakter tidak lebih besar dari ' + number + ' karakter',
  }),
}

export function getVariant(dirty: boolean, error: boolean) {
  if (error) {
    return 'danger'
  }
  return 'default'
}
