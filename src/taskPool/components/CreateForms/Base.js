/**
 * 创建任务-基本信息表单
 */
import React from 'react'
import { Form, Radio, Button, Cascader } from 'antd'
import RemoteSearchSelect from "@/taskPool/base/RemoteSearchSelect";
import { InputCount } from "@/base/Input";
import { WBYPlatformIcon } from "wbyui";

const FormItem = Form.Item

@Form.create()
export default class Base extends React.Component {
  state = {}

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let newVal = Object.assign({}, values)
        this.props.next("base", newVal)
      }
    });
  }

  render() {

    const { form, formLayout, data, actions } = this.props
    const { base } = data
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
            <RemoteSearchSelect
              action={actions.TPFuzzyQueryCompany}
              placeholder="请选择任务所属公司"
              disabled={data.disabled}
            />
          )}
        </FormItem>
        <FormItem label="任务发布平台">
          {getFieldDecorator('platformId', {
            initialValue: base.platformId,
            rules: [{
              required: true,
              message: '请选择平台'
            }]
          })(
            <Radio.Group>
              <Radio value={9}>
                <WBYPlatformIcon weibo_type={9} widthSize={22} />
                <span style={{
                  verticalAlign: 'text-bottom',
                  marginLeft: 8,
                  userSelect: 'none'
                }}>微信公众号</span>
              </Radio>
              <Radio value={1}>
                <WBYPlatformIcon weibo_type={1} widthSize={22} />
                <span style={{
                  verticalAlign: 'text-bottom',
                  marginLeft: 8,
                  userSelect: 'none'
                }}>新浪微博</span>
              </Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="任务名称">
          {getFieldDecorator('orderName', {
            initialValue: base.orderName,
            rules: [
              { required: true, message: '请输入任务名称', whitespace: true },
              { max: 20, message: '任务名称不大于20字' }
            ]
          })(
            <InputCount max={20} placeholder="请输入任务名称" />
          )}
        </FormItem>
        <FormItem label="行业分类">
          {getFieldDecorator('industry', {
            initialValue: base.industry,
            rules: [{
              required: true,
              message: '请选择行业',
              type: 'array'
            }]
          })(
            <Cascader
              fieldNames={{ label: 'itemValue', value: 'itemKey', children: 'childrenList' }}
              options={data.industryList}
              placeholder='请选择行业'
            />
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
