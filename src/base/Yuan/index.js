import React from 'react';
import './index.less'
import numeral from 'numeral'

const Yuan = (props) => {
  let { value, format } = props
  format = format || '0.00'
  value = value || '0'
  return (
    <div className={'yuan ' + props.className} style={props.style}>
      {numeral(value).format(format)}
    </div>
  );
};

export default Yuan;
