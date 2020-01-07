import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { OssUpload } from 'wbyui'
import { action } from "./WechatList/ModalContent";
const { TextArea } = Input;
export const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}
function CooperationModel(props) {
  const [token, setToken] = useState('')
  useEffect(() => {
    action().then(authToken => {
      setToken(authToken)
    })
  }, [])
  const { getFieldDecorator, validateFields } = props.form
  function okFn() {
    validateFields((err, values) => {
      if (!err) {
        const file = values.fileUrl[0]
        const nameKey = props.isPrice == 1 ? 'execOrderName' : 'finalReportName'
        props.okFn && props.okFn({
          operationFlag: props.isPrice ? 1 : 2,
          fileUrl: file.url,
          platformSettlementAmount: values.platformSettlementAmount,
          adOrderId: props.adOrderId,
          [nameKey]: file.name
        })
        props.cancelFn & props.cancelFn()
      }
    });
  }
  return (
    <Form layout='horizontal'>
      {props.isPrice ? <Form.Item label='合作平台结算金额（元）' {...formItemLayout}>
        {getFieldDecorator('platformSettlementAmount', {
          rules: [{ required: true, message: '请输入合作平台结算金额!' }],
        })(
          <Input placeholder="请输入" />,
        )}
      </Form.Item> : null}
      <Form.Item label={`上传${props.isPrice ? '执行单' : '结案报告'}`} {...formItemLayout}>
        {getFieldDecorator('fileUrl', {
          valuePropName: 'fileList',
          getValueFromEvent: e => e && e.fileList,
          rules: [
            { message: `请上传${props.isPrice ? '执行单' : '结案报告'}`, required: true, type: "array" }
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
        <Button type='primary' onClick={okFn}>确认</Button>
        <Button onClick={props.cancelFn}>取消</Button>
      </div>
    </Form>

  )
}

export default Form.create()(CooperationModel)

function Reject(props) {
  const { getFieldDecorator, validateFields } = props.form
  function okFn() {
    validateFields((err, values) => {
      if (!err) {
        props.okFn({ operationFlag: 2, adOrderId: props.adOrderId, ...values })
        props.cancelFn()
      }
    });
  }
  return <Form layout='horizontal'>
    <Form.Item label='驳回原因' {...formItemLayout}>
      {getFieldDecorator('refusalReason', {
        rules: [{ required: true, message: '请输入驳回原因!' }],
      })(
        <TextArea placeholder="请输入" rows={4} />,
      )}
    </Form.Item>
    <div className='button-footer'>
      <Button type='primary' onClick={okFn}>确认</Button>
      <Button onClick={props.cancelFn}>取消</Button>
    </div>
  </Form>
}
export const RejectForm = Form.create()(Reject)


