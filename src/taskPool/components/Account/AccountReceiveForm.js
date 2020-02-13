import React from 'react'
import { Form, Button, Input, DatePicker } from 'antd'
const { RangePicker } = DatePicker
import SelectSearch from './SelectSearch'
import { getDataByFormat } from '@/taskPool/constants/utils.js'

function AccountForm(props) {
  const { form, searchAction, } = props
  const { resetFields, validateFields, getFieldDecorator } = form
  function onSearch(e) {
    e.preventDefault();
    validateFields((err, values) => {
      const { submitTime, identity, ownerAdmin } = values
      if (submitTime) {
        values.form.submitStartTime = getDataByFormat(submitTime[0])
        values.form.submitEndTime = getDataByFormat(submitTime[1])
      }
      if (identity) {
        values.form.identityId = identity.key
        values.form.identityName = identity.label
      }
      if (ownerAdmin) {
        values.form.mediumId = ownerAdmin.key
        values.form.mediumName = ownerAdmin.label
      }
      delete values.submitTime
      delete values.identity
      delete values.ownerAdmin
      searchAction && searchAction(values)
    })
  }
  function onReset() {
    resetFields()
    props.onReset && props.onReset()
  }

  return (
    <Form layout='inline' className='use-form-search'>
      <Form.Item label='accountID'>
        {getFieldDecorator(`form.accountId`, {})(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item label='账号ID'>
        {getFieldDecorator(`form.snsId`, {})(
          <Input placeholder='请输入' />
        )}
      </Form.Item>
      <Form.Item label='账号名称'>
        {getFieldDecorator(`form.snsName`, {})(
          <Input placeholder='请输入' />
        )}
      </Form.Item>

      <Form.Item label='主账号名称'>
        {getFieldDecorator(`identity`, {})(
          <SelectSearch searchKey='identityName' />
        )}
      </Form.Item>
      <Form.Item label='资源媒介经理'>
        {getFieldDecorator(`ownerAdmin`, {})(
          <SelectSearch searchKey='mediaRealName' />
        )}
      </Form.Item>
      <Form.Item label='提交时间'>
        {getFieldDecorator(`submitTime`, {})(
          <RangePicker />
        )}
      </Form.Item>
      <Button type='primary' onClick={onSearch}>筛选</Button>
      <Button style={{ marginLeft: 10 }} onClick={onReset}>重置</Button>
    </Form>
  )
}

export default Form.create()(AccountForm)
