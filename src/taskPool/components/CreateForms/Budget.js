/**
 * 创建任务-设置预算表单
 */
import React from 'react'
import { Form, Radio, Button, DatePicker, InputNumber, Checkbox } from 'antd'
import debounce from "lodash/debounce";
import moment from "moment";
import numeral from '@/util/numeralExpand'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;

const MAX_BUDGET_AMOUNT = 99999999
const MAX_FOLLOWER_COUNT = 999999999

/**
 * 微信平台
 */
@Form.create()
class BudgetForWeixin extends React.Component {
  constructor(props) {
    super(props);
    this.calculation = debounce(this.calculation, 300)
    this.state = {
      balance: props.data.budget.balance || 0,
      actionNum: props.data.budget.actionNum || 0
    }
    this.defaultOps = null;
  }

  componentDidMount() {
    const { data, actions, taskPositionList } = this.props
    const { base: { company } } = data;
    if(Array.isArray(taskPositionList) && taskPositionList.length)
      this.defaultOps = taskPositionList.map(item => {
        const { locationKey: value, locationValue: label } = item;
        return { label, value }
      })
    actions.TPQueryAvailableBalance({
      companyId: company.key,
      accountType: 1
    }).then(({ data }) => {
      this.setState({
        balance: data
      });
      // window.REACT_APP_CACHE_BALANCE = data
    })
  }

  // 暂存 & 上一步
  cached = () => {
    let newVal = Object.assign({}, this.props.form.getFieldsValue())
    newVal.actionNum = this.state.actionNum
    newVal.balance = this.state.balance
    this.props.prev("budget", newVal)
  }

  calculation = (amount = 0, taskOrderType) => {
    if (isNaN(amount) || amount <= 0) {
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
        newVal.balance = this.state.balance
        this.props.next("budget", newVal)
      }
    });
  }

  getRadioOptions = () => {
    const options = [
      { label: "固定位置", value: 1 },
      { label: "不限位置", value: 2 },
    ]
    const showOps = this.defaultOps ? options : options.filter(item => item.value === 2);
    return showOps.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)
  }

  getCheckOptions = () => {
    const { form } = this.props;
    const checkVal = form.getFieldValue('locationLimitedInfo');
    if(this.defaultOps)
      this.defaultOps.forEach(item => item.disabled = checkVal.length === 2 && !(checkVal.includes(item.value)));
    return this.defaultOps;
  }

  render() {
    const { form, formLayout, data, actions } = this.props
    const { balance, actionNum } = this.state
    const { base, budget } = data
    const { getFieldDecorator, getFieldValue } = form
    const newFormLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 22 },
      labelAlign: "left",
      colon: false
    }
    let maxAmount = Math.min(balance, MAX_BUDGET_AMOUNT);
    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="内容发布位置" className='taskPosRadio'>
          {getFieldDecorator('locationLimited', {
            initialValue: budget.locationLimited || 1,
            rules: [{
              required: true,
              message: '请选择发布位置'
            }]
          })(
            <Radio.Group onChange={e => {
              let val = e.target.value
              this.calculation(getFieldValue('totalAmount'), val)
            }}>
              {
                this.getRadioOptions()
              }
            </Radio.Group>
          )}
        </FormItem>
        {
          getFieldValue('locationLimited') == 1 && this.defaultOps ? 
            <FormItem className='taskPosCheckboxComp' {...newFormLayout}>
              <div className='flex-form-input-container'>
                {getFieldDecorator('locationLimitedInfo', {
                  initialValue: budget.locationLimitedInfo || [],
                  rules: [{
                    required: true,
                    message: '请至少选择一项限制调价'
                  }]
                })(
                  <CheckboxGroup options={this.getCheckOptions()}/>
                )}
                <div className='flex-form-input-suffix'>
                  最多只可选两项
                </div>
              </div>
            </FormItem> : null
        }
        <FormItem label="任务预算">
          <div className='flex-form-input-container'>
            {getFieldDecorator('totalAmount', {
              initialValue: budget.totalAmount,
              validateFirst: true,
              rules: [
                { required: true, message: '请输入任务预算' },
                {
                  validator: (rule, value, callback) => {
                    if (value <= 0) {
                      callback("请输入正确数字")
                    }
                    callback()
                  }
                }
              ]
            })(
              <InputNumber
                precision={0}
                min={1}
                max={maxAmount}
                step={1000}
                style={{ flex: "auto" }}
                onChange={val => {
                  this.calculation(val, getFieldValue('locationLimited'))
                }}
                placeholder="请输入金额"
              />
            )}
            <div className='flex-form-input-suffix'>
              任务账户余额：{numeral(balance).format('0,0.00')} 元
            </div>
          </div>
          <div style={{
            height: 28,
            lineHeight: "28px"
          }}>预计可获得最低阅读：{actionNum}</div>
        </FormItem>
        <FormItem label="任务结束时间">
          {getFieldDecorator('orderEndDate', {
            initialValue: budget.orderEndDate,
            validateFirst: true,
            rules: [
              { required: true, message: '请选择任务结束时间' },
              {
                validator: (rule, value, callback) => {
                  const date = moment().add(7, 'd')
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
              format="YYYY-MM-DD HH:mm"
              defaultPickerValue={moment().add(3, 'd').add(1, 'h').startOf('h')}
              style={{ width: "100%" }}
              showTime={{
                minuteStep:15,
                format:"hh:mm"
              }}
              showToday={false}
            />
          )}
        </FormItem>
        <FormItem label="发布后保留时长">
          <div className='flex-form-input-container'>
            {getFieldDecorator('retainTime', {
              initialValue: budget.retainTime || 24,
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
      balance: props.data.budget.balance || 0,
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
    newVal.balance = this.state.balance
    this.props.prev("budget", newVal)
  }

  calculation = (amount = 0) => {
    if (isNaN(amount) || amount <= 0) {
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
        newVal.balance = this.state.balance
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
    let maxAmount = Math.min(balance, MAX_BUDGET_AMOUNT);

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
              if (val === 22) this.calculation(getFieldValue('totalAmount'))
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
                precision={0}
                min={1}
                max={maxAmount}
                step={1000}
                style={{ flex: "auto" }}
                onChange={val => {
                  if (getFieldValue('taskTarget') === 22) this.calculation(val)
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
            initialValue: budget.followerCountLimit
          })(
            <InputNumber
              precision={0}
              min={1}
              style={{ width: "100%" }}
              step={500}
              max={MAX_FOLLOWER_COUNT}
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
              format="YYYY-MM-DD HH:mm"
              defaultPickerValue={moment().add(3, 'd').add(1, 'h').startOf('h')}
              style={{ width: "100%" }}
              showTime={{
                minuteStep:15,
                format:"hh:mm"
              }}
              showToday={false}
            />
          )}
        </FormItem>
        <FormItem label="发布后保留时长">
          <div className='flex-form-input-container'>
            {getFieldDecorator('retainTime', {
              initialValue: budget.retainTime || 24,
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
