import React from 'react';
import { WBYPlatformIcon } from 'wbyui';
import './index.less';

const IconText = (props) => {
  return (
    <div className='platform-icon-text'>
      <WBYPlatformIcon weibo_type={props.platform || '9'} widthSize={22} />
      <span className='text' style={{ width: 146 }}>{props.text || '-'}</span>
    </div>
  );
};

export default IconText;
