import React from 'react'
import { Badge, Typography } from "antd";
import { getCountDownTimeText } from "@/taskPool/constants/utils";

const { Text } = Typography;
const statusKeyToProps = {
  '0': {
    status: 'default',
    text: '未支付'
  },
  '1': {
    status: 'processing',
    text: '任务进行中'
  },
  '4': {
    status: 'success',
    text: '任务已结束'
  },
  '3': {
    status: 'default',
    text: '任务已下线'
  },
  '2': {
    status: 'error',
    text: '任务已过期'
  }
}

const TaskStatus = ({ status, date }) => {
  return (
    <div>
      <Badge {...(statusKeyToProps[status] || {})} />
      <br />
      {date && status === 1 && <Text>
        剩余：{getCountDownTimeText(date)}
      </Text>}
    </div>
  )
}

export default TaskStatus
