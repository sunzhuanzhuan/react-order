/**
 * Created by lzb on 2019-07-18.
 */
import React, { Component } from "react"
import {
  Form,
  Modal,
  DatePicker,
  InputNumber, Input, Checkbox, message
} from "antd";
import { OssUpload } from "wbyui";

const FormItem = Form.Item
const formLayout = {
  labelCol: { span: 5, offset: 2 },
  wrapperCol: { span: 15 },
  labelAlign: "left",
  colon: false
}

@Form.create()
export class ReviewPass extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    const { actions } = this.props
    // 获取上传图片token
    actions.getNewToken().then(({ data: authToken }) => {
      this.setState({ authToken })
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { actions, id, platform } = this.props
        let newVal = { ...values }
        newVal.snapshotUrl = values.pic[0].url
        newVal.id = id
        newVal.platformId = platform
        delete newVal.pic
        this.setState({ loading: true });
        actions.TPApprovedSuccess(newVal).then(() => {
          message.success('审核成功')
          this.props.cancel()
          this.props.reload()
        }).catch(() => this.setState({ loading: false }))
      }
    });
  }

  render() {
    const { form, platform } = this.props
    const { getFieldDecorator } = form
    return <Modal
      title="审核通过"
      maskClosable={false}
      destroyOnClose
      visible
      okButtonProps={{ loading: this.state.loading }}
      onOk={() => {
        this.handleSubmit()
      }}
      onCancel={this.props.cancel}
    >
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="发布时间">
          {getFieldDecorator('publishedTime', {
            rules: [{
              required: true,
              message: '请填写发布时间'
            }]
          })(
            <DatePicker style={{ width: '100%' }} />
          )}
        </FormItem>
        {platform === 9 && <FormItem label="此刻阅读数">
          {getFieldDecorator('readNumber', {
            rules: [{
              required: true,
              message: '请填写阅读数'
            }]
          })(
            <InputNumber
              step={500}
              precision={0}
              style={{ width: '100%' }}
              placeholder="请输入"
              min={0}
            />
          )}
        </FormItem>}
        {platform === 1 && <FormItem label="点赞数">
          {getFieldDecorator('likeNumber', {
            rules: [{
              required: true,
              message: '请填写点赞数'
            }]
          })(
            <InputNumber
              step={500}
              precision={0}
              style={{ width: '100%' }}
              placeholder="请输入"
              min={0}
            />
          )}
        </FormItem>}
        {platform === 1 && <FormItem label="转发数">
          {getFieldDecorator('transferNumber', {
            rules: [{
              required: true,
              message: '请填写转发数'
            }]
          })(
            <InputNumber
              step={500}
              precision={0}
              style={{ width: '100%' }}
              placeholder="请输入"
              min={0}
            />
          )}
        </FormItem>}
        {platform === 1 && <FormItem label="评论数">
          {getFieldDecorator('commentNumber', {
            rules: [{
              required: true,
              message: '请填写评论数'
            }]
          })(
            <InputNumber
              step={500}
              precision={0}
              style={{ width: '100%' }}
              placeholder="请输入"
              min={0}
            />
          )}
        </FormItem>}
        <FormItem label="截图">
          {getFieldDecorator('pic', {
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList,
            rules: [{
              required: true,
              type: "array",
              message: '请上传截图'
            }]
          })(
            <OssUpload
              authToken={this.state.authToken || ''}
              listType='picture-card'
              rule={{
                bizzCode: 'ORDER_IMG_UPLOAD',
                max: 2,
                suffix: 'png,jpg,jpeg,gif,webp'
              }}
              len={1}
              tipContent=''
            />
          )}
        </FormItem>
      </Form>
    </Modal>
  }
}

@Form.create()
export class ReviewReject extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    const { actions } = this.props
    // 获取上传图片token
    actions.getNewToken().then(({ data: authToken }) => {
      this.setState({ authToken })
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { actions } = this.props
        let newVal = { ...values }
        newVal.snapshotUrl = values.pic[0].url
        newVal.id = this.props.id
        newVal.approveReason = values.approveReason.toString()
        delete newVal.pic
        this.setState({ loading: true });
        actions.TPApprovedFailure(newVal).then(() => {
          message.success('审核成功')
          this.props.cancel()
          this.props.reload()
        }).catch(() => this.setState({ loading: false }))
      }
    });
  }

  render() {
    const { form, platform } = this.props
    const { getFieldDecorator, getFieldValue, validateFields } = form
    return <Modal
      title="审核不通过"
      maskClosable={false}
      destroyOnClose
      visible
      okButtonProps={{ loading: this.state.loading }}
      onOk={() => {
        this.handleSubmit()
      }}
      onCancel={this.props.cancel}
    >
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="选择原因">
          {getFieldDecorator('approveReason', {})(
            <Checkbox.Group onChange={(value) => {
              value.length && setTimeout(() => validateFields(['remark']), 0);
            }}>
              <Checkbox value="内容已被删除">内容已被删除</Checkbox>
              <p />
              <Checkbox value="内容发布错误">内容发布错误</Checkbox>
              <p />
              <Checkbox value="发布账号错误">发布账号错误</Checkbox>
            </Checkbox.Group>
          )}
        </FormItem>
        <FormItem label="备注">
          {getFieldDecorator('remark', {
            rules: [
              {
                validator: (rule, value, callback) => {
                  let reason = getFieldValue('approveReason')
                  if (value || (reason && reason.length)) {
                    return callback()
                  }
                  callback('请选择一个原因或输入其他原因')
                }
              }
            ]
          })(
            <Input.TextArea
              placeholder="请输入其他原因"
              autosize={{
                minRows: 3,
                maxRows: 3
              }}
            />
          )}
        </FormItem>
        <FormItem label="截图">
          {getFieldDecorator('pic', {
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList,
            rules: [{
              required: true,
              type: "array",
              message: '请上传截图'
            }]
          })(
            <OssUpload
              authToken={this.state.authToken || ''}
              listType='picture-card'
              rule={{
                bizzCode: 'ORDER_IMG_UPLOAD',
                max: 2,
                suffix: 'png,jpg,jpeg,gif,webp'
              }}
              len={1}
              tipContent=''
            />
          )}
        </FormItem>
      </Form>
    </Modal>
  }
}
