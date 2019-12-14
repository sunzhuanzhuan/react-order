import React from 'react'
import { Form, Input, DatePicker, Select, Button } from 'antd'
const { RangePicker } = DatePicker
function CooperationForm(props) {
  const { getFieldDecorator } = props.form
  return (
    <Form layout='inline'>
      <Form.Item label='任务名称'>
        {getFieldDecorator('adOrderName', {
          //rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item label='任务ID'>
        {getFieldDecorator('adOrderId', {})(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item label='订单ID'>
        {getFieldDecorator('orderId', {})(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item label='所属公司'>
        {getFieldDecorator('companyName', {})(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item label='订单状态'>
        {getFieldDecorator('otherOrderState', {})(
          <Select style={{ minWidth: 170 }}>
            {[1, 2].map(one => <Select.Option key={one}>
              {one}
            </Select.Option>)}

          </Select>
        )}
      </Form.Item>
      <Form.Item label='投放开始时间'>
        {getFieldDecorator('orderStartDate', {})(
          <RangePicker />
        )}
      </Form.Item>
      <Form.Item label='投放结束时间'>
        {getFieldDecorator('orderEndDate', {})(
          <RangePicker />
        )}
      </Form.Item>
      <Form.Item label='负责销售'>
        {getFieldDecorator('salesman', {})(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item>
        <Button type='primary'>查询</Button>
        <Button style={{ marginLeft: 20 }}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default Form.create()(CooperationForm)
