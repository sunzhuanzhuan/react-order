import React, { useState, useEffect } from 'react'
import { Input, Form, Button, Checkbox, Row, Col, message } from 'antd';
import { OssUpload } from 'wbyui'
import { action, formItemLayout } from "./ModalContent";
//第二次质检不通过
function QualityFailed(props) {
  const [token, setToken] = useState('')
  useEffect(() => {
    action().then(authToken => {
      setToken(authToken)
    })
  }, [])
  const { form, changeWechatPage, id, setModalProps, actions } = props
  const { getFieldDecorator, validateFields } = form
  function submitForm() {
    validateFields(async (err, values) => {
      if (!err) {
        let valueNews = { ...values }
        valueNews.snapshotUrl = values.snapshotUrl[0].url
        valueNews.approveReason = values.approveReason.join(',')
        //二次质检不通过
        await actions.TPApprovedSecondFailure({ id, ...valueNews })
        setModalProps({ visible: false })
        message.success('操作成功')
        changeWechatPage()
      }
    })
  }
  const options = ['内容已被删除', '内容发布错误', '其他（请备注原因）']
  return <Form layout='horizontal'>
    <Form.Item label='选择原因' {...formItemLayout}>
      {getFieldDecorator('approveReason', {
        rules: [{ required: true, message: '请选择原因' }],
      })(
        <Checkbox.Group style={{ width: '100%', marginTop: 12 }}>
          <Row >
            {options.map(one => <Col span={24} key={one}>
              <Checkbox value={one}>{one}</Checkbox>
            </Col>)}
          </Row>
        </Checkbox.Group>
      )}
    </Form.Item>
    <Form.Item label='备注' {...formItemLayout}>
      {getFieldDecorator('remark', {
      })(
        <Input placeholder="请输入备注" />
      )}
    </Form.Item>
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
            bizzCode: 'ORDER_IMG_UPLOAD',
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
const QualityFailedForm = Form.create()(QualityFailed)
export default QualityFailedForm
