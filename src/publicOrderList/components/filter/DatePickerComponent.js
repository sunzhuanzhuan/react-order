/*

*这是时间选择组件
*@author fuyu
*2019.3.19

*/
import React from 'react';
import { Form, DatePicker } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const DatePickerComponent = (props) => {
  const { getFieldDecorator } = props.form
  return (
    <FormItem
      {...props.layout}
      label={props.label}
      style={{ width: '350px' }}
    >
      {getFieldDecorator(props.id)(
        <RangePicker />
      )}
    </FormItem>
  )
}

export default DatePickerComponent
