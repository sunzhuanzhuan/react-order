/*
 * @Descripttion: 
 * @Author: wangxinyue
 * @Date: 2020-01-15 16:32:16
 * @LastEditors  : wangxinyue
 * @LastEditTime : 2020-02-03 14:34:52
 */
import React from 'react';
import { Descriptions, Button, Form, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const AccountComments = (props) => {
  const { accountEstimateDetails = {}, form, accountId, actions } = props
  const {
    estimateGrade,
    contentEstimateTotalScore,
    effectEstimateScore,
    estimateDescribe
  } = accountEstimateDetails
  function submitForm(e) {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        //账号评语提交
        actionsUpdate({ ...values, accountId: accountId })
      }
    })
  }

  async function actionsUpdate(params) {
    await actions.TPUpdateAccountEstimateDescribe(params)
    message.success('操作成功')
    await actions.TPGetAccountEstimateDetails({ accountId: accountId })
  }
  return <Form layout='horizontal' style={{ marginTop: 40 }}>
    <Descriptions>
      <Descriptions.Item label="账号等级">{estimateGrade}</Descriptions.Item>
      <Descriptions.Item label="内容评估（总分30）">{contentEstimateTotalScore}</Descriptions.Item>
      <Descriptions.Item label="效果评估（总分10）">{effectEstimateScore}</Descriptions.Item>
    </Descriptions>
    <Form.Item label='账号评语' >
      {form.getFieldDecorator(`estimateDescribe`, {
        initialValue: estimateDescribe,
        rules: [
          { max: 100, message: '不超过100个字' },
          { required: true, message: '请填写账号评语' }
        ],
      })(
        <TextArea rows={4} placeholder='请填写账号评语，不超过100个字' disabled={estimateDescribe} />
      )}
    </Form.Item>
    <div className='button-footer'>
      <Button onClick={() => window.open('/order/task/account-manage', "_self")}>返回</Button>
      <Button type='primary' key={estimateDescribe} onClick={submitForm} disabled={estimateDescribe}>提交</Button>
    </div>
  </Form>
}
const AccountCommentsForm = Form.create()(AccountComments)
export default AccountCommentsForm
