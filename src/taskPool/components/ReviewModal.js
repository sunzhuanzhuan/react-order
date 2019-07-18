/**
 * Created by lzb on 2019-07-18.
 */
import React, { Component } from "react"
import {
  Button,
  Form,
  Modal,
  Radio,
  Select,
  DatePicker,
  InputNumber, Input, Checkbox
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
        setTimeout(() => {
          console.log('Received values of form: ', values, this.props.id);

        }, 100);
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
          {getFieldDecorator('company', {})(
            <DatePicker style={{ width: '100%' }} />
          )}
        </FormItem>
        {platform === 9 && <FormItem label="此刻阅读数">
          {getFieldDecorator('compan222y', {})(
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
          {getFieldDecorator('compan333222y', {})(
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
          {getFieldDecorator('co222mpan222y', {})(
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
          {getFieldDecorator('c123ompan222y', {})(
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
            initialValue: [],
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList
          })(
            <OssUpload
              authToken={this.state.authToken || ''}
              listType='picture-card'
              rule={{
                bizzCode: 'B_GZA_ORDER_IMG_NORMAL_UPLOAD',
                max: 2,
                suffix: 'jpg,jpeg,gif,png'
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
        setTimeout(() => {
          console.log('Received values of form: ', values, this.props.id);

        }, 100);
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
          {getFieldDecorator('compa2ny', {})(
            <Checkbox.Group onChange={(value) => {
              value.length && setTimeout(() => validateFields(['comp3any']),0);
            }}>
              <Checkbox value="A">内容已被删除</Checkbox>
              <p/>
              <Checkbox value="B">内容发布错误</Checkbox>
              <p/>
              <Checkbox value="C">发布账号错误</Checkbox>
            </Checkbox.Group>
          )}
        </FormItem>
        <FormItem label="备注">
          {getFieldDecorator('comp3any', {
            rules: [
              {
                validator: (rule, value, callback) => {
                  let reason = getFieldValue('compa2ny')
                  if(value || (reason && reason.length)){
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
            initialValue: [],
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList
          })(
            <OssUpload
              authToken={this.state.authToken || ''}
              listType='picture-card'
              rule={{
                bizzCode: 'B_GZA_ORDER_IMG_NORMAL_UPLOAD',
                max: 2,
                suffix: 'jpg,jpeg,gif,png'
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
