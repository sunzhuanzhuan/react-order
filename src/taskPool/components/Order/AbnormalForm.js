import React, { useState, useEffect } from 'react'
import { Form, DatePicker } from 'antd';
import { OssUpload } from 'wbyui'
import request from '@/api'
import { action, formItemLayout } from "./ModalContent";
//质检异常
function Abnormal(props) {
  const [token, setToken] = useState('')
  useEffect(() => {
    action().then(authToken => {
      setToken(authToken)
    })
  }, [])
  const { isShowRead, form } = props
  const { getFieldDecorator } = form

  return <Form layout='horizontal'>
    <Form.Item label='发文日期' {...formItemLayout}>
      {getFieldDecorator('username', {
        rules: [{ required: true, message: '请添加发文日期' }],
      })(
        <DatePicker showTime placeholder="请添加发文日期" />
      )}
    </Form.Item>
    {
      isShowRead ? <Form.Item label='阅读数' {...formItemLayout}>
        {getFieldDecorator('read', {
          rules: [{ required: true, message: '阅读数' }],
        })(
          <DatePicker showTime placeholder="请输入阅读数" />
        )}
      </Form.Item> : null
    }
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
const AbnormalForm = Form.create()(Abnormal)
export default AbnormalForm
