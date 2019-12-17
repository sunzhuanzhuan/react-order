import React from 'react'
import { Form, Input, DatePicker, Select, Button } from 'antd'
import moment from 'moment'
const format = 'YYYY/MM/DD'
const { RangePicker } = DatePicker
function CooperationForm(props) {
  const { getFieldDecorator, validateFields } = props.form
  //搜索
  function searchForm(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (values.orderStartDate) {
          values.form.orderStartDateStart = moment(values.orderStartDate[0]).format(format)
          values.form.orderStartDateEnd = moment(values.orderStartDate[1]).format(format)
        }
        if (values.orderEndDate) {
          values.form.orderEndDateStart = moment(values.orderEndDate[0]).format(format)
          values.form.orderEndDateEnd = moment(values.orderEndDate[1]).format(format)
        }
        props.getPlatformOrderList(values)
      }
    })
  }
  return (
    <Form layout='inline'>
      <Form.Item label='任务名称'>
        {getFieldDecorator('form.adOrderName', {
          //rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item label='任务ID'>
        {getFieldDecorator('form.adOrderId', {})(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item label='订单ID'>
        {getFieldDecorator('form.orderId', {})(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item label='所属公司'>
        {getFieldDecorator('form.companyName', {})(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item label='订单状态'>
        {getFieldDecorator('form.otherOrderState', {})(
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
        {getFieldDecorator('form.salesman', {})(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item>
        <Button type='primary' onClick={searchForm}>查询</Button>
        <Button style={{ marginLeft: 20 }}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default Form.create()(CooperationForm)
