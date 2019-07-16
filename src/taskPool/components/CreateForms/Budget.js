/**
 * 创建任务-设置预算表单
 */
import React from 'react'
import { Form, Radio, Button, DatePicker, InputNumber } from 'antd'
import moment from "moment";

const FormItem = Form.Item

/**
 * 微信平台
 */
@Form.create()
class BudgetForWeixin extends React.Component {
  state = {}

  componentDidMount() { }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.next()
  }

  render() {

    const { form, formLayout } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="任务预算">
          <div className='flex-form-input-container'>
            {getFieldDecorator('price', {
              rules: [{
                required: true,
                message: '请填写任务预算'
              }]
            })(
              <InputNumber
                precision={0}
                min={0}
                step={1000}
                style={{ flex: "auto" }}
                placeholder="请输入金额"
              />
            )}
            <div className='flex-form-input-suffix'>
              任务账户余额：108,555,555.00元
            </div>
          </div>
          <div style={{ height: 28, lineHeight: "28px" }}>最低转发数：700000</div>
        </FormItem>
        <FormItem label="任务结束时间">
          {getFieldDecorator('pri2222', {
            validateFirst: true,
            rules: [
              { required: true, message: '请选择任务结束时间' },
              {
                validator: (rule, value, callback) => {
                  if (value < moment().add(3, 'd')) {
                    return callback('最早可设置当前时间3天后结束')
                  }
                  callback()
                }
              }
            ]
          })(
            <DatePicker
              placeholder="任务结束时间"
              style={{ width: "100%" }}
              showTime
            />
          )}
        </FormItem>
        <FormItem label="发布后保留时长">
          <div className='flex-form-input-container'>
            {getFieldDecorator('platform', {
              rules: [{
                required: true,
                message: '请选择发布后保留时长'
              }]
            })(
              <Radio.Group>
                <Radio value={1}>24小时</Radio>
                <Radio value={2}>48小时</Radio>
              </Radio.Group>
            )}
            <div className='flex-form-input-suffix'>
              规定时间内，文章质检合格，则自动扣款。
            </div>
          </div>
        </FormItem>
        <footer>
          <FormItem label=' '>
            <Button onClick={this.props.prev}>上一步</Button>
            <Button type="primary" htmlType="submit">下一步</Button>
          </FormItem>
        </footer>
      </Form>
    )
  }
}

/**
 * 微博平台
 */
@Form.create()
class BudgetForWeibo extends React.Component {
  state = {}

  componentDidMount() { }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.next()
  }

  render() {

    const { form, formLayout, data: { base, budget } } = this.props
    const { getFieldDecorator, getFieldValue, getFieldsValue } = form
    const calculationFactor = getFieldsValue(['platforsssm', 'price'])
    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="任务目标">
          {getFieldDecorator('platforsssm', {
            rules: [{
              required: true,
              message: '请选择任务目标'
            }]
          })(
            <Radio.Group>
              <Radio value={1}>粉丝覆盖</Radio>
              <Radio value={2}>转发传播</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="任务预算">
          <div className='flex-form-input-container'>
            {getFieldDecorator('price', {
              rules: [{
                required: true,
                message: '请填写任务预算'
              }]
            })(
              <InputNumber
                precision={0}
                min={0}
                step={1000}
                style={{ flex: "auto" }}
                placeholder="请输入金额"
              />
            )}
            <div className='flex-form-input-suffix'>
              任务账户余额：108,555,555.00元
            </div>
          </div>
          {
            (calculationFactor.platforsssm === 2 && calculationFactor.price) ?
              <div style={{
                height: 28,
                lineHeight: "28px"
              }}>可预计获得最低阅读：700000</div> : null
          }
        </FormItem>
        <FormItem label=" 博主最少粉丝数">
          {getFieldDecorator('pricesss', {})(
            <InputNumber precision={0} min={0} style={{ width: "100%" }} step={500} placeholder="请输入粉丝数" />
          )}
        </FormItem>
        <FormItem label="任务结束时间">
          {getFieldDecorator('pri2222', {
            validateFirst: true,
            rules: [
              { required: true, message: '请选择任务结束时间' },
              {
                validator: (rule, value, callback) => {
                  if (value < moment().add(3, 'd')) {
                    return callback('最早可设置当前时间3天后结束')
                  }
                  callback()
                }
              }
            ]
          })(
            <DatePicker
              placeholder="任务结束时间"
              style={{ width: "100%" }}
              showTime
            />
          )}
        </FormItem>
        <FormItem label="发布后保留时长">
          <div className='flex-form-input-container'>
            {getFieldDecorator('platform', {
              rules: [{
                required: true,
                message: '请选择发布后保留时长'
              }]
            })(
              <Radio.Group>
                <Radio value={1}>24小时</Radio>
                <Radio value={2}>48小时</Radio>
              </Radio.Group>
            )}
            <div className='flex-form-input-suffix'>
              规定时间内，文章质检合格，则自动扣款。
            </div>
          </div>
        </FormItem>
        <footer>
          <FormItem label=' '>
            <Button onClick={this.props.prev}>上一步</Button>
            <Button type="primary" htmlType="submit">下一步</Button>
          </FormItem>
        </footer>
      </Form>
    )
  }
}

export default {
  weixin: BudgetForWeixin,
  weibo: BudgetForWeibo
}
