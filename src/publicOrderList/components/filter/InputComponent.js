/*

*这是input组件-之所以把input再封装一次 
              1.为了传入参数的统一性 
              2.为了如果不同的input有不同的输入限制，更好的统一安排，只需要增加一个config:{rule:"",initialValue:""}
*@author fuyu
*2019.3.19

*/

import React from 'react';
import { Input, Form } from 'antd';
const FormItem = Form.Item;
const InputComponent = (props) => {
  const { getFieldDecorator } = props.form
  return (
    <FormItem
      // {...props.layout}
      label={props.label}
      style={{ width: '200px' }}
    >
      {getFieldDecorator(props.key)(
        <Input />
      )}
    </FormItem>
  )
}

export default InputComponent
