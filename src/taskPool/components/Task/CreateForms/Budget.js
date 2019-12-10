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


const newFormLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 22 },
  labelAlign: "left",
  colon: false
}

const UnitPrice = (props) => {
  const { getFieldDecorator, getFieldValue } = props.form
  const { base, budget } = props.data

  let checked = (getFieldValue('locationLimitedInfo') || []).map((key) => {
    return props.taskPositionList.find(item => key === item.locationKey)
  })

  const calculation = () => {
    const totalAmount = 0
  }

  return (
    <div>
      <FormItem label="设定阅读单价">
        {getFieldDecorator('unitPrice', {
          initialValue: budget.unitPrice || 2,
          rules: [{
            required: true,
            message: '请设定阅读单价'
          }]
        })(
          <Radio.Group>
            <Radio key={1} value={1}>按照发文位置设定</Radio>
            <Radio key={2} value={2}>统一单价</Radio>
          </Radio.Group>
        )}
      </FormItem>
      {
        getFieldValue('unitPrice') === 1 && <div>
          {
            checked.map((item) =>
              <FormItem
                key={item.locationKey}
                {...newFormLayout}
                labelCol={{ span: 3, offset: 4 }}
                wrapperCol={{ span: 16 }}
                label={item.locationValue}
              >
                {getFieldDecorator(`locationLimitedInfo123[${item.locationKey}]`, {
                  initialValue: 0,
                  rules: [{
                    required: true,
                    message: '必填'
                  }]
                })(
                  <InputNumber
                    precision={2}
                    min={0.1}
                    max={200}
                    onChange={val => {
                      this.calculation(val, getFieldValue('locationLimited'))
                    }}
                  />
                )} 元/阅读
              </FormItem>)
          }
          <div style={{ height: 28, lineHeight: "28px" }}>包含冻结服务费
          </div>
        </div>
      }
    </div>
  )
}


/**
 * 微信平台
 */
@Form.create()
class BudgetForWeixin extends React.Component {
  constructor(props) {
    super(props);
    this.calculation = debounce(this.calculation, 300)
    this.state = {
      actionNum: props.data.budget.actionNum || 0,
      defaultOps: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.taskPositionList.length !== prevState.defaultOps.length) {
      return {
        defaultOps: nextProps.taskPositionList.map(item => {
          const { locationKey: value, locationValue: label } = item;
          return { label, value }
        })
      }
    }
    return null
  }


  componentDidMount() {
    const { data, actions, taskPositionList } = this.props
    const { base: { company}, budget } = data;
  }

  // 暂存 & 上一步
  cached = () => {
    let newVal = Object.assign({}, this.props.form.getFieldsValue())
    newVal.actionNum = this.state.actionNum
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
        this.props.next("budget", newVal)
      }
    });
  }

  onCheckChange = (selected) => {
    const newOps = this.state.defaultOps.map((item) => {
      let disabled;
      if(selected.length === 1){
        disabled = item.value === selected[0]
      }else if(selected.length > 1){
        disabled =  !(selected.includes(item.value))
      }

      return {
        ...item,
        disabled
      }
    })

    this.setState({ defaultOps: newOps });
  }

  render() {
    const { form, formLayout, data, actions, balance } = this.props
    const { actionNum, defaultOps } = this.state
    const { base, budget } = data
    const { getFieldDecorator, getFieldValue } = form
    let maxAmount = Math.min(balance, MAX_BUDGET_AMOUNT);
    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <h2>抢单模式</h2>
        <FormItem label="任务预算(元)">
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
                precision={2}
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
              当前任务账户余额：{numeral(balance).format('0,0.00')} 元
            </div>
          </div>
          <div style={{
            height: 28,
            lineHeight: "28px"
          }}>包含冻结服务费{actionNum}元，实际扣款为{actionNum}元
          </div>
        </FormItem>
        <FormItem label="内容发布位置" className='taskPosRadio'>
          {getFieldDecorator('locationLimited', {
            initialValue: budget.locationLimited || 2,
            rules: [{
              required: true,
              message: '请选择发布位置'
            }]
          })(
            <Radio.Group onChange={e => {
              let val = e.target.value
              this.calculation(getFieldValue('totalAmount'), val)
            }}>
              <Radio key={1} value={1}>固定位置</Radio>
              <Radio key={2} value={2}>不限位置</Radio>
            </Radio.Group>
          )}
        </FormItem>
        {
          getFieldValue('locationLimited') === 1 ?
            <FormItem className='taskPosCheckboxComp' {...newFormLayout}>
              <div className='flex-form-input-container'>
                {getFieldDecorator('locationLimitedInfo', {
                  initialValue: budget.locationLimitedInfo || [defaultOps[0].value],
                  rules: [{
                    required: true,
                    message: '请至少选择一项限制调价'
                  }]
                })(
                  <CheckboxGroup onChange={this.onCheckChange} options={defaultOps} />
                )}
                <div className='flex-form-input-suffix'>
                  最多只可选两项
                </div>
              </div>
            </FormItem> : null
        }
        <UnitPrice form={form} data={data} taskPositionList={this.props.taskPositionList} />
        <footer>
          <FormItem label=' '>
            {this.props.isEdit ? null : <Button onClick={this.cached}>上一步</Button>}
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
        <FormItem label="设定阅读单价">
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
            initialValue: base.orderEndDate,
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
                minuteStep: 15,
                format: "hh:mm"
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
