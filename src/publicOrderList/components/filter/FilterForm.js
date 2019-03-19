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
                label={item.label}
                key={item.key}
                layout={layout}
              />
            //时间组件
            case "time":
              <DatePickerComponent
                form={form}
                label={item.label}
                key={item.key}
                layout={layout}
              />
            //多选组件
            case "multidim-select":
              <MultidimSelect
                form={form}
                label={item.label}
                key={item.key}
                layout={layout}
                data={item.data}
              />
            //单选组件
            case "select":
              <SingleSelect
                form={form}
                label={item.label}
                key={item.key}
                layout={layout}
                data={item.data}
              />
            //依赖请求的单选组件
            case "selectDependOnRequest":
              <SingleSelectDependOnRequest
                form={form}
                label={item.label}
                key={item.key}
                layout={layout}
                url={item.url}
              />
            default:
              return
          }
        })
      }
      <Button type="primary" onClick={() => props.onSubmit()}>查询</Button>
    </div>
  )
}

export default FilterForm
