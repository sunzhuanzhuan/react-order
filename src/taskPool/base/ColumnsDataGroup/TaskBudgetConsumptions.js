import React from 'react'
import { Progress } from "antd";
import Yuan from "@/base/Yuan";

const TaskBudgetConsumptions = (props) => {
  let isDone = props.state > 1
  return (
    <div className='task-budget-consumptions'>
      <div className='left'>
        <span>可用：</span>
        <Progress percent={(props.available/props.total) * 100} size="small" strokeColor={isDone ? "#cfcfcf" : "#68d07d"} showInfo={false} />
      </div>
      <div className='right'>
        <Yuan className='text-red' value={props.available} format='0,0.00' /><br />
        <Yuan className='text-gray' value={props.total} format='0,0.00' />
      </div>
    </div>
  )
}

export default TaskBudgetConsumptions
