/**
 * 创建任务-设置预算表单
 */
import React from 'react'
import { Form, Radio, Button, DatePicker, InputNumber } from 'antd'
import debounce from "lodash/debounce";
import moment from "moment";
import numeral from '@/util/numeralExpand'
const FormItem = Form.Item

/**
 * 微信平台
 */
@Form.create()
class BudgetForWeixin extends React.Component {
  constructor(props) {
    super(props);
    this.calculation = debounce(this.calculation, 300)
    this.state = {
      balance: 0,
      actionNum: props.data.budget.actionNum || 0
    }
  }

  componentDidMount() {
    const { data, actions } = this.props
    const { base: { company } } = data
    actions.TPQueryAvailableBalance({
      companyId: company.key,
      accountType: 1
    }).then(({ data }) => {
      this.setState({
        balance: data
      });
    })
  }

  // 暂存 & 上一步
  cached = () => {
    let newVal = Object.assign({}, this.props.form.getFieldsValue())
    newVal.actionNum = this.state.actionNum
    this.props.prev("budget", newVal)
  }

  calculation = (amount, taskOrderType) => {
    if(amount <= 0){
      return this.setState({
        actionNum: 0
      });
    }
    const { data, actions } = this.props
    actions.TPQueryActionNum({
      "amount": amount,
      "taskOrderType": taskOrderType
    }).then(({ data }) => {
      this.setState({
        actionNum: data
      });
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let newVal = Object.assign({}, values)
        newVal.actionNum = this.state.actionNum
        this.props.next("budget", newVal)
      }
    });
  }

  render() {
    const { form, formLayout, data, actions } = this.props
    const { balance, actionNum } = this.state
    const { base, budget } = data
    const { getFieldDecorator, getFieldValue } = form
    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="内容发布位置">
          {getFieldDecorator('taskContentStyle', {
            initialValue: budget.taskContentStyle || 11,
            rules: [{
              required: true,
              message: '请选择发布位置'
            }]
          })(
            <Radio.Group onChange={e => {
              let val = e.target.value
              this.calculation(val, getFieldValue('totalAmount'))
            }}>
              <Radio value={11}>多图文第一条</Radio>
              <Radio value={12}>不限</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="任务预算">
          <div className='flex-form-input-container'>
            {getFieldDecorator('totalAmount', {
              initialValue: budget.totalAmount,
              rules: [{
                required: true,
                message: '请输入任务预算'
              }]
            })(
              <InputNumber
                precision={2}
                min={1}
                max={balance || 999999999}
                step={1000}
                style={{ flex: "auto" }}
                onChange={val => {
                  this.calculation(val, getFieldValue('taskContentStyle'))
                }}
                placeholder="请输入金额"
              />
            )}
            <div className='flex-form-input-suffix'>
              任务账户余额：{numeral(balance).format('0,0.00')} 元
            </div>
          </div>
          <div style={{ height: 28, lineHeight: "28px" }}>预计可获得最低阅读：{actionNum}</div>
        </FormItem>
        <FormItem label="任务结束时间">
          {getFieldDecorator('orderEndDate', {
            initialValue: budget.orderEndDate,
            validateFirst: true,
            rules: [
              { required: true, message: '请选择任务结束时间' },
              {
                validator: (rule, value, callback) => {
                  const date = moment().add(3, 'd')
                  if (value < date) {
                    return callback(`不能选择 ${date.format("YYYY-MM-DD HH:mm:ss")} 之前的时间`)
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
              showToday={false}
            />
          )}
        </FormItem>
        <FormItem label="发布后保留时长">
          <div className='flex-form-input-container'>
            {getFieldDecorator('retainTime', {
              initialValue: budget.retainTime,
              rules: [{
                required: true,
                message: '请选择任务保留时长'
              }]
            })(
              <Radio.Group>
                <Radio value={24}>24小时</Radio>
                <Radio value={48}>48小时</Radio>
              </Radio.Group>
            )}
            <div className='flex-form-input-suffix'>
              规定时间内，文章质检合格，则自动扣款。
            </div>
          </div>
        </FormItem>
        <footer>
          <FormItem label=' '>
            <Button onClick={this.cached}>上一步</Button>
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

  constructor(props) {
    super(props);
    this.calculation = debounce(this.calculation, 300)
    this.state = {
      balance: 0,
      actionNum: props.data.budget.actionNum || 0
    }
  }

  componentDidMount() {
    const { data, actions } = this.props
    const { base: { company } } = data
    actions.TPQueryAvailableBalance({
      companyId: company.key,
      accountType: 1
    }).then(({ data }) => {
      this.setState({
        balance: data
      });
    })
  }

  // 暂存 & 上一步
  cached = () => {
    let newVal = Object.assign({}, this.props.form.getFieldsValue())
    newVal.actionNum = this.state.actionNum
    this.props.prev("budget", newVal)
  }

  calculation = (amount) => {
    if(amount <= 0){
      return this.setState({
        actionNum: 0
      });
    }
    const { data, actions } = this.props
    actions.TPQueryActionNum({
      "amount": amount,
      "taskOrderType": 22
    }).then(({ data }) => {
      this.setState({
        actionNum: data
      });
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let newVal = Object.assign({}, values)
        newVal.actionNum = this.state.actionNum
        this.props.next("budget", newVal)
      }
    });
  }

  render() {
    const { form, formLayout, data, actions } = this.props
    const { balance, actionNum } = this.state
    const { base, budget } = data
    const { getFieldDecorator, getFieldValue, getFieldsValue } = form
    const calculationFactor = getFieldsValue(['taskTarget', 'totalAmount'])
    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="任务目标">
          {getFieldDecorator('taskTarget', {
            initialValue: budget.taskTarget || 21,
            rules: [{
              required: true,
              message: '请选择任务目标'
            }]
          })(
            <Radio.Group onChange={e => {
              let val = e.target.value
              if(val === 22) this.calculation(getFieldValue('totalAmount'))
            }}>
              <Radio value={21}>粉丝覆盖</Radio>
              <Radio value={22}>转发传播</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="任务预算">
          <div className='flex-form-input-container'>
            {getFieldDecorator('totalAmount', {
              initialValue: budget.totalAmount,
              rules: [{
                required: true,
                message: '请输入任务预算'
              }]
            })(
              <InputNumber
                precision={2}
                min={1}
                max={balance || 99999999}
                step={1000}
                style={{ flex: "auto" }}
                onChange={val => {
                  if(getFieldValue('taskTarget') === 22) this.calculation(val)
                }}
                placeholder="请输入金额"
              />
            )}
            <div className='flex-form-input-suffix'>
              任务账户余额：{numeral(balance).format('0,0.00')} 元
            </div>
          </div>
          {
            (calculationFactor.taskTarget === 22 && calculationFactor.totalAmount) ?
              <div style={{
                height: 28,
                lineHeight: "28px"
              }}>最低转发数：{actionNum}</div> : null
          }
        </FormItem>
        <FormItem label=" 博主最少粉丝数">
          {getFieldDecorator('followerCountLimit', {
            initialValue: budget.followerCountLimit,
          })(
            <InputNumber
              precision={0}
              min={0}
              style={{ width: "100%" }}
              step={500}
              max={99999999}
              placeholder="请输入粉丝数"
            />
          )}
        </FormItem>
        <FormItem label="任务结束时间">
          {getFieldDecorator('orderEndDate', {
            initialValue: budget.orderEndDate,
            validateFirst: true,
            rules: [
              { required: true, message: '请选择任务结束时间' },
              {
                validator: (rule, value, callback) => {
                  const date = moment().add(3, 'd')
                  if (value < date) {
                    return callback(`不能选择 ${date.format("YYYY-MM-DD HH:mm:ss")} 之前的时间`)
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
              showToday={false}
            />
          )}
        </FormItem>
        <FormItem label="发布后保留时长">
          <div className='flex-form-input-container'>
            {getFieldDecorator('retainTime', {
              initialValue: budget.retainTime,
              rules: [{
                required: true,
                message: '请选择任务保留时长'
              }]
            })(
              <Radio.Group>
                <Radio value={24}>24小时</Radio>
                <Radio value={48}>48小时</Radio>
              </Radio.Group>
            )}
            <div className='flex-form-input-suffix'>
              规定时间内，文章质检合格，则自动扣款。
            </div>
          </div>
        </FormItem>
        <footer>
          <FormItem label=' '>
            <Button onClick={this.cached}>上一步</Button>
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
