import React from 'react'
import { Form, Button } from 'antd'
import accountConfig from '../../constants/accountConfig'
import moment from 'moment'
import SearchForm from '../../base/SearchForm/index'
const format = 'YYYY-MM-DD'
const formConfig = [
  { label: 'accountID', type: 'input', key: 'accountId' },
  { label: '平台ID', type: 'input', key: 'platformId' },
  { label: '账号名称', type: 'input', key: 'snsName' },
  { label: '主账号名称', type: 'input', key: 'identityName' },
  { label: '资源媒介经理', type: 'input', key: 'ownerAdminName' },
  { label: '提交时间', type: 'rangePicker', key: 'submitTime', },
]
function AccountForm(props) {
  const { form, searchAction, } = props
  const { resetFields, validateFields } = form
  function onSearch(e) {
    e.preventDefault();
    validateFields((err, values) => {
      const { submitTime, } = values.form
      if (submitTime) {
        values.form.submitStartTime = moment(submitTime[0]).format(format)
        values.form.submitEndTime = moment(submitTime[1]).format(format)
      }
      searchAction && searchAction(values)
    })
  }
  function onReset() {
    resetFields()
    props.onReset && props.onReset()
  }

  return (
    <Form layout='inline' className='use-form-search'>
      <SearchForm form={form} formData={accountConfig} formConfig={formConfig} />
      <Button type='primary' onClick={onSearch}>筛选</Button>
      <Button style={{ marginLeft: 10 }} onClick={onReset}>重置</Button>
    </Form>
  )
}

export default Form.create()(AccountForm)
