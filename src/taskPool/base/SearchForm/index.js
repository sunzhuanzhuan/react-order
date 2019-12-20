import React from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import './index.less'
const { RangePicker } = DatePicker;
function SearchForm(props) {
  const { form, formData = [], formConfig = [] } = props
  const { getFieldDecorator } = form
  function getChildren({ type, key, dataShow = 'name', dataValue = 'value' }) {
    switch (type) {
      case 'select':
        return <Select placeholder='请选择' style={{ width: 170 }} allowClear>
          {formData[key].map(item => <Select.Option key={item[dataValue]}>
            {item[dataShow]}
          </Select.Option>)}
        </Select>
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
          <div style={{ minWidth: 32, alignItems: 'baseline' }}>{one.text[0]}</div>
          {getFieldDecorator(`form.${one.key}`, {})(
            getChildren(one)
          )}&nbsp;&nbsp;{one.text[1]}
        </div> : getFieldDecorator(`form.${one.key}`, {})(
          getChildren(one)
        )}
      </Form.Item>
    })
  )
}

export default SearchForm
