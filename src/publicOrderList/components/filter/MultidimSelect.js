/*

*这是多选
*@author fuyu
*2019.3.19

*/
import React from 'react';
import { Form, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const MultidimSelect = (props) => {
  const { getFieldDecorator } = props.form
  return (
    <FormItem
      {...props.layout}
      label={props.label}
      style={{ width: '200px' }}
    >
      {getFieldDecorator(props.id)(
        <Select
          mode="multiple"
          style={{ width: '200px' }}
        >
          {
            props.data.map(item => {
              return <Option key={item.value} value={item.value}>{item.key}</Option>
            })
          }
        </Select>
      )}
    </FormItem>
  )
}

export default MultidimSelect
