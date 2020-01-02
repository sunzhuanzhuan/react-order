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
function CancelPayment(props) {
  const [token, setToken] = useState('')
  useEffect(() => {
    action().then(authToken => {
      setToken(authToken)
    })
  }, [])
  const { form, id, changeWechatPage, setModalProps, actions } = props
  const { getFieldDecorator, validateFields } = form
  function submitForm() {
    validateFields(async (err, values) => {
      if (!err) {
        let valueNews = { ...values }
        valueNews.snapshotUrl = values.snapshotUrl[0].url
        console.log("TCL: submitForm -> valueNews", valueNews)
        //执行结果取消
        await actions.TPMcnOrderConfirmCancel({ mcnOrderId: id, ...valueNews })
        setModalProps({ visible: false })
        message.success('操作成功')
        changeWechatPage()
      }
    })
  }
  return <Form layout='horizontal'>
    <Form.Item label='填写理由' {...formItemLayout}>
      {getFieldDecorator('orderRemark', {
        rules: [
          { required: true, message: '请填写理由' },
          { max: 20, message: '理由不超过20个字' }
        ],
      })(
        <TextArea placeholder='请填写理由，不超过20个字' />
      )}
    </Form.Item>
    <Form.Item label='上传附件/截图' {...formItemLayout}>
      {getFieldDecorator('snapshotUrl', {
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
            max: 50,
          }}
          len={1}
          tipContent={() => '上传附件/截图的大小不能超过50Mb'}
        />
      )}
    </Form.Item>
    <div className='button-footer'>
      <Button onClick={() => setModalProps({ visible: false })}>取消</Button>
      <Button type='primary' onClick={submitForm}>确定</Button>
    </div>
  </Form >
}
const CancelPaymentForm = Form.create()(CancelPayment)
export default CancelPaymentForm
