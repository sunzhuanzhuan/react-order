import React from 'react'
import { Form, Input, Select, DatePicker, Button } from 'antd'
import './index.less'
import accountConfig from '../../../constants/accountConfig'
import KpiForm from './KpiForm'
import FormItem from 'antd/lib/form/FormItem'
import TagItem from './TagItem'
const { RangePicker } = DatePicker;
const formConfig = [
  { label: 'accountID', type: 'input', key: 'accountId' },
  { label: '平台ID', type: 'input', key: 'platformId' },
  { label: '账号名称', type: 'input', key: 'snsName' },
  { label: '主账号名称', type: 'input', key: 'accountName' },
  { label: '审核状态', type: 'select', key: 'auditState', },
  { label: '评估状态', type: 'select', key: 'estimateState', },
  { label: '评估等级', type: 'select', key: 'estimateGrade', },
  { label: '上下架状态', type: 'select', key: 'shelfState', },
  { label: '抢单接单状态', type: 'select', key: 'seckillState', },
  { label: '竞价接单状态', type: 'select', key: 'biddingState', },
  { label: '审核时间', type: 'rangePicker', key: 'auditTime', },
  { label: '评估时间', type: 'rangePicker', key: 'estimatetime', },
  { label: '粉丝数', text: ['大于', '个'], key: 'followerCount' },
  { label: '28天内第一条平均阅读', text: ['高于'], key: 'mediaIndex1AvgReadNum28d' },
  { label: '粉丝性别比例', type: 'select', key: 'genderProportion', },
  { label: '认证号', type: 'select', key: 'isVerified', },
]
const formReceive = [
  { label: 'accountID', type: 'input', key: 'accountId' },
  { label: '平台ID', type: 'input', key: 'platformId' },
  { label: '账号名称', type: 'input', key: 'snsName' },
  { label: '主账号名称', type: 'input', key: 'accountName' },
  { label: '资源媒介经理', type: 'input', key: 'accountName' },
  { label: '提交时间', type: 'rangePicker', key: 'submitTime', },
]
function AccountForm(props) {
  const { isReceive, form } = props
  const { getFieldDecorator, resetFields, validateFields } = form
  function onSearch(e) {
    e.preventDefault();
    validateFields((err, values) => {

      console.log("TCL: onSearch -> values", values)

    })
  }
  function reset() {
    resetFields()
  }
  function getChildren({ type, key, dataShow = 'name', dataValue = 'value' }) {
    switch (type) {
      case 'select':
        return <Select placeholder='请选择' style={{ width: 130 }} allowClear>
          {accountConfig[key].map(item => <Select.Option key={item[dataValue]}>
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
      {(isReceive ? formReceive : formConfig).map(one => <Form.Item key={one.key} label={one.label}>
        <div style={{ display: 'flex' }}>
          {one.text && <div style={{ minWidth: 32 }}>{one.text[0]}</div>}{getFieldDecorator(`form.${one.key}`, {
            //rules: [{ required: true, message: 'Please input your username!' }],
          })(
            getChildren(one)
          )}&nbsp;&nbsp;{one.text && one.text[1]}
        </div>
      </Form.Item>)}
      {isReceive
        ? <>
          <Button type='primary' onClick={onSearch}>筛选</Button>
          <Button style={{ marginLeft: 10 }}>重置</Button></>
        : <>
          <KpiForm form={form} />
          <div>
            <FormItem label='常见分类'>
              {getFieldDecorator(`form.classificationIds`, {
                //rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <TagItem />
              )}
            </FormItem>
          </div>
          <div className='button-footer'>
            <Button type='primary' onClick={onSearch}>筛选</Button>
            <Button style={{ marginLeft: 10 }}>重置</Button>
          </div>
        </>}

    </Form>
  )
}

export default Form.create()(AccountForm)
