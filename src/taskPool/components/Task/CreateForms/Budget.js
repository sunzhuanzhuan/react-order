/**
 * 创建任务-设置预算表单
 */
import React from 'react'
import {
  Form,
  Radio,
  Button,
  DatePicker,
  InputNumber,
  Checkbox,
  Row,
  Col,
  TreeSelect,
  Alert
} from 'antd'
import debounce from "lodash/debounce";
import moment from "moment";
import numeral from '@/util/numeralExpand'
import QuestionTip from '@/base/QuestionTip';
import { CheckGroup } from '@/taskPool/base/CheckGroup';
import {
  wxPositionToFields,
  TRAIN_TYPE_OPTIONS,
  AGES_OPTIONS,
  SEAT_OPTIONS
} from '@/taskPool/constants/config';

const { SHOW_PARENT } = TreeSelect;


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
      numObj = numObj || this.props.form.getFieldsValue(Object.values(wxPositionToFields))
      if (isNaN(amount) || amount <= 0 || !numObj) {
        return this.setState({
          readNums: [ 0 ]
        });
      }
      let result = Object.values(numObj)
        .filter(n => typeof n === 'number')
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

    return checked.length > 0 && (
      <div>
        <FormItem label="设定阅读单价">
          {
            checked.map((item) =>
              <FormItem
                key={item.locationKey}
                {...newFormLayout}
                labelCol={{ span: 4, }}
                wrapperCol={{ span: 20 }}
                label={item.locationValue}
              >
                {getFieldDecorator(wxPositionToFields[item.locationKey], {
                  initialValue: budget[wxPositionToFields[item.locationKey]],
                  rules: [ {
                    required: true,
                    message: '必填'
                  } ]
                })(
                  <InputNumber
                    precision={2}
                    min={0.1}
                    onChange={val => {
                      this.calculation()
                    }}
                  />
                )} 元/阅读
              </FormItem>)
          }
        </FormItem>
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

  componentDidMount() {
    const { base, budget } = this.props.data
    this.calculation(budget.totalAmount)
  }

  calculation = (amount, numObj) => {
    setTimeout(() => {
      amount = amount || this.props.form.getFieldValue('totalAmount')
      numObj = numObj || this.props.form.getFieldsValue(Object.values(wxPositionToFields))
      if (isNaN(amount) || amount <= 0 || !numObj) {
        return this.setState({
          unitPrice: [ 0 ]
        });
      }
      let sum = Object.values(numObj).filter(Boolean).reduce(function (prev, cur) {
        return prev + cur;
      }, 0)
      this.setState({
        unitPrice: numeral(amount).divide(sum || 1).format('0.00')
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

    return checked.length > 0 && (
      <div>
        <FormItem label="设定阅读数">
          {
            checked.map((item) =>
              <FormItem
                key={item.locationKey}
                {...newFormLayout}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                label={item.locationValue}
              >
                {getFieldDecorator(wxPositionToFields[item.locationKey], {
                  initialValue: budget[wxPositionToFields[item.locationKey]],
                  rules: [ {
                    required: true,
                    message: '必填'
                  } ]
                })(
                  <InputNumber
                    min={1}
                    step={500}
                    onChange={val => {
                      this.calculation()
                    }}
                  />
                )} 阅读
              </FormItem>)
          }
        </FormItem>
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
      actionNum: budget.serviceFee || 0,
      amount: budget.totalAmount || 0,
      positionCheck: defaultCheck
    }
  }

  componentDidMount() {
    const { data, actions, taskPositionList } = this.props
    const { budget } = data;
    this.calculation(budget.totalAmount)
  }

  // 暂存 & 上一步
  cached = () => {
    let newVal = Object.assign({}, this.props.form.getFieldsValue())
    newVal.serviceFee = this.state.serviceFee
    newVal.actualPayment = this.state.actualPayment
    newVal.readNums = this.readField.state.readNums
    newVal.unitPrice = this.readField.state.unitPrice
    this.props.prev("budget", newVal)
  }

  calculation = (totalAmount = 0) => {
    if (isNaN(totalAmount) || totalAmount <= 0) {
      return this.setState({
        serviceFee: 0,
        actualPayment: 0
      });
    }
    const { actions } = this.props
    actions.TPWeixinPriceCalculation({ totalAmount })
      .then(({ data }) => {
        this.setState({
          serviceFee: data.serviceFee,
          actualPayment: data.actualPayment
        });
      })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let newVal = Object.assign({}, values)
        newVal.serviceFee = this.state.serviceFee
        newVal.actualPayment = this.state.actualPayment
        newVal.readNums = this.readField.state.readNums
        newVal.unitPrice = this.readField.state.unitPrice
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
        // disabled
      }
    })
  }


  render() {
    const { form, formLayout, data, actions, balance } = this.props
    const { serviceFee, actualPayment } = this.state
    const { base, budget } = data
    const { getFieldDecorator, getFieldValue } = form
    let maxAmount = Math.min(balance, MAX_BUDGET_AMOUNT);
    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        {base.taskPattern === 1 && <h2>抢单模式</h2>}
        {base.taskPattern === 2 && <h2>竞标模式</h2>}
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
          }}>包含冻结服务费{serviceFee}元，实际扣款为{actualPayment}元
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
            <Radio.Group>
              <Radio value={1}>固定位置</Radio>
              <Radio value={2}>不限位置</Radio>
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
                    validator: (rule, value, callback) => {
                      if (value && value.length > 0 && value.length < 3) {
                        callback()
                      }
                      callback("发布位置最少选择一项, 最多只可选两项")
                    }
                  } ]
                })(
                  <CheckboxGroup
                    style={{ paddingBottom: 6 }}
                    onChange={ary => {
                      this.setState({ positionCheck: ary })
                      this.readField.calculation()
                    }}
                    options={this.getPositionOps()}
                  />
                )}
                {/*<div className='flex-form-input-suffix'>
                  最少选择一项, 最多只可选两项
                </div>*/}
              </div>
            </FormItem> : null
        }
        {base.taskPattern === 1 && <UnitPrice
          ref={node => this.readField = node}
          form={form}
          data={data}
          taskPositionList={this.props.taskPositionList}
        />}
        {base.taskPattern === 2 && <ReadNumber
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
                {getFieldDecorator('_followerCountLimit', {
                  initialValue: budget._followerCountLimit,
                  valuePropName: 'checked'
                })(
                  <Checkbox>粉丝量</Checkbox>
                )}
              </FormItem>
            </Col>
            {getFieldValue('_followerCountLimit') && <Col span={7}>
              <FormItem>
                大于
                {getFieldDecorator('followerCountLimit', {
                  initialValue: budget.followerCountLimit,
                  rules: [ {
                    required: true,
                    message: '请填写限制数量'
                  } ]
                })(<InputNumber min={1} style={{ margin: "0 10px" }} />)}
                个
              </FormItem>
            </Col>}
          </Row>
          <Row>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('mediaCountLimit', {
                  initialValue: budget.mediaCountLimit,
                  valuePropName: 'checked'
                })(
                  <Checkbox>近28天内有发文</Checkbox>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('_mediaAvgReadNumLimit', {
                  initialValue: budget._mediaAvgReadNumLimit,
                  valuePropName: 'checked'
                })(
                  <Checkbox>28天内第一条平均阅读</Checkbox>
                )}
              </FormItem>
            </Col>
            {getFieldValue('_mediaAvgReadNumLimit') && <Col span={7}>
              <FormItem>
                高于
                {getFieldDecorator('mediaAvgReadNumLimit', {
                  initialValue: budget.mediaAvgReadNumLimit,
                  rules: [ {
                    required: true,
                    message: '请填写限制数量'
                  } ]
                })(<InputNumber min={1} style={{ margin: "0 10px" }} />)}
              </FormItem>
            </Col>}
          </Row>
          <Row>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('_followerGenderRatioLimit', {
                  initialValue: budget._followerGenderRatioLimit,
                  valuePropName: 'checked'
                })(
                  <Checkbox>粉丝性别比例</Checkbox>
                )}
              </FormItem>
            </Col>
            {getFieldValue('_followerGenderRatioLimit') && <Col span={7}>
              <FormItem>
                {getFieldDecorator('followerGenderRatioLimit', {
                  initialValue: budget.followerGenderRatioLimit,
                  rules: [ {
                    required: true,
                    message: '请选择'
                  } ]
                })(
                  <Radio.Group>
                    <Radio value={1}>男性多</Radio>
                    <Radio value={2}>女性多</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>}
          </Row>
          <Row>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('_minNumOfReadLimit', {
                  initialValue: budget._minNumOfReadLimit,
                  valuePropName: 'checked'
                })(
                  <Checkbox>博主领取最低阅读数</Checkbox>
                )}
              </FormItem>
            </Col>
            {getFieldValue('_minNumOfReadLimit') && <Col span={7}>
              <FormItem>
                不低于
                {getFieldDecorator('minNumOfReadLimit', {
                  initialValue: budget.minNumOfReadLimit,
                  rules: [ {
                    required: true,
                    message: '请填写限制数量'
                  } ]
                })(<InputNumber min={1} style={{ margin: "0 10px" }} />)}
                个
              </FormItem>
            </Col>}
          </Row>
          <Row>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('onlyVerified', {
                  initialValue: budget.onlyVerified,
                  valuePropName: 'checked'
                })(
                  <Checkbox>只允许认证号接单</Checkbox>
                )}
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <footer>
          <FormItem label=' '>
            {this.props.isUpdate ? null : <Button onClick={this.cached}>上一步</Button>}
            <Button type="primary" htmlType="submit">下一步</Button>
          </FormItem>
        </footer>
      </Form>
    )
  }
}

/**
 * 12306平台
 */
@Form.create()
class BudgetFor12306 extends React.Component {
  constructor(props) {
    super(props);
    const { budget } = props.data
    this.calculation = debounce(this.calculation, 300)

    this.state = {
      result: budget.result || {
        unitPrice: 0,
        totalAmount: 0,
        discount: 0,
        actualPayment: 0,
      },
      treeData: [],
    }
  }

  getTreeNode = (list = []) => {
    return list.map(item => ({
      id: item.id,
      pId: item.parentId,
      value: item.id,
      title: item.areaName,
      isLeaf: item.areaLevel === 2,
    }))
  };

  onLoadData = treeNode => {
    const { data, actions, taskPositionList } = this.props
    const { id } = treeNode.props;
    return actions.getAsyncAreaList({ pid: id }).then(({ data }) => {
      this.setState({
        treeData: this.state.treeData.concat(this.getTreeNode(data)),
      });
    })
  }

  componentDidMount() {
    const { actions } = this.props
    // 获取初始城市列表
    actions.getAsyncAreaList().then(({ data }) => {
      this.setState({
        treeData: this.state.treeData.concat(this.getTreeNode(data)),
      });
    })
  }

  // 暂存 & 上一步
  cached = () => {
    let newVal = Object.assign({}, this.props.form.getFieldsValue())
    newVal.result = this.state.result
    newVal.treeData = this.state.treeData
    this.props.prev("budget", newVal)
  }


  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let newVal = Object.assign({}, values)
        newVal.result = this.state.result
        newVal.treeData = this.state.treeData
        this.props.next("budget", newVal)
      }
    });
  }

  calculation = () => {
    setTimeout(() => {
      const values = this.props.form.getFieldsValue([
        "putType",
        "mediaType",
        "actionNum",
        "actionDay",
        "leavePlace",
        "arrivePlace",
        "deliverySex",
        "deliverySeat",
        "deliveryAges",
        "deliveryTrainType",
      ])
      if (!values.actionNum) return
      const { actions } = this.props
      actions.TPTripPriceCalculation(values).then(({ data }) => {
        this.setState({ result: data });
      })
    }, 0);
  }

  render() {
    const { form, formLayout, data, actions, balance } = this.props
    const { result } = this.state
    const { base, budget } = data
    const { getFieldDecorator, getFieldValue } = form

    const treeProps = {
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      treeData: this.state.treeData,
      treeDataSimpleMode: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      style: {
        width: '100%',
      },
      loadData: this.onLoadData
    }

    // 按量投放
    const PA = getFieldValue("putType") === 1
    // 按天数投放
    const PB = getFieldValue("putType") === 2

    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="投放模式">
          {getFieldDecorator('putType', {
            initialValue: budget.putType || 2,
            rules: [ {
              required: true,
              message: '请选择投放模式'
            } ]
          })(
            <Radio.Group onChange={this.calculation}>
              <Radio value={2}>按天数投放</Radio>
              <Radio value={1}>按量投放</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="内容类型">
          {getFieldDecorator('mediaType', {
            initialValue: budget.mediaType || 3,
            rules: [ {
              required: true,
              message: '请选择内容类型'
            } ]
          })(
            <Radio.Group onChange={this.calculation}>
              <Radio value={3}>图文+链接+视频</Radio>
              <Radio value={4}>图文+链接</Radio>
            </Radio.Group>
          )}
        </FormItem>
        {PB && <FormItem label="输入投放天数">
          <div className='flex-form-input-container'>
            {getFieldDecorator('actionDay', {
              initialValue: budget.actionDay,
              validateFirst: true,
              rules: [
                { required: true, message: '请输入投放天数' },
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
                style={{ flex: "auto" }}
                onChange={this.calculation}
                placeholder="输入投放天数"
              />
            )}
            <span style={{ margin: "0 10px" }}>天</span>
            <div className='flex-form-input-suffix'>
              任务账户余额：{numeral(balance).format('0,0.00')} 元
            </div>
          </div>
        </FormItem>}
        {PA && <FormItem label="输入投放条数">
          <div className='flex-form-input-container'>
            {getFieldDecorator('actionNum', {
              initialValue: budget.actionNum,
              validateFirst: true,
              rules: [
                { required: true, message: '请输入投放条数' },
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
                style={{ flex: "auto" }}
                step={100}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={this.calculation}
                placeholder="输入投放条数"
              />
            )}
            <span style={{ margin: "0 10px" }}>条</span>
            <div className='flex-form-input-suffix'>
              任务账户余额：{numeral(balance).format('0,0.00')} 元
            </div>
          </div>
        </FormItem>}
        <FormItem label="出发城市">
          {getFieldDecorator('leavePlace', {
            initialValue: budget.leavePlace,
            validateFirst: true,
            rules: [
              { required: true, message: '请选择出发城市', type: 'array' },
            ]
          })(
            <TreeSelect {...treeProps} searchPlaceholder="请选择出发城市" onChange={() => {
              PA && this.calculation()
            }} />
          )}
        </FormItem>
        <FormItem label="到达城市">
          {getFieldDecorator('arrivePlace', {
            initialValue: budget.arrivePlace,
            validateFirst: true,
            rules: [
              { required: true, message: '请选择到达城市', type: 'array' },
            ]
          })(
            <TreeSelect {...treeProps} searchPlaceholder="请选择到达城市" onChange={() => {
              PA && this.calculation()
            }} />
          )}
        </FormItem>
        {PA && <FormItem label="车次类型">
          {getFieldDecorator('deliveryTrainType', {
            initialValue: budget.deliveryTrainType,
          })(
            <CheckGroup options={TRAIN_TYPE_OPTIONS} onChange={() => {
              PA && this.calculation()
            }} />
          )}
        </FormItem>}
        {PA && <FormItem label="坐席类型" wrapperCol={{ span: 20 }}>
          {getFieldDecorator('deliverySeat', {
            initialValue: budget.deliverySeat,
          })(
            <CheckGroup options={SEAT_OPTIONS} onChange={() => {
              PA && this.calculation()
            }} />
          )}
        </FormItem>}
        {PA && <FormItem label="人群性别">
          {getFieldDecorator('deliverySex', {
            initialValue: budget.deliverySex || 0,
          })(
            <Radio.Group onChange={() => {
              PA && this.calculation()
            }}>
              <Radio value={0}>全部</Radio>
              <Radio value={10}>男</Radio>
              <Radio value={11}>女</Radio>
            </Radio.Group>
          )}
        </FormItem>}
        {PA && <FormItem label="是否限定年龄">
          {getFieldDecorator('_deliveryAges', {
            initialValue: budget._deliveryAges || 2,
          })(
            <Radio.Group onChange={(e) => {
              e.target.value === 1 && this.calculation()
            }}>
              <Radio value={2}>否</Radio>
              <Radio value={1}>是</Radio>
            </Radio.Group>
          )}
        </FormItem>}
        {getFieldValue("_deliveryAges") === 1 &&
        <FormItem label="配置年龄区间" wrapperCol={{ span: 20 }} onChange={() => {
          PA && this.calculation()
        }}>
          {getFieldDecorator('deliveryAges', {
            initialValue: budget.deliveryAges,
            rules: [
              { type: 'array', max: 4, message: '最多不超过4项' }
            ]
          })(
            <Checkbox.Group options={AGES_OPTIONS} />
          )}
        </FormItem>}
        <Alert
          message={`投放单价为${result.unitPrice}元/条，原价${result.totalAmount}元，折扣返现${result.discount}元，实付${result.actualPayment}元`} />
        <footer>
          <FormItem label=' '>
            {this.props.isUpdate ? null : <Button onClick={this.cached}>上一步</Button>}
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
  weibo: BudgetForWeibo,
  12306: BudgetFor12306
}
