import React, { useState, useEffect } from 'react'
import { Input, Form, Button, message, } from 'antd';
import { OssUpload } from 'wbyui'
import { action } from "./ModalContent";
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}
//取消结算
function EditReceipt(props) {
  const [token, setToken] = useState('')
  useEffect(() => {
    action().then(authToken => {
      setToken(authToken)
    })
  }, [])
  const { form, id, changeWechatPage, orderState, setModalProps, actions, contentUrl, platformId = '9' } = props
  const { getFieldDecorator, validateFields } = form
  function submitForm() {
    validateFields(async (err, values) => {
      if (!err) {
        //回执链接调整_质检前修改
        if (orderState == 200) {
          await actions.TPUpdateContentUrl({ id: id, ...values, platformId: platformId })
        }
        //回执链接调整
        else if (orderState == 320) {
          await actions.TPFristFailureUpdateContentUrl({ id: id, ...values, platformId: platformId })
        }
        setModalProps({ visible: false })
        message.success('操作成功')
        changeWechatPage()
      }
    })
  }
  return <Form layout='horizontal'>
    <Form.Item label='回执链接' {...formItemLayout}>
      {getFieldDecorator('contentUrl', {
        initialValue: contentUrl
        // rules: [
        //   { required: true, message: '请填写理由' },
        // ],
      })(
        <Input placeholder='请填写回执链接' />
      )}
    </Form.Item>
    <div className='button-footer'>
      <Button onClick={() => setModalProps({ visible: false })}>取消</Button>
      <Button type='primary' onClick={submitForm}>确定</Button>
    </div>
  </Form >
}
const EditReceiptForm = Form.create()(EditReceipt)
export default EditReceiptForm
