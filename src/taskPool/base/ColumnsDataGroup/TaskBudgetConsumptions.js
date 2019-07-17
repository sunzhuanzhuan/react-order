import React from 'react'
import { Badge, Progress } from "antd";
import moment from "moment";
import Yuan from "@/base/Yuan";

const TaskBudgetConsumptions = (props) => {
  let isDone = true
  return (
    <div className='task-budget-consumptions'>
      <div className='left'>
        <span>已消耗：</span>
        <Progress percent={100} size="small" strokeColor={isDone ? "#cfcfcf" : "#68d07d"} showInfo={false} />
      </div>
      <div className='right'>
        <Yuan className='text-red' value={1000} format='0,0.00' /><br />
        <Yuan className='text-gray' value={8888888} format='0,0.00' />
      </div>
    </div>
  )
}

export default TaskBudgetConsumptions
