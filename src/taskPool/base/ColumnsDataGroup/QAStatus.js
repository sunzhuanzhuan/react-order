import React from 'react'
import {
  statusKeyToProps
} from "@/taskPool/constants/config";


// 子订单状态-1待回填（空） 2待质检 3质检中 4有扣款 5质检不合格已退款（不合格） 6已取消（无此状态数据） 7已结算（合格）
const QAStatus = ({ status = 1 }) => {
  return (
    <div>
      <span {...statusKeyToProps[status]} />
    </div>
  )
}

export default QAStatus
