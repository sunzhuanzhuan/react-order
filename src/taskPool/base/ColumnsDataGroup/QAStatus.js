import React from 'react'


const QAStatus = ({ status = 2 }) => {
  return (
    <div>
      {status === 1 && <span style={{color: '#0CAD67'}}>合格</span>}
      {status === 2 && <span style={{color: '#FF365D'}}>不合格</span>}
    </div>
  )
}

export default QAStatus
