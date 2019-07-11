import React from 'react'
import { Badge, Typography } from "antd";
import moment from "moment";
import Yuan from "@/base/Yuan";

const TaskBudgetConsumptions = (props) => {
  return (
    <div>
      <div>
        <span>已消耗：</span>
        <Yuan className='text-red' value={10000000} format='0,0.0'/>
      </div>
      <div>
        <span>已消耗：</span>
        <Yuan className='text-red' value={11212121}/>
      </div>
    </div>
  )
}

export default TaskBudgetConsumptions
