import React from 'react'
import { Form, Input, InputNumber, DatePicker, Button, Select } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker;
function WeChatForm(props) {
  const { form, mcnOrderStateList = [] } = props
  const { validateFields, getFieldDecorator, } = form
  function submitForm() {
    validateFields((err, values) => {
      if (!err) {
        let allValue = { ...values }
        if (values.receiveAt) {
          allValue.form.receiveAtStart = values.orderStartDate[0]
          allValue.form.receiveAtEnd = values.orderStartDate[1]
        }
        if (values.expectedPublishedTime) {
          allValue.form.expectedPublishedTimeStart = values.expectedPublishedTime[0]
          allValue.form.expectedPublishedTimeEnd = values.expectedPublishedTime[1]
        }
        props.searchWechatAction(allValue)
      }
    })
  }
  return (
    <div>
      <Form layout='inline'>
        <Form.Item label='任务名称'>
          {getFieldDecorator('form.orderName', {})(
            <Input placeholder='请输入' />
          )}
        </Form.Item>
        <Form.Item label='任务ID'>
          {getFieldDecorator('form.adOrderId', {})(
            <InputNumber style={{ width: 170 }} placeholder='请输入' />
          )}
        </Form.Item>
        <Form.Item label='Account_ID'>
          {getFieldDecorator('form.accountId', {})(
            <InputNumber style={{ width: 170 }} placeholder='请输入' />
          )}
        </Form.Item>
        <Form.Item label='订单状态'>
          {getFieldDecorator('form.orderState', {})(
            <Select style={{ width: 170 }} placeholder='请选择' >
              {mcnOrderStateList.map(one => <Select.Option key={one.label} value={one.label}>
                {one.value}
              </Select.Option>)}
            </Select>
          )}
        </Form.Item>

        <Form.Item label='领取时间'>
          {getFieldDecorator('receiveAt', {})(
            <RangePicker showTime />
          )}
        </Form.Item>
        <Form.Item label='预计推送时间'>
          {getFieldDecorator('expectedPublishedTime', {})(
            <RangePicker showTime />
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={submitForm}>查询</Button>
          <Button style={{ marginLeft: 20 }} onClick=''>重置</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create()(WeChatForm)
