export const fieldConfig = (fieldId) => {
  let obj = {
    '4': 'number',
    '7': 'number',
    '8': 'number',
    '9': 'number',
    '10': 'number',
    '11': 'number',
    '12': 'number',
    '13': 'number',
    '14': 'number',
    '15': 'number',
    '16': 'number',
    '17': 'number',
    '18': 'number',
    '19': 'number',
    '20': 'number',
    '21': 'datetime'
  }
  return obj[fieldId] || 'input'
}
