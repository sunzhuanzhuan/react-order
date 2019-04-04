/* 执行申请处理 */
import React, { Component } from 'react'
import { Form, message, Modal, Input, Button, Radio, InputNumber } from 'antd';
import PlaceOrderTime from './formItem/PlaceOrderTime'
import MultiAgent from './formItem/MultiAgent'
import SingleAgent from './formItem/SingleAgent'
import * as modalActions from '../../actions/modalActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

class ExecuteHandle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settleType: '1',
      invoiceType: '1'
    }
  }
  componentWillMount() {
    let orderDetail = this.props.orderDetail
    let settle_type_statistic = orderDetail.public_order.settle_type_statistic
    let agent_id = orderDetail.public_order.agent_id
    let cooperationPlatform = orderDetail.public_order.cooperation_platform_id
  }
  //点击取消
  cancel = () => {
    confirm({
      title: '取消后您的信息将无法保存，是否确认此操作？',
      onOk: () => {
        this.props.handleCancel()
      }
    });
  }
  //提交-执行处理
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.settleType == '1') {
          values.cooperation_platform_id = values.multiAgentIds[0]
          values.agent_id = values.multiAgentIds[1]
          delete values.multiAgentIds
        }
        values.order_id = this.props.record.order_id
        this.props.actions.dealExecutionNotificationApply({ ...values }).then(() => {
          message.success('您所提交的信息已经保存成功！', 2)
          this.props.handleCancel()
          this.props.getList()
        }).catch(() => {
          message.error("执行处理失败")
        })
      }
    });
  }
  // 改变结算方式
  changeSettleType = (e) => {
    this.setState({
      settleType: e.target.value
    })
  }
  //改变回票方式
  changeReturnInvoiceType = (e) => {
    this.setState({
      invoiceType: e.target.value
    })
  }
  render() {
    const { form, record, orderDetail } = this.props
    const { getFieldDecorator } = form
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
    return <div className="modalBox-singleAgent">
      <Form layout="horizontal">
        <FormItem
          label="需求名称"
          {...formLayout}
        >
          <span>{orderDetail.requirement.name}</span>
        </FormItem>
        <FormItem
          label="厂商"
          {...formLayout}
        >
          <span>{orderDetail.requirement.company.name}</span>
        </FormItem>
        <FormItem
          label="创建需求销售"
          {...formLayout}
        >
          <span>{orderDetail.requirement.sale_manager_info.real_name}</span>
        </FormItem>
        <FormItem
          label="快接单下单金额（元）"
          {...formLayout}
        >
          <span>{orderDetail.public_order.public_order_sku_valid.public_cost_price}</span>
        </FormItem>
        <FormItem
          label="预计推广时间"
          {...formLayout}
        >
          <span>{`${orderDetail.public_order.promote_started_at}-${orderDetail.public_order.promote_ended_at}`}</span>
        </FormItem>
        <FormItem
          label="是否发起预付款申请"
          {...formLayout}
        >
          {getFieldDecorator("settle_type", {
            rules: [{
              required: true, message: '本项为必选项，请选择！',
            }],
            initialValue: '1'
          })(
            <RadioGroup onChange={this.changeSettleType}>
              <Radio value='1'>发起预付</Radio>
              <Radio value='2'>周期付款</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {
          this.state.settleType == '1' ?
            <div>
              <MultiAgent
                formLayout={formLayout}
                form={form}
                platformId={record.account.platform_id}
                is_agentDetail_initial_loading={false}
              />
              <FormItem
                label="回票方式"
                {...formLayout}
              >
                {getFieldDecorator("return_invoice_type", {
                  rules: [{
                    required: true, message: '本项为必选项，请选择！',
                  }],
                  initialValue: '1'
                })(
                  <RadioGroup onChange={this.changeReturnInvoiceType}>
                    <Radio value='1'>全部回票</Radio>
                    <Radio value='2'>部分回票</Radio>
                    <Radio value='3'>不回票</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              {
                this.state.invoiceType == '2' ?
                  <FormItem
                    label="回票金额"
                    {...formLayout}
                  >
                    {getFieldDecorator("return_invoice_amount", {
                      rules: [{
                        required: true, message: '本项为必填项，请输入！',
                      }, {
                        pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: '请输入不大于三方下单价的有效数字，小数点后最多两位！'
                      }]
                    })(
                      <InputNumber
                        style={{ width: '350px' }}
                        max={parseFloat(orderDetail.public_order.public_order_sku_valid.public_cost_price)}
                        placeholder="请输入回票金额" />
                    )}
                  </FormItem> :
                  <FormItem
                    label="回票金额"
                    {...formLayout}
                  >
                    <span>{orderDetail.public_order.public_advance_payment_apply.return_invoice_amount}</span>
                  </FormItem>
              }
            </div>
            : null
        }
        <FormItem
          label="备注"
          {...formLayout}
        >
          <div className="executeHandle-comment">
            <Input disabled={true}
              style={{ width: '400px', border: 'none' }}
              defaultValue={orderDetail.public_order.execution_notification_comment}
            />
            {getFieldDecorator("comment", {
              rules: [{
                pattern: /^.{0,50}$/, message: '最多可输入50个字符！'
              }]
            })(
              <TextArea placeholder="请输入备注"
                autosize={false}
                style={{ width: '350px', border: 'none' }} />
            )}
          </div>
        </FormItem>
        {/* 提交按钮 */}
        <div className="modalBox-btnGroup">
          <Button type="primary" onClick={this.submit}>提交</Button>
          <Button type="primary"
            className="modalBox-btnGroup-cancel"
            onClick={this.cancel}
          >取消</Button>
        </div>
      </Form>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...modalActions
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ExecuteHandle))

