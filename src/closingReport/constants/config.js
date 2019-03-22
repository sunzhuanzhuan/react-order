export const fieldConfig = (fieldId) => {
  let obj = {
    '4': 'number',
    '13': 'number',
    '14': 'number',
    '15': 'number',
    '12': 'number',
    '21': 'datetime',
  };
  return obj[fieldId] || 'input';
};
