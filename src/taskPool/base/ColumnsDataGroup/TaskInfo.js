import React from 'react'
import { IconInfoBlock } from "@/base/DataGroup";
import { Typography, Tooltip } from "antd";
import { NavLink } from "react-router-dom";

const { Text } = Typography;

const TaskInfo = (props) => {
  return (
    props.id ?
      <IconInfoBlock platformId={props.platformId}>
        <Tooltip placement="topLeft" title={props.name}>
          <Text ellipsis style={{ width: 180 }}>
            {props.src ?
              <NavLink to={props.src}>{props.name}</NavLink> : props.name}
          </Text>
        </Tooltip>
        <br />
        <Text type="secondary">ID：{props.id}</Text>
      </IconInfoBlock> :
      <IconInfoBlock platformId={props.platformId}>
        <Text ellipsis style={{ width: 180, lineHeight: "28px" }}>
          {props.name}
        </Text>
        <br />
      </IconInfoBlock>
  )
}

export default TaskInfo
