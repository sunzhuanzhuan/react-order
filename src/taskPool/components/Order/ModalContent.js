import React, { useState, useEffect } from 'react'
import { Input, Form, DatePicker, Checkbox, Row, Col } from 'antd';
import { OssUpload } from 'wbyui'
import request from '@/api'
import './ModalContent.less'
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
}
export function EditReceipt(props) {
  return (
    <div>
      回执链接:<Input onClick={props.onClick} />
    </div>
  )
}
function action() {
  return request.get('/toolbox-gateway/file/v1/getToken').then(({ data }) => {
    return data
  })
}

const ArticleSnapshot = ({ form, key }) => {
  const [token, setToken] = useState('')
  useEffect(() => {
    action().then(authToken => {
      setToken(authToken)
    })
  }, [])
  return <Form.Item label='上传文章快照' {...formItemLayout}>
    {form.getFieldDecorator([key], {
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
}
//质检异常
function Abnormal(props) {
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
    <ArticleSnapshot form={form} />

  </Form >
}
export const AbnormalForm = Form.create()(Abnormal)
//第二次质检不通过
function QualityFailed(props) {

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
    <ArticleSnapshot form={form} />
  </Form >

}
export const QualityFailedForm = Form.create()(QualityFailed)
