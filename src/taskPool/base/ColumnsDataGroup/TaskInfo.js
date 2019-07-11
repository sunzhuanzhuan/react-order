import React from 'react'
import { IconInfoBlock } from "@/base/DataGroup";
import { Typography } from "antd";
const { Text } = Typography;

const TaskInfo = (props) => {
  return (
    <IconInfoBlock platformId={props.platformId}>
      <Text ellipsis style={{width: 180}}>{props.name}</Text>
      <br />
      <Text type="secondary">ID：{props.id}</Text>
    </IconInfoBlock>
  )
}

export default TaskInfo
