import React, { useState, useEffect } from 'react'
import { Form, Input, Button, InputNumber } from 'antd'
import { OssUpload } from 'wbyui'
import { action } from "./WechatList/ModalContent";
const { TextArea } = Input;
export const formItemLayout = {
  labelCol: { span: 9 },
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
  const { fileName, fileUrl, item } = props
  const defaultFile = fileUrl ? [{
    uid: '-1',
    name: fileName,
    status: 'done',
    url: fileUrl,
  }] : []
  return (
    <Form layout='horizontal'>
      {props.isPrice ? <Form.Item label='合作平台结算金额（元）' {...formItemLayout}>
        {getFieldDecorator('platformSettlementAmount', {
          initialValue: item.platformSettlementAmount,
          rules: [
            { required: true, message: '请输入合作平台结算金额!' },
            { max: 13, message: '最大输入13位数字!' },
            { pattern: '^[0-9]*$', message: '请输入数字' }
          ],
        })(
          <Input placeholder="请输入" />,
        )}
      </Form.Item> : null}
      <Form.Item label={`上传${props.isPrice ? '执行单' : '结案报告'}`} {...formItemLayout}>
        {getFieldDecorator('fileUrl', {
          valuePropName: 'fileList',
          initialValue: defaultFile,
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
        props.okFn({ operationFlag: 2, adOrderIds: props.adOrderId, ...values })
        props.cancelFn()
      }
    });
  }
  return <Form layout='horizontal'>
    <Form.Item label='驳回原因'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
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


