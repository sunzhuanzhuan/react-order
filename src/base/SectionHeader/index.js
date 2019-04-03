import React from 'react';
import './index.less';

export const SH2 = (props) => {
  return <h2 className='section-header h2'>
    <span>{props.title || '订单数据明细'}</span>
  </h2>;

};
