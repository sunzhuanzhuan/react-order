import React from 'react'
import { Badge, Typography } from "antd";
import { getCountDownTimeText } from "@/taskPool/constants/utils";
import {
  AD_ORDER_STATE_FINISH,
  AD_ORDER_STATE_EXPIRY,
  AD_ORDER_STATE_OFFLINE,
  AD_ORDER_STATE_PROCESSING,
  AD_ORDER_STATE_UNPAID, AD_ORDER_STATE_WAIT_RELEASED, AD_ORDER_STATE_END
} from "@/taskPool/constants/config";

const { Text } = Typography;
const statusKeyToProps = {
  [AD_ORDER_STATE_UNPAID]: {
    status: 'default',
    text: '未支付'
  },
  [AD_ORDER_STATE_WAIT_RELEASED]: {
    status: 'default',
    text: '待发布'
  },
  [AD_ORDER_STATE_PROCESSING]: {
    status: 'processing',
    text: '进行中'
  },
  [AD_ORDER_STATE_FINISH]: {
    status: 'success',
    text: '已结束'
  },
  [AD_ORDER_STATE_OFFLINE]: {
    status: 'default',
    text: '已下线'
  },
  [AD_ORDER_STATE_EXPIRY]: {
    status: 'error',
    text: '已过期'
  },
  [AD_ORDER_STATE_END]: {
    status: 'error',
    text: '已终止'
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

// 任务剩余时间
export const TaskRemainingTime = ({ status, startDate, endDate }) => {
  switch (status) {
    case AD_ORDER_STATE_PROCESSING:
      return getCountDownTimeText(endDate);
    case AD_ORDER_STATE_WAIT_RELEASED:
      return getCountDownTimeText(endDate, 5,5,  startDate)
    default:
      return '无'
  }
}

export default TaskStatus
