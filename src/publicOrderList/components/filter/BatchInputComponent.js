//批量输入input组件
import React from 'react';
import { Input, Form } from 'antd';
import BatchInput from '@/components/Common/BatchInput/index'
const FormItem = Form.Item;
const InputComponent = (props) => {
  const { getFieldDecorator } = props.form
  return (
    <FormItem
      {...props.layout}
      label={props.label}
    >
      {getFieldDecorator(props.id)(
        // <Input style={{ width: '270px' }} />
        <BatchInput />
      )}
    </FormItem>
  )
}

export default InputComponent
