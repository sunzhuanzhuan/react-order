/*
 * @Descripttion: 
 * @Author: wangxinyue
 * @Date: 2020-01-13 14:02:44
 * @LastEditors  : wangxinyue
 * @LastEditTime : 2020-02-10 19:17:21
 */
import React from 'react'
import { Form, Input, Select, DatePicker, InputNumber } from 'antd'
import './index.less'
const { RangePicker } = DatePicker;
function SearchForm(props) {
  const { form, formData = [], formConfig = [] } = props
  const { getFieldDecorator } = form
  function getChildren({ type, key, dataShow = 'name', dataValue = 'value', max }) {
    switch (type) {
      case 'select':
        return <Select placeholder='请选择' style={{ width: 110 }} allowClear>
          {formData[key].map(item => <Select.Option key={item[dataValue]}>
            {item[dataShow]}
          </Select.Option>)}
        </Select>
      case 'inputNumber':
        return <InputNumber placeholder={`请输入`} style={{ width: 150 }} max={max} />
      case 'rangePicker':
        return <RangePicker placeholder={['开始时间', '结束时间']} />
      default:
        return <Input placeholder={`请输入`} />
    }
  }
  return (
    formConfig.map(one => {
      return <Form.Item key={one.key} label={one.label} >
        {one.text ? <div style={{ display: 'flex' }}>
          <div style={{ minWidth: 32, lineHeight: '37px' }}>{one.text[0]}</div>
          {getFieldDecorator(`form.${one.key}`, {})(
            getChildren(one)
          )}&nbsp;&nbsp;<div style={{ lineHeight: '37px' }}>{one.text[1]}</div>
        </div> : getFieldDecorator(`form.${one.key}`, {})(
          getChildren(one)
        )}
      </Form.Item>
    })
  )
}

export default SearchForm
