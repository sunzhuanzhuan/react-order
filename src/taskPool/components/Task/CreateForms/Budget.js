/**
 * 创建任务-设置预算表单
 */
import React from 'react'
import { Form, Radio, Button, DatePicker, InputNumber, Checkbox, Row, Col } from 'antd'
import debounce from "lodash/debounce";
import moment from "moment";
import numeral from '@/util/numeralExpand'
import { node } from 'prop-types';
import { extend } from 'immutability-helper';
import QuestionTip from '@/base/QuestionTip';

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

// 设置单价组件
class UnitPrice extends React.Component {

  state = {
    readNums: [ 0 ]
  }

  calculation = (amount, numObj) => {
    setTimeout(() => {
      amount = amount || this.props.form.getFieldValue('totalAmount')
      numObj = numObj || this.props.form.getFieldValue('locationLimitedInfoUnitPrice')
      if (isNaN(amount) || amount <= 0 || !numObj) {
        return this.setState({
          readNums: [ 0 ]
        });
      }
      let result = Object.values(numObj)
        .sort((a, b) => b - a)
      if (result.length > 2) {
        result = [ result[0], result[result.length - 1] ]
      }
      if (result[0] === result[1]) {
        result = result.slice(0, 1)
      }
      this.setState({
        readNums: result.map(price => numeral(amount).divide(price || 1))
          .map(num => num.format('0,0'))
      });
    }, 0);
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { base, budget } = this.props.data

    let checked = getFieldValue('locationLimited') === 1 ? (getFieldValue('locationLimitedInfo') || []).map(
      (key) => {
        return this.props.taskPositionList.find(item => key === item.locationKey)
      }) : this.props.taskPositionList

    return (
      <div>
        <FormItem label="设定阅读单价">
          {getFieldDecorator('unitPrice', {
            initialValue: budget.unitPrice || 2,
            rules: [ {
              required: true,
              message: '请设定阅读单价'
            } ]
          })(
            <Radio.Group onChange={() => this.calculation()}>
              <Radio key={1} value={1}>按照发文位置设定</Radio>
              <Radio key={2} value={2}>统一单价</Radio>
            </Radio.Group>
          )}
        </FormItem>
        {
          getFieldValue('unitPrice') === 1 &&
          checked.map((item) =>
            <FormItem
              key={item.locationKey}
              {...newFormLayout}
              labelCol={{ span: 3, offset: 4 }}
              wrapperCol={{ span: 16 }}
              label={item.locationValue}
            >
              {getFieldDecorator(`locationLimitedInfoUnitPrice[${item.locationKey}]`, {
                initialValue: (budget.locationLimitedInfoUnitPrice || {})[item.locationKey] || 0.1,
                rules: [ {
                  required: true,
                  message: '必填'
                } ]
              })(
                <InputNumber
                  precision={2}
                  min={0.1}
                  max={200}
                  onChange={val => {
                    this.calculation(getFieldValue('totalAmount'), Object.assign(
                      getFieldValue('locationLimitedInfoUnitPrice'),
                      { [item.locationKey]: val }
                    ))
                  }}
                />
              )} 元/阅读
            </FormItem>)
        }
        {
          getFieldValue('unitPrice') === 2 &&
          <FormItem
            {...newFormLayout}
            labelCol={{ span: 3, offset: 4 }}
            wrapperCol={{ span: 16 }}
            label="统一单价"
          >
            {getFieldDecorator(`locationLimitedInfoUnitPrice.single`, {
              initialValue: (budget.locationLimitedInfoUnitPrice || {}).single || 0.1,
              rules: [ {
                required: true,
                message: '必填'
              } ]
            })(
              <InputNumber
                precision={2}
                min={0.1}
                max={200}
                onChange={val => {
                  this.calculation(getFieldValue('totalAmount'),
                    Object.assign({ single: val }))
                }}
              />
            )} 元/阅读
          </FormItem>
        }
        <Row>
          <Col offset={4}>
            <div style={{ height: 28, lineHeight: "28px" }}>
              预计阅读数为 {this.state.readNums.join("~")}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

// 设定阅读数
class ReadNumber extends React.Component {

  state = {
    unitPrice: [ 0 ]
  }

  calculation = (amount, numObj) => {
    setTimeout(() => {
      amount = amount || this.props.form.getFieldValue('totalAmount')
      numObj = numObj || this.props.form.getFieldValue('locationLimitedInfoReadNumber')
      if (isNaN(amount) || amount <= 0 || !numObj) {
        return this.setState({
          unitPrice: [ 0 ]
        });
      }
      let sum = Object.values(numObj).reduce(function (prev, curr, idx, arr) {
        return prev + curr;
      })
      this.setState({
        unitPrice: numeral(amount).divide(sum).format('0.00')
      });
    }, 0);
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { base, budget } = this.props.data

    let checked = getFieldValue('locationLimited') === 1 ? (getFieldValue('locationLimitedInfo') || []).map(
      (key) => {
        return this.props.taskPositionList.find(item => key === item.locationKey)
      }) : this.props.taskPositionList

    return (
      <div>
        <FormItem label="设定阅读数">
          {getFieldDecorator('unitPrice', {
            initialValue: budget.unitPrice || 2,
            rules: [ {
              required: true,
              message: '请设定阅读单价'
            } ]
          })(
            <Radio.Group onChange={() => this.calculation()}>
              <Radio key={1} value={1}>按照发文位置设定</Radio>
              <Radio key={2} value={2}>不限图文位置</Radio>
            </Radio.Group>
          )}
        </FormItem>
        {
          getFieldValue('unitPrice') === 1 &&
          checked.map((item) =>
            <FormItem
              key={item.locationKey}
              {...newFormLayout}
              labelCol={{ span: 3, offset: 4 }}
              wrapperCol={{ span: 16 }}
              label={item.locationValue}
            >
              {getFieldDecorator(`locationLimitedInfoReadNumber[${item.locationKey}]`, {
                initialValue: (budget.locationLimitedInfoReadNumber || {})[item.locationKey] || 500,
                rules: [ {
                  required: true,
                  message: '必填'
                } ]
              })(
                <InputNumber
                  min={1}
                  step={500}
                  onChange={val => {
                    this.calculation(getFieldValue('totalAmount'), Object.assign(
                      getFieldValue('locationLimitedInfoReadNumber'),
                      { [item.locationKey]: val }
                    ))
                  }}
                />
              )} 阅读
            </FormItem>)
        }
        {
          getFieldValue('unitPrice') === 2 &&
          <FormItem
            {...newFormLayout}
            labelCol={{ span: 3, offset: 4 }}
            wrapperCol={{ span: 16 }}
            label="总阅读数"
          >
            {getFieldDecorator(`locationLimitedInfoReadNumber.single`, {
              initialValue: (budget.locationLimitedInfoReadNumber || {}).single || 500,
              rules: [ {
                required: true,
                message: '必填'
              } ]
            })(
              <InputNumber
                min={1}
                step={500}
                onChange={val => {
                  this.calculation(getFieldValue('totalAmount'),
                    Object.assign({ single: val }))
                }}
              />
            )} 阅读
          </FormItem>
        }
        <Row>
          <Col offset={4}>
            <div style={{ height: 28, lineHeight: "28px" }}>
              预计平均阅读单价为 {this.state.unitPrice} 元/阅读
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}


/**
 * 微信平台
 */
@Form.create()
class BudgetForWeixin extends React.Component {
  constructor(props) {
    super(props);
    this.calculation = debounce(this.calculation, 300)
    const { budget } = props.data

    let defaultCheck = budget.locationLimitedInfo || []

    this.state = {
      actionNum: budget.actionNum || 0,
      amount: budget.totalAmount || 0,
      positionCheck: defaultCheck
    }
  }

  componentDidMount() {
    const { data, actions, taskPositionList } = this.props
    const { budget } = data;
    this.readField.calculation(budget.totalAmount)
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
        actionNum: data,
        amount: amount
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

  getPositionOps = () => {
    return this.props.taskPositionList.map((item) => {
      let disabled;
      if (this.state.positionCheck.length === 1) {
        disabled = item.locationKey === this.state.positionCheck[0]
      } else if (this.state.positionCheck.length > 1) {
        disabled = !(this.state.positionCheck.includes(item.locationKey))
      }

      return {
        label: item.locationValue,
        value: item.locationKey,
        disabled
      }
    })
  }


  render() {
    const { form, formLayout, data, actions, balance } = this.props
    const { actionNum, amount } = this.state
    const { base, budget } = data
    const { getFieldDecorator, getFieldValue } = form
    let maxAmount = Math.min(balance, MAX_BUDGET_AMOUNT);
    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        {base.taskType === "1" && <h2>抢单模式</h2>}
        {base.taskType === "2" && <h2>竞标模式</h2>}
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
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{ flex: "auto" }}
                onChange={val => {
                  this.calculation(val, getFieldValue('locationLimited'))
                  this.readField.calculation(val)
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
          }}>包含冻结服务费{actionNum}元，实际扣款为{amount + actionNum}元
          </div>
        </FormItem>
        <FormItem label="内容发布位置" className='taskPosRadio'>
          {getFieldDecorator('locationLimited', {
            initialValue: budget.locationLimited || 2,
            rules: [ {
              required: true,
              message: '请选择发布位置'
            } ]
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
                  initialValue: budget.locationLimitedInfo || this.state.positionCheck,
                  rules: [ {
                    required: true,
                    message: '请至少选择一项限制调价'
                  } ]
                })(
                  <CheckboxGroup
                    onChange={ary => {
                      this.setState({ positionCheck: ary })
                      this.readField.calculation()
                    }}
                    options={this.getPositionOps()}
                  />
                )}
                <div className='flex-form-input-suffix'>
                  最少选择一项, 最多只可选两项
                </div>
              </div>
            </FormItem> : null
        }
        {base.taskType === "1" && <UnitPrice
          ref={node => this.readField = node}
          form={form}
          data={data}
          taskPositionList={this.props.taskPositionList}
        />}
        {base.taskType === "2" && <ReadNumber
          ref={node => this.readField = node}
          form={form}
          data={data}
          taskPositionList={this.props.taskPositionList}
        />}
        <FormItem label={<div>内容发布位置<QuestionTip content={<div>如果指标设置太高会降低任务曝光率
          <br />请合理设置系数</div>} /></div>}>
          <Row>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('locationww', {
                  initialValue: budget.locationww,
                })(
                  <Checkbox>粉丝量</Checkbox>
                )}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem>
                大于
                {getFieldDecorator('locationw222', {
                  initialValue: budget.locationLimited || 2,
                  rules: [ {
                    required: getFieldValue('locationww'),
                    message: '请选择发布位置'
                  } ]
                })(<InputNumber style={{ margin: "0 10px" }} />)}
                个
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('locationww2', {
                  initialValue: budget.locationww,
                })(
                  <Checkbox>近28天内有发文</Checkbox>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('locationww', {
                  initialValue: budget.locationww,
                })(
                  <Checkbox>28天内第一条平均阅读</Checkbox>
                )}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem>
                高于
                {getFieldDecorator('locationw222', {
                  initialValue: budget.locationLimited || 2,
                  rules: [ {
                    required: getFieldValue('locationww'),
                    message: '请选择发布位置'
                  } ]
                })(<InputNumber style={{ margin: "0 10px" }} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('locationww', {
                  initialValue: budget.locationww,
                })(
                  <Checkbox>粉丝性别比例</Checkbox>
                )}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('locationw222', {
                  initialValue: budget.locationLimited || 2,
                  rules: [ {
                    required: getFieldValue('locationww'),
                    message: '请选择发布位置'
                  } ]
                })(
                  <Radio.Group>
                    <Radio>男性多</Radio>
                    <Radio>女性多</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('locationww', {
                  initialValue: budget.locationww,
                })(
                  <Checkbox>博主领取最低阅读数</Checkbox>
                )}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem>
                不低于
                {getFieldDecorator('locationw222', {
                  initialValue: budget.locationLimited || 2,
                  rules: [ {
                    required: getFieldValue('locationww'),
                    message: '请选择发布位置'
                  } ]
                })(<InputNumber style={{ margin: "0 10px" }} />)}
                个
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('locationww', {
                  initialValue: budget.locationww,
                })(
                  <Checkbox>只允许认证号接单</Checkbox>
                )}
              </FormItem>
            </Col>
          </Row>
        </FormItem>
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
    const calculationFactor = getFieldsValue([ 'taskTarget', 'totalAmount' ])
    let maxAmount = Math.min(balance, MAX_BUDGET_AMOUNT);

    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="任务目标">
          {getFieldDecorator('taskTarget', {
            initialValue: budget.taskTarget || 21,
            rules: [ {
              required: true,
              message: '请选择任务目标'
            } ]
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
              rules: [ {
                required: true,
                message: '请输入任务预算'
              } ]
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
              rules: [ {
                required: true,
                message: '请输入任务预算'
              } ]
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
              rules: [ {
                required: true,
                message: '请选择任务保留时长'
              } ]
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
