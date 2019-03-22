import React from 'react';
import numeral from 'numeral';

const DataFieldFormat = ({ value, not, type = 'number' }) => {
  if (not) return value;
  let result;
  if (!result) {
    result = '-';
  }
  if (type === 'number') {
    if (!isNaN(value)) {
      result = numeral(value).format('0,0');
    }
  } else if (type === 'input') {
    result = value;
  } else {
    result = value;
  }

  return <span>{result}</span>;

};

export default DataFieldFormat;
