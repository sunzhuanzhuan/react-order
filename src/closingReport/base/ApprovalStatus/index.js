import React from 'react';
import { Tooltip } from 'antd';
import './index.less';

export const Agree = props => {
  return <div className='Agree-status' style={{transform: `rotate(-25deg) scale(${props.zoom || 1})`}}>
    {props.text || '已通过'}
  </div>;
};

export const Against = props => {
  return <div className='against-status'>
    <span className='title'>{props.text || '未通过'}</span>
      {props.reason ? <Tooltip title={props.reason}>
        <span className='reason' style={{ width: props.maxWidth || 560 }} title={props.reason}>原因: {props.reason}</span>
      </Tooltip> : null}
  </div>;
};
