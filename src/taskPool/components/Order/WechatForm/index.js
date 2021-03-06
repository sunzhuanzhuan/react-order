/*
 * @Descripttion: 
 * @Author: wangxinyue
 * @Date: 2020-01-08 10:30:32
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-02-13 15:11:11
 */
import React from 'react'
import { Form, Input, InputNumber, DatePicker, Button, Select } from 'antd'
const format = 'YYYY-MM-DD HH:mm:ss'
import { getDataByFormat } from '@/taskPool/constants/utils.js'
const { RangePicker } = DatePicker;
function WeChatForm(props) {
  const { form, mcnOrderStateList = [], resetWachat } = props
  const { validateFields, getFieldDecorator, resetFields } = form
  function submitForm() {
    validateFields((err, values) => {
      if (!err) {
        let allValue = { ...values }
        if (values.receiveAt) {
          allValue.form.receiveAtStart = getDataByFormat(values.receiveAt[0], format)
          allValue.form.receiveAtEnd = getDataByFormat(values.receiveAt[1], format)
          delete allValue.receiveAt
        }
        if (values.expectedPublishedTime) {
          allValue.form.expectedPublishedTimeStart = getDataByFormat(values.expectedPublishedTime[0], format)
          allValue.form.expectedPublishedTimeEnd = getDataByFormat(values.expectedPublishedTime[1], format)
          delete allValue.expectedPublishedTime

        }
        props.searchWechatAction(allValue)
      }
    })
  }
  function resetForm() {
    resetFields()
    resetWachat()
  }
  //
  return (
    <div>
      <Form layout='inline'>
        <Form.Item label='任务名称'>
          {getFieldDecorator('form.orderName', {})(
            <Input placeholder='请输入' />
          )}
        </Form.Item>
        <Form.Item label='任务ID'>
          {getFieldDecorator('form.adOrderNumber', {})(
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
            <Select style={{ width: 170 }}
              allowClear placeholder='请选择' >
              {mcnOrderStateList.map(one => <Select.Option key={one.stateKey} value={one.stateKey} >
                {one.mcnOrderStateName}
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
          <Button style={{ marginLeft: 20 }} onClick={resetForm}>重置</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create()(WeChatForm)
