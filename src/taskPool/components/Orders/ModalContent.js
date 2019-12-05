import React from 'react'
import { Input, Form, DatePicker } from 'antd';
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

const ArticleSnapshot = ({ form }) => {
  return <Form.Item label='上传文章快照' {...formItemLayout}>
    {form.getFieldDecorator('atic', {
      rules: [{ required: true, message: '上传文章快照' }],
    })(
      <DatePicker />
    )}
  </Form.Item>
}
