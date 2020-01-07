import React, { useState, useEffect } from 'react'
import { Form, DatePicker, Button, message, InputNumber } from 'antd';
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
  const { isShowRead, form, id, changeWechatPage, setModalProps, actions } = props
  const { getFieldDecorator, validateFields } = form
  function submitForm() {
    validateFields(async (err, values) => {
      if (!err) {
        let valueNews = { ...values }
        valueNews.snapshotUrl = values.snapshotUrl[0].url
        if (isShowRead) {
          //二检异常通过
          await actions.TPApprovedSecondSuccess({ id, ...valueNews })
        } else {
          //一检异常通过
          await actions.TPApprovedFirstSuccess({ id, ...valueNews })
        }
        setModalProps({ visible: false })
        message.success('操作成功')
        changeWechatPage()
      }
    })
  }
  return <Form layout='horizontal'>
    <Form.Item label='发文日期' {...formItemLayout}>
      {getFieldDecorator('publishedTime', {
        rules: [{ required: true, message: '请添加发文日期' }],
      })(
        <DatePicker showTime placeholder="请添加发文日期" />
      )}
    </Form.Item>
    {
      isShowRead ? <Form.Item label='阅读数' {...formItemLayout}>
        {getFieldDecorator('readNumber', {
          rules: [{ required: true, message: '阅读数' }],
        })(
          <InputNumber placeholder="请输入阅读数" style={{ width: 195 }} />
        )}
      </Form.Item> : null
    }
    <Form.Item label='上传文章快照' {...formItemLayout}>
      {getFieldDecorator('snapshotUrl', {
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
            bizzCode: 'FWP_TRIP_IMG_UPLOAD',
            max: 2,
            suffix: 'png,jpg,jpeg,gif,webp'
          }}
          len={1}
          tipContent={() => '上传图片的大小不能超过2Mb'}
        />
      )}
    </Form.Item>
    <div className='button-footer'>
      <Button onClick={() => setModalProps({ visible: false })}>取消</Button>
      <Button type='primary' onClick={submitForm}>确定</Button>
    </div>
  </Form >
}
const AbnormalForm = Form.create()(Abnormal)
export default AbnormalForm
