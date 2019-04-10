/* 

*这是修改三方已下单组件

*/
import React, { Component } from 'react'
import { Form, message, Input, Button } from 'antd';
import PlaceOrderTime from './formItem/PlaceOrderTime'
import MultiAgent from './formItem/MultiAgent'
import SingleAgent from './formItem/SingleAgent'
import * as modalActions from '../../actions/modalActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'

const FormItem = Form.Item;
const { TextArea } = Input;

class ModifyPublicOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "",
      agent_id: "",
      cooperationPlatform: ""
    }
  }
  componentWillMount() {
    let orderDetail = this.props.orderDetail
    let settle_type_statistic = orderDetail.public_order.settle_type_statistic
    let agent_id = orderDetail.public_order.agent_id || undefined
    let cooperationPlatform = orderDetail.public_order.cooperation_platform_id
    this.setState({
      agent_id: agent_id,
      cooperationPlatform: cooperationPlatform
    })
    if (settle_type_statistic == 1 || agent_id) {
      //全为预付型
      this.setState({
        type: 'single'
      })
    } else {
      this.setState({
        type: 'multi'
      })
    }
  }
  //提交-修改三方已下单
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.ttp_place_order_at = values.ttp_place_order_at.format("YYYY-MM-DD HH:mm:ss")
        if (this.state.type == "single") {
          values.ttp_cooperation_platform_id = this.state.cooperationPlatform
          values.agent_id = this.state.agent_id
        } else {
          values.ttp_cooperation_platform_id = values.multiAgentIds[0]
          values.agent_id = values.multiAgentIds[1]
          delete values.multiAgentIds
        }
        this.props.actions.modifyLabelPlaceOrder({ ...values }).then(() => {
          message.success('您所提交的信息已经保存成功！', 2)
          this.props.handleCancel()
          this.props.getList()
        }).catch(() => {
          message.error("修改三方已下单失败")
        })
      }
    });
  }
  render() {
    const { form, record, orderDetail, handleCancelWithConfirm } = this.props
    const { getFieldDecorator } = form
    const { agent_id, cooperationPlatform } = this.state
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
    return <div>
      <Form layout="horizontal">
        {/* 下单时间 */}
        <PlaceOrderTime
          form={form}
          formLayout={formLayout}
          type="can_modify_public_order"
          id="ttp_place_order_at"
          initialValue={orderDetail.public_order.ttp_place_order_at}
        />
        {/* 本单使用平台/代理商 */}
        {
          this.state.type == "single" ?
            <SingleAgent
              form={form}
              formLayout={formLayout}
              agent_id={agent_id}
              platformId={record.account.platform_id}
              platformName={orderDetail.platform.platform_name}
            /> : null
        }
        {
          this.state.type == "multi" ?
            <MultiAgent
              formLayout={formLayout}
              form={form}
              platformId={record.account.platform_id}
              agent_id={agent_id}
              cooperationPlatform={cooperationPlatform}
              is_agentDetail_initial_loading={true}
              platformName={orderDetail.platform.platform_name}
            /> : null
        }
        <FormItem
          label="三方平台订单号"
          {...formLayout}
        >
          {getFieldDecorator("public_order_id", {
            rules: [{
              pattern: /^[\u4e00-\u9fa5a-zA-Z0-9-_,]{0,100}$/, message: '最多可输入100个字符！'
            }],
            initialValue: orderDetail.public_order.ttp_order_id
          })(
            <Input
              style={{ width: '350px' }}
              placeholder="可以输入多个订单号，多个订单号之间需以,分隔" />
          )}
        </FormItem>
        <FormItem
          label="备注"
          {...formLayout}
        >
          {getFieldDecorator("comment", {
            rules: [{
              pattern: /^.{0,100}$/, message: '最多可输入100个字符！'
            }],
            initialValue: orderDetail.public_order.deal_execution_notification_comment
          })(
            <TextArea placeholder="请输入备注"
              style={{ width: '350px' }}
              autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
        {/* 提交按钮 */}
        <div className="modalBox-btnGroup">
          <Button type="primary" onClick={this.submit}>提交</Button>
          <Button type="primary"
            className="modalBox-btnGroup-cancel"
            onClick={handleCancelWithConfirm}
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
)(Form.create()(ModifyPublicOrder))

