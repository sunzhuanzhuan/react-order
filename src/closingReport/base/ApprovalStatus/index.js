import React from 'react'
import { Tooltip } from 'antd'
import './index.less'

export const Agree = ({ text = '已通过', deg = -18, top = 40, right = 30 }) => {
  return <div className='agree-status' style={{
    transform: `rotate(${deg}deg)`,
    top: `${top}px`,
    right: `${right}px`
  }}>
    {text}
  </div>
}

export const Against = props => {
  return <div className='against-status'>
    <span className='title'>{props.text || '未通过'}</span>
    {props.reason ? <Tooltip title={props.reason}>
      <span className='reason' style={{ width: props.maxWidth || 500 }} title={props.reason}>原因: {props.reason}</span>
    </Tooltip> : null}
  </div>
}
// Refuse
export const Refuse = ({ text = '未通过', deg = -18, top = 40, right = 30, reason }) => {
  return <div style={{ width: '100%' }}>
    <div className='refuse-status' style={{
      transform: `rotate(${deg}deg)`,
      top: `${top}px`,
      right: `${right}px`
    }}>
      {text}
    </div>
    <div className='refuse-status-reason' style={{ color: 'red' }}>原因: {reason}</div>
  </div>
}
