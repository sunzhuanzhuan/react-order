import React from 'react'
import { Badge, Typography } from "antd";
import { getCountDownTimeText } from "@/taskPool/constants/utils";
import {
  AD_ORDER_STATE_END,
  AD_ORDER_STATE_EXPIRY,
  AD_ORDER_STATE_OFFLINE,
  AD_ORDER_STATE_PROCESSING,
  AD_ORDER_STATE_UNPAID
} from "@/taskPool/constants/config";

const { Text } = Typography;
const statusKeyToProps = {
  [AD_ORDER_STATE_UNPAID]: {
    status: 'default',
    text: '未支付'
  },
  [AD_ORDER_STATE_PROCESSING]: {
    status: 'processing',
    text: '任务进行中'
  },
  [AD_ORDER_STATE_END]: {
    status: 'success',
    text: '任务已结束'
  },
  [AD_ORDER_STATE_OFFLINE]: {
    status: 'default',
    text: '任务已下线'
  },
  [AD_ORDER_STATE_EXPIRY]: {
    status: 'error',
    text: '任务已过期'
  }
}

const TaskStatus = ({ status, date }) => {
  return (
    <div>
      <Badge {...(statusKeyToProps[status] || {})} />
      <br />
      {date && status === AD_ORDER_STATE_PROCESSING && <Text>
        剩余：{getCountDownTimeText(date)}
      </Text>}
    </div>
  )
}

export default TaskStatus
