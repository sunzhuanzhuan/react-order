/* 申请预付款 */
import React, { Component } from 'react'
import { Form, message, Input, Button, DatePicker, Radio } from 'antd';
import MultiAgent from './formItem/MultiAgent'
import * as modalActions from '../../actions/modalActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

class ApplyPrepayment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invoiceType: '1',
      startValue: null,
      endValue: null,
      loading: false
    }
  }
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.promote_ended_at) {
          values.promote_ended_at = values.promote_ended_at.format("YYYY-MM-DD HH:mm:ss")
        }
        if (values.promote_started_at) {
          values.promote_started_at = values.promote_started_at.format("YYYY-MM-DD HH:mm:ss")
        }
        values.order_id = this.props.record.order_id
        values.cooperation_platform_id = values.multiAgentIds[0]
        values.agent_id = values.multiAgentIds[1]
        delete values.multiAgentIds
        this.setState({
          loading: true
        })
        this.props.actions.createPrepayApply({ ...values }).then(() => {
          message.success('您所提交的信息已经保存成功！', 2)
          this.setState({
            loading: false
          })
          this.props.handleCancel()
          this.props.getList()
        }).catch(() => {
          message.error("申请预付款失败")
          this.setState({
            loading: false
          })
        })
      }
    });
  }
  //改变回票方式
  changeReturnInvoiceType = (e) => {
    this.setState({
      invoiceType: e.target.value
    })
  }
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }
  //最大回票金额
  maxReturnInvoiceAmount = (rule, value, callback) => {
    let maxNum = this.props.orderDetail.public_order.public_order_sku_valid.public_cost_price
    if (value > maxNum) {
      callback('请输入不大于三方下单价的有效数字，小数点后最多两位！')
    }
    callback()
  }
  render() {
    const { form, record, orderDetail, handleCancelWithConfirm } = this.props
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
        <MultiAgent
          formLayout={formLayout}
          form={form}
          platformId={record.account.platform_id}
          is_agentDetail_initial_loading={false}
          platformName={orderDetail.platform.platform_name}
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
                }, {
                  validator: this.maxReturnInvoiceAmount
                }]
              })(
                <Input
                  style={{ width: '350px' }}
                  placeholder="请输入回票金额" />
              )}
            </FormItem> :
            <FormItem
              label="回票金额"
              {...formLayout}
            >
              {getFieldDecorator("return_invoice_amount", {
                initialValue: orderDetail.public_order.public_order_sku_valid.public_cost_price
              })(
                <span>{orderDetail.public_order.public_order_sku_valid.public_cost_price}</span>
              )}
            </FormItem>
        }
        <FormItem
          label="预计推广时间"
          {...formLayout}
        >
          {getFieldDecorator("promote_started_at")(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
              onChange={this.onStartChange}
              disabledDate={this.disabledStartDate}
            />
          )}
          <span>-</span>
          {getFieldDecorator("promote_ended_at")(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
              disabledDate={this.disabledEndDate}
              onChange={this.onEndChange}
            />
          )}
        </FormItem>
        <FormItem
          label="备注"
          {...formLayout}
        >
          {getFieldDecorator("comment", {
            rules: [{
              pattern: /^.{0,50}$/, message: '最多可输入50个字！'
            }]
          })(
            <TextArea placeholder="请输入备注"
              style={{ width: '350px' }}
              autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
        {/* 提交按钮 */}
        <div className="modalBox-btnGroup">
          <Button type="primary" onClick={this.submit}
            loading={this.state.loading}
          >提交</Button>
          <Button type="primary"
            className="modalBox-btnGroup-cancel"
            onClick={handleCancelWithConfirm}
            loading={this.state.loading}
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
)(Form.create()(ApplyPrepayment))

