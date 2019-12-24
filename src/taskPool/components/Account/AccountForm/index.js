import React from 'react'
import { Form, Button } from 'antd'
import accountConfig from '../../../constants/accountConfig'
import KpiForm from './KpiForm'
import FormItem from 'antd/lib/form/FormItem'
import TagItem from './TagItem'
import moment from 'moment'
import SearchForm from '../../../base/SearchForm/index'
const format = 'YYYY-MM-DD'
const formConfig = [
  { label: 'accountID', type: 'input', key: 'accountId' },
  { label: '平台ID', type: 'input', key: 'platformId' },
  { label: '账号名称', type: 'input', key: 'snsName' },
  { label: '主账号名称', type: 'input', key: 'accountName' },
  { label: '审核状态', type: 'select', key: 'auditState', isDefault: true },
  { label: '评估状态', type: 'select', key: 'estimateState', isDefault: true },
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
function AccountForm(props) {
  const { form, searchAction, } = props
  const { getFieldDecorator, resetFields, validateFields } = form
  function onSearch(e) {
    e.preventDefault();
    validateFields((err, values) => {
      const { estimatetime, auditTime } = values.form
      if (auditTime) {
        values.form.auditStartTime = moment(auditTime[0]).format(format)
        values.form.auditEndTime = moment(auditTime[1]).format(format)
      }
      if (estimatetime) {
        values.form.estimateStarttime = moment(estimatetime[0]).format(format)
        values.form.estimateEndtime = moment(estimatetime[1]).format(format)
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
        <Button style={{ marginLeft: 10 }} onClick={onReset}>重置</Button>
      </div>
    </Form>
  )
}

export default Form.create()(AccountForm)
