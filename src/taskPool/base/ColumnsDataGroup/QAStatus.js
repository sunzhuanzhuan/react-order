import React from 'react'

const statusKeyToProps = {
  '1': {
    children: '-'
  },
  '2': {
    children: '待质检'
  },
  '3': {
    children: '质检中'
  },
  '4': {
    children: '有扣款'
  },
  '5': {
    children: '不合格',
    style: { color: '#ff365d' }
  },
  '6': {
    children: '已取消',
  },
  '7': {
    children: '合格',
    style: { color: '#0cad67' }
  }
}
// 子订单状态-1待回填（空） 2待质检 3质检中 4有扣款 5质检不合格已退款（不合格） 6已取消（无此状态数据） 7已结算（合格）
const QAStatus = ({ status = 1 }) => {
  return (
    <div>
      <span {...statusKeyToProps[status]} />
    </div>
  )
}

export default QAStatus
