import React, { useState, useEffect } from 'react'
import { Input, Form, DatePicker, Checkbox, Row, Col } from 'antd';
import { OssUpload } from 'wbyui'
import './ModalContent.less'
import { action, formItemLayout } from "./ModalContent";
//第二次质检不通过
function QualityFailed(props) {
  const [token, setToken] = useState('')
  useEffect(() => {
    action().then(authToken => {
      setToken(authToken)
    })
  }, [])
  const { form } = props
  const { getFieldDecorator } = form
  const options = ['内容已被删除', '内容发布错误', '其他（请备注原因）']
  return <Form layout='horizontal'>
    <Form.Item label='选择原因' {...formItemLayout}>
      {getFieldDecorator('reson', {
        rules: [{ required: true, message: '请选择原因' }],
      })(
        <Checkbox.Group
          options={options}
          className='checkbox-all'
        />
      )}
    </Form.Item>
    <Form.Item label='备注' {...formItemLayout}>
      {getFieldDecorator('read', {
      })(
        <Input placeholder="请输入备注" />
      )}
    </Form.Item>
    <Form.Item label='上传文章快照' {...formItemLayout}>
      {getFieldDecorator('keyss', {
        valuePropName: 'fileList',
        getValueFromEvent: e => e && e.fileList,
        rules: [
          { message: '请上传截图', required: true, type: "array" }
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
const QualityFailedForm = Form.create()(QualityFailed)
export default QualityFailedForm
