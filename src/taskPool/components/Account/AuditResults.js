import React from 'react'
import { Form, Radio, Button } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import TextArea from 'antd/lib/input/TextArea';
import TitleBox from '../../base/TitleBox'
const formLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
}

function AuditResults(props) {
  const { form, accountDetail } = props
  const { getFieldValue, getFieldDecorator } = form
  function submitForm(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        //
      }
    })
  }
  return (
    <div>
      <TitleBox title='审核结果'>
        <Form layout='horizontal'>
          <FormItem label='是否通过审核'{...formLayout}>
            {getFieldDecorator(`auditState`, {
              initialValue: 'auditState',
              rules: [
                { required: true, message: '请选择是否通过审核' }
              ],
            })(
              <Radio.Group >
                <Radio value={3}>通过</Radio>
                <Radio value={2}>未通过</Radio>
              </Radio.Group>
            )}
          </FormItem>
          {getFieldValue('auditState') == 2 ? <FormItem label='不通过类型' {...formLayout}>
            {getFieldDecorator(`refusedType`, {
              initialValue: 'refusedType',
              rules: [
                { required: true, message: '请选择不通过类型' }
              ],
            })(
              <Radio.Group >
                <Radio value={1}>非本人账号</Radio>
                <Radio value={2}>其他</Radio>
              </Radio.Group>
            )}
          </FormItem> : null}
          {getFieldValue('refusedType') == 2 ? <FormItem label='其他原因' {...formLayout}>
            {getFieldDecorator(`remark`, {
              initialValue: '',
              rules: [
                { max: 50, message: '不超过50个字' },
                { required: true, message: '请填写原因' }
              ],
            })(
              <TextArea rows={4} placeholder='请填写原因，不超过50个字' />
            )}
          </FormItem> : null}
        </Form>
        <div className='button-footer'>
          <Button onClick={() => window.open('/order/task/account-manage', "_self")}>返回</Button>
          <Button type='primary' onClick={submitForm}>提交审核</Button>
        </div>
      </TitleBox>
    </div>

  )
}

export default Form.create()(AuditResults)
