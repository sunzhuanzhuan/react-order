import React from 'react'
import { Badge } from 'antd'
const orderStateMap = {
  '待执行': 'default',
  '合格': 'processing',
  '待一检': 'processing',
  '待二检': 'processing',
  '一检异常待处理': 'warning',
  '二检异常待处理': 'warning',
  '待确认': 'warning',
  '待修改': 'warning',
  '不合格': 'error',
  '取消结算': 'error',
  '已取消': 'error',
  '已完成': 'success',
}
function OrderMcnStatus({ value }) {
  return <><Badge status={orderStateMap[value]} />{value}</>
}

export default OrderMcnStatus
