import React from 'react'
import {
  MCN_ORDER_STATE_CANCEL,
  MCN_ORDER_STATE_DEDUCTION,
  MCN_ORDER_STATE_DEFAULT,
  MCN_ORDER_STATE_QA_ING,
  MCN_ORDER_STATE_QUALIFIED,
  MCN_ORDER_STATE_UNQUALIFIED,
  MCN_ORDER_STATE_WILL_QA
} from "@/taskPool/constants/config";

const statusKeyToProps = {
  [MCN_ORDER_STATE_DEFAULT]: {
    children: '-'
  },
  [MCN_ORDER_STATE_WILL_QA]: {
    children: '待质检'
  },
  [MCN_ORDER_STATE_QA_ING]: {
    children: '质检中'
  },
  [MCN_ORDER_STATE_DEDUCTION]: {
    children: '有扣款'
  },
  [MCN_ORDER_STATE_UNQUALIFIED]: {
    children: '不合格',
    style: { color: '#ff365d' }
  },
  [MCN_ORDER_STATE_CANCEL]: {
    children: '已取消',
  },
  [MCN_ORDER_STATE_QUALIFIED]: {
    children: '合格',
    style: { color: '#0cad67' }
  }
}
// 子订单状态-1待回填（空） 2待质检 3质检中 4有扣款 5质检不合格已退款（不合格） 6已取消（无此状态数据） 7已结算（合格）
const QAStatus = ({ status = MCN_ORDER_STATE_WILL_QA }) => {
  return (
    <div>
      <span {...statusKeyToProps[status]} />
    </div>
  )
}

export default QAStatus
