/*

*这是下拉单选组件-下拉框数据由前端写死
*@author fuyu
*2019.3.19

*/
import React from 'react';
import { Select, Form } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const SingleSelect = (props) => {
  const { getFieldDecorator } = props.form
  return (
    <FormItem
      {...props.layout}
      label={props.label}
    >
      {getFieldDecorator(props.id, { initialValue: "0" })(
        <Select style={{ width: '270px' }}>
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

export default SingleSelect
