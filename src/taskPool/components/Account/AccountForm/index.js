import React from 'react'
import { Form, Button, Tabs } from 'antd'
import accountConfig from '../../../constants/accountConfig'
import KpiForm from './KpiForm'
import FormItem from 'antd/lib/form/FormItem'
import TagItem from './TagItem'
import moment from 'moment'
import SearchForm from '../../../base/SearchForm/index'
import SelectSearch from '../SelectSearch'
const { TabPane } = Tabs;
import './index.less'
const format = 'YYYY-MM-DD'
const formConfig = [
  { label: 'accountID', type: 'inputNumber', key: 'accountId' },
  { label: '账号ID', type: 'input', key: 'snsId' },
  { label: '账号名称', type: 'input', key: 'snsName' },
  { label: '粉丝性别比例', type: 'select', key: 'genderProportion', },
]

const formConfig2 = [
  { label: '审核状态', type: 'select', key: 'auditState', isDefault: true },
  { label: '评估状态', type: 'select', key: 'estimateState', isDefault: true },
  { label: '评估等级', type: 'select', key: 'estimateGrade', },
  { label: '上下架状态', type: 'select', key: 'shelfState', },
  { label: '抢单接单状态', type: 'select', key: 'seckillState', },
  { label: '竞价接单状态', type: 'select', key: 'biddingState', },
  { label: '审核时间', type: 'rangePicker', key: 'auditTime', },
  { label: '评估时间', type: 'rangePicker', key: 'estimatetime', }
]


export const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
}

function AccountTabs(props) {
  const { form, searchAction } = props
  const { resetFields, validateFields } = form
  function onSearch(e) {
    e.preventDefault();
    validateFields((err, values) => {
      console.log("TCL: onSearch -> values", values)
      const { estimatetime, auditTime, identity } = values.form
      let allValues = { ...values }
      if (auditTime) {
        allValues.form.auditStartTime = moment(auditTime[0]).format(format)
        allValues.form.auditEndTime = moment(auditTime[1]).format(format)
        delete allValues.form.auditTime
      }
      if (estimatetime) {
        allValues.form.estimateStarttime = moment(estimatetime[0]).format(format)
        allValues.form.estimateEndtime = moment(estimatetime[1]).format(format)
        delete allValues.form.estimatetime
      }
      if (identity) {
        allValues.form.identityId = values.form.identity.key
      }
      searchAction && searchAction(allValues)
    })
  }
  function onResetForm(value) {
    itemResetForm()
    props.setSelectedTab && props.setSelectedTab(value)
  }
  function itemResetForm() {
    props.onReset && props.onReset()
    resetFields()
  }
  const formProps = {
    ...props.formProps,
    onReset: itemResetForm,
    form,
    onSearch
  }
  return <Form layout='inline' className='use-form-search'>
    <Tabs onChange={onResetForm} type="card" className={'account-tabs'}>
      <TabPane tab="基础信息" key="1">
        <AccountForm {...formProps} />
      </TabPane>
      <TabPane tab="受众信息" key="2">
        <AudienceForm {...formProps} />
      </TabPane>
    </Tabs>
  </Form>
}
export const AccountTabsForm = Form.create()(AccountTabs)

function AccountForm(props) {
  const { form, onSearch, onReset } = props
  const { getFieldDecorator } = form
  return (
    <>
      <SearchForm form={form} formData={accountConfig} formConfig={formConfig} />
      <FormItem label='主账号名称'>
        {getFieldDecorator(`form.identity`, {
          //rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <SelectSearch searchKey='identityName' />
        )}
      </FormItem>
      <SearchForm form={form} formData={accountConfig} formConfig={formConfig2} />
      <div className='button-footer'>
        <Button type='primary' onClick={onSearch}>筛选</Button>
        <Button style={{ marginLeft: 10 }} onClick={onReset}>重置</Button>
      </div>
    </>
  )
}



const audienceConfig = [
  { label: '粉丝数', text: ['大于', '个'], type: 'inputNumber', key: 'followerCount', max: 9999999999 },
  { label: '28天内第一条平均阅读', text: ['高于'], key: 'mediaIndex1AvgReadNum28d' },
  { label: '认证号', type: 'select', key: 'isVerified', },
]

function AudienceForm(props) {
  const { form, onSearch, onReset } = props
  const { getFieldDecorator } = form
  return (
    <>
      <SearchForm form={form} formData={accountConfig} formConfig={audienceConfig} />
      <KpiForm form={form} />
      <FormItem label='常见分类' className='classificationIds-flex' {...formItemLayout}>
        {getFieldDecorator(`form.classificationIds`, {
          //rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <TagItem list={props.orderIndustryCategory} />
        )}
      </FormItem>
      <div className='button-footer'>
        <Button type='primary' onClick={onSearch}>筛选</Button>
        <Button style={{ marginLeft: 10 }} onClick={onReset}>重置</Button>
      </div>
    </>
  )
}


