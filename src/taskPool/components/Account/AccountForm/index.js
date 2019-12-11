import React from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import './index.less'
const { RangePicker } = DatePicker;
const formConfig = [
  { label: 'accountID', type: 'input', key: 'accountId' },
  { label: '平台ID', type: 'input', key: 'platformId' },
  { label: '账号名称', type: 'input', key: 'snsName' },
  { label: '主账号名称', type: 'input', key: 'accountName' },
  { label: '审核状态', type: 'select', key: '1', data: [] },
  { label: '评估状态', type: 'select', key: '2', data: [] },
  { label: '评估等级', type: 'select', key: '3', data: [] },
  { label: '上下架状态', type: 'select', key: '4', data: [] },
  { label: '抢单接单状态', type: 'select', key: '5', data: [] },
  { label: '竞价接单状态', type: 'select', key: '6', data: [] },
  { label: '审核时间', type: 'rangePicker', key: '7', data: [] },
  { label: '评估时间', type: 'rangePicker', key: '8', data: [] },
  { label: '粉丝数', text: ['大于', '个'], key: '9' },
  { label: '28天内第一条平均阅读', text: ['高于'], key: '10' },
  { label: '粉丝性别比例', type: 'select', key: '11', data: [] },
  { label: '认证号', type: 'select', key: '12', data: [] },

]
function AccountForm(props) {
  const { getFieldDecorator } = props.form
  function getChildren({ type, data, dataShow, dataValue }) {
    switch (type) {
      case 'select':
        return <Select placeholder='请选择' style={{ width: 160 }}>
          {data.map(item => <Select.Option key={item[dataValue]}>
            {item[dataShow]}
          </Select.Option>)}
        </Select>
      case 'rangePicker':
        return <RangePicker placeholder={['开始时间', '结束时间']} />
      default:
        return <Input placeholder={`请输入`} />
    }
  }
  return (
    <Form layout='inline' className='form-account'>
      {formConfig.map(one => <Form.Item key={one.key} label={one.label}>
        <div style={{ display: 'flex' }}>
          {one.text && <div style={{ minWidth: 32 }}>{one.text[0]}</div>}{getFieldDecorator(one.key, {
            //rules: [{ required: true, message: 'Please input your username!' }],
          })(
            getChildren(one)
          )}&nbsp;&nbsp;{one.text && one.text[1]}
        </div>
      </Form.Item>)}
    </Form>
  )
}

export default Form.create()(AccountForm)
