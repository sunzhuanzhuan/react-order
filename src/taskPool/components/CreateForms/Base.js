/**
 * 创建任务-基本信息表单
 */
import React from 'react'
import { Form, Radio, Button, Select } from 'antd'
import RemoteSearchSelect from "@/taskPool/base/RemoteSearchSelect";
import { InputCount } from "@/base/Input";
import { WBYPlatformIcon } from "wbyui";

const FormItem = Form.Item


@Form.create()
export default class Base extends React.Component {
  state = {}

  componentDidMount() { }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.next()
    // this.props.form.validateFields()
  }

  render() {

    const { form, formLayout, data: { base } } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="任务所属公司">
          {getFieldDecorator('company', {
            initialValue: base.company,
            rules: [{
              required: true,
              message: '请选择任务所属公司'
            }]
          })(
            <RemoteSearchSelect placeholder="请选择任务所属公司" disabled />
          )}
        </FormItem>
        <FormItem label="任务发布平台">
          {getFieldDecorator('platform', {
            initialValue: base.platformId,
            rules: [{
              required: true,
              message: '请选择任务所属公司'
            }]
          })(
            <Radio.Group>
              <Radio value={9}>
                <WBYPlatformIcon weibo_type={9} widthSize={22} />
                <span style={{verticalAlign: 'text-bottom', marginLeft: 8, userSelect: 'none'}}>微信公众号</span>
              </Radio>
              <Radio value={1}>
                <WBYPlatformIcon weibo_type={1} widthSize={22} />
                <span style={{verticalAlign: 'text-bottom', marginLeft: 8, userSelect: 'none'}}>新浪微博</span>
              </Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="任务名称">
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '请填写任务名称' },
              { max: 20, message: '最多输入20个字' }
            ]
          })(
            <InputCount max={20} placeholder="请输入任务名称" />
          )}
        </FormItem>
        <FormItem label="行业分类">
          {getFieldDecorator('class', {
            rules: [{
              required: true,
              message: '请选择任务所属公司'
            }]
          })(
            <Select placeholder='请选择行业分类'>
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
            </Select>
          )}
        </FormItem>
        <footer>
          <FormItem label=' '>
            <Button type="primary" htmlType="submit">下一步</Button>
          </FormItem>
        </footer>
      </Form>
    )
  }
}
