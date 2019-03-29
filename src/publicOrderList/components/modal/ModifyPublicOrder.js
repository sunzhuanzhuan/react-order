/* 

*这是修改三方已下单组件

*/
import React, { Component } from 'react'
import { Form, message, Modal, Input, Button } from 'antd';
import PlaceOrderTime from './formItem/PlaceOrderTime'
import MultiAgent from './formItem/MultiAgent'
import SingleAgent from './formItem/SingleAgent'
import * as modalActions from '../../actions/modalActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'

const FormItem = Form.Item;
const { TextArea } = Input;
const confirm = Modal.confirm;

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
    let agent_id = orderDetail.public_order.agent_id
    let cooperationPlatform = orderDetail.public_order.cooperation_platform_id
    this.setState({
      agent_id: agent_id,
      cooperationPlatform: cooperationPlatform
    })
    if (settle_type_statistic == 1) {
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
  //点击取消
  cancel = () => {
    confirm({
      title: '取消后您的信息将无法保存，是否确认此操作？',
      onOk: () => {
        this.props.handleCancel()
      }
    });
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
        }).catch(() => {
          message.error("修改三方已下单失败")
        })
      }
    });
  }
  render() {
    const { form, record, orderDetail } = this.props
    const { getFieldDecorator } = form
    const { agent_id, cooperationPlatform } = this.state
    return <div>
      <Form layout="inline">
        {/* 下单时间 */}
        <PlaceOrderTime
          form={form}
          type="can_modify_public_order"
          id="ttp_place_order_at"
          initialValue={orderDetail.public_order.ttp_place_order_at}
        />
        {/* 本单使用平台/代理商 */}
        {
          this.state.type == "single" ?
            <SingleAgent
              form={form}
              agent_id={agent_id}
              platformId={record.account.platform_id}
            /> : null
        }
        {
          this.state.type == "multi" ?
            <MultiAgent
              form={form}
              platformId={record.account.platform_id}
              agent_id={agent_id}
              cooperationPlatform={cooperationPlatform}
              is_agentDetail_initial_loading={true}
            /> : null
        }
        <FormItem
          label="三方平台订单号"
          layout={{
            labelCol: { span: 7 },
            wrapperCol: { span: 17 }
          }}
          style={{ width: '450px' }}
        >
          {getFieldDecorator("public_order_id", {
            rules: [{
              pattern: /^[\u4e00-\u9fa5a-zA-Z0-9-_,]{0,100}$/, message: '最多可输入100个字符！'
            }],
            initialValue: "这里是假数据"
          })(
            <Input
              style={{ width: '330px' }}
              placeholder="可以输入多个订单号，多个订单号之间需以,分隔" />
          )}
        </FormItem>
        <FormItem
          label="备注"
          layout={{
            labelCol: { span: 10 },
            wrapperCol: { span: 14 }
          }}
          style={{ width: '450px', marginTop: '5px' }}
        >
          {getFieldDecorator("comment", {
            rules: [{
              pattern: /^.{0,100}$/, message: '最多可输入100个字符！'
            }],
            initialValue: orderDetail.public_order.deal_execution_notification_comment
          })(
            <TextArea placeholder="请输入备注"
              style={{ width: '400px' }}
              autosize={{ minRows: 2, maxRows: 6 }} />
          )}
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
)(Form.create()(ModifyPublicOrder))

