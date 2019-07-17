import React from 'react'
import { Badge, Typography } from "antd";
import { getCountDownTimeText } from "@/taskPool/constants/utils";

const { Text } = Typography;
const statusKeyToProps = {
  '1': {
    status: 'processing',
    text: '任务进行中'
  },
  '2': {
    status: 'success',
    text: '任务已结束'
  },
  '3': {
    status: 'default',
    text: '任务已下线'
  },
  '4': {
    status: 'error',
    text: '任务已过期'
  }
}

const TaskStatus = ({ status = 1 }) => {
  return (
    <div>
      <Badge {...(statusKeyToProps[status] || {})} />
      <br />
      {status === 1 && <Text>
        剩余：{getCountDownTimeText('2019-07-11 17:14:00')}
      </Text>}
    </div>
  )
}

export default TaskStatus
