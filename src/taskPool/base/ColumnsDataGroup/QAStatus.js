import React from 'react'
import {
  statusKeyToProps
} from "@/taskPool/constants/config";

const QAStatus = ({ status = 1 }) => {
  return (
    <div>
      <span {...statusKeyToProps[status]} />
    </div>
  )
}

export default QAStatus
