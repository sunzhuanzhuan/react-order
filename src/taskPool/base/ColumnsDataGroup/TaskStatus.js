import React from 'react'
import { Badge, Typography } from "antd";
import moment from "moment";

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

function getCountDownTimeText(date) {
  const diff = moment(date) - moment()
  const duration = moment.duration(diff, 'milliseconds')
  if (diff < 300000) {
    return '小于5分钟'
  }
  const obj = {
    diff,
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes()
  }
  let text = ''
  text += obj.days ? obj.days + '天 ' : '';
  text += obj.hours ? obj.hours + '小时 ' : '';
  text += obj.minutes ? obj.minutes + '分钟' : '';
  return text
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
