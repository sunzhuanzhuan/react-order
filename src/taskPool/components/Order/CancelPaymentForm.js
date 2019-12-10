import React, { useState, useEffect } from 'react'
import { Input, Form, } from 'antd';
import { OssUpload } from 'wbyui'
import { action, formItemLayout } from "./ModalContent";
const { TextArea } = Input;

//第二次质检不通过
function CancelPayment(props) {
  const [token, setToken] = useState('')
  useEffect(() => {
    action().then(authToken => {
      setToken(authToken)
    })
  }, [])
  const { form } = props
  const { getFieldDecorator } = form
  return <Form layout='horizontal'>
    <Form.Item label='填写理由' {...formItemLayout}>
      {getFieldDecorator('reson', {
        rules: [{ required: true, message: '请填写理由' }],
      })(
        <TextArea />
      )}
    </Form.Item>
    <Form.Item label='上传附件/截图' {...formItemLayout}>
      {getFieldDecorator('keyss', {
        valuePropName: 'fileList',
        getValueFromEvent: e => e && e.fileList,
        rules: [
          // { message: '请上传截图', required: true, type: "array" }
        ]
      })(
        <OssUpload
          authToken={token}
          listType='picture-card'
          rule={{
            bizzCode: 'ORDER_IMG_UPLOAD',
            max: 2,
            suffix: 'png,jpg,jpeg,gif,webp'
          }}
          len={1}
          tipContent={() => '上传图片的大小不能超过2Mb'}
        />
      )}
    </Form.Item>
  </Form >
}
const CancelPaymentForm = Form.create()(CancelPayment)
export default CancelPaymentForm
