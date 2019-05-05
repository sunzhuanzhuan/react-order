import React from 'react'
import { Spin } from 'antd'

const Loading = () => {
  let style = {
    textAlign: 'center',
    background: 'rgba(0,0,0,0.05)',
    marginBottom: '20px',
    padding: '30px 50px',
    margin: '20px 0'
  }
  return (
    <div style={style}>
      <Spin tip="加载中..." />
    </div>
  )
}

export default Loading
