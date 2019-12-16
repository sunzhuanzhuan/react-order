import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { OssUpload } from 'wbyui'
import { action, formItemLayout } from "./WachatList/ModalContent";
const { TextArea } = Input;

function CooperationModel(props) {
  const [token, setToken] = useState('')
  useEffect(() => {
    action().then(authToken => {
      setToken(authToken)
    })
  }, [])
  const { getFieldDecorator } = props.form
  return (
    <Form layout='horizontal'>
      {props.isPrice ? <Form.Item label='合作平台结算金额（元）' {...formItemLayout}>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入合作平台结算金额!' }],
        })(
          <Input placeholder="请输入" />,
        )}
      </Form.Item> : null}
      <Form.Item label='上传执行单' {...formItemLayout}>
        {getFieldDecorator('keyss', {
          valuePropName: 'fileList',
          getValueFromEvent: e => e && e.fileList,
          rules: [
            { message: '请上传执行单', required: true, type: "array" }
          ]
        })(
          <OssUpload
            authToken={token}
            listType='list'
            rule={{
              bizzCode: 'ORDER_IMG_UPLOAD',
              max: 20,
            }}
            len={1}
            tipContent={() => '上传图片的大小不能超过20Mb'}
          />
        )}
      </Form.Item>
      <div className='button-footer'>
        <Button type='primary'>确认</Button>
        <Button>取消</Button>
      </div>
    </Form>

  )
}

export default Form.create()(CooperationModel)

function Reject(props) {
  const { getFieldDecorator } = props.form
  return <Form layout='horizontal'>
    <Form.Item label='驳回原因' {...formItemLayout}>
      {getFieldDecorator('username', {
        rules: [{ required: true, message: '请输入驳回原因!' }],
      })(
        <TextArea placeholder="请输入" rows={4} />,
      )}
    </Form.Item>
    <div className='button-footer'>
      <Button type='primary'>确认</Button>
      <Button>取消</Button>
    </div>
  </Form>
}
export const RejectForm = Form.create()(Reject)


