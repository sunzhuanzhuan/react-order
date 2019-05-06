/*
 * 这是总的筛选组件
 * @author fuyu
 * @date 2019.3.19
 */

import React from 'react'
import { Button } from 'antd';
import InputComponent from './InputComponent'
import DatePickerComponent from './DatePickerComponent'
import MultidimSelect from './MultidimSelect'
import SingleSelect from './SingleSelect'
import SingleSelectDependOnRequest from './SingleSelectDependOnRequest'
import AgentComponent from './AgentComponent'
import './FilterForm.less'

const FilterForm = (props) => {
  const { form, filtersConfig } = props
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 }
  }
  return (
    <div>
      {
        filtersConfig.map(item => {
          switch (item.type) {
            // 文本输入组件
            case "input":
              return <InputComponent
                form={form}
                {...item}
                layout={layout}
                key={item.id}
              />
            //时间组件
            case "time":
              return <DatePickerComponent
                form={form}
                {...item}
                layout={layout}
                key={item.id}
              />
            //多选组件
            case "multidim-select":
              return <MultidimSelect
                form={form}
                {...item}
                layout={layout}
                key={item.id}
              />
            //单选组件
            case "select":
              return <SingleSelect
                form={form}
                {...item}
                layout={layout}
                key={item.id}
              />
            //依赖请求的单选组件
            case "selectDependOnRequest":
              return <SingleSelectDependOnRequest
                form={form}
                {...item}
                layout={layout}
                key={item.id}
              />
            // 下单平台/代理商
            case "agentComponent":
              return <AgentComponent
                form={form}
                key={item.id}
                {...item}
                layout={layout}
              />
            default:
              return
          }
        })
      }
      <Button type="primary" className="filterForm-btn"
        onClick={(e) => props.onSubmit(e)}>查询</Button>
    </div>
  )
}

export default FilterForm
