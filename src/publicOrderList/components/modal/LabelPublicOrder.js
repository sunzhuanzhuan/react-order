/*

*这是标为三方已下单弹框内容组件

*/
import React, { Component } from 'react'
import api from '../../../api/index'
import { Form, Button, message, Input, Modal } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActions from '../../actions/modalActions'
import PlaceOrderTime from './formItem/PlaceOrderTime'
import SingleAgent from './formItem/SingleAgent'
import MultiAgent from './formItem/MultiAgent'
import './ModalComponent.less'

const FormItem = Form.Item;
const { TextArea } = Input;
const confirm = Modal.confirm;

class LabelPublicOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "",
      singleIds: [],
      agent_id: ""
    }
  }
  componentWillMount() {
    let orderDetail = this.props.orderDetail
    let settle_type_statistic = orderDetail.public_order.settle_type_statistic
    if (settle_type_statistic == 1) {
      //全为预付型
      let agent_id = orderDetail.public_order.agent_id
      this.setState({
        type: 'single',
        agent_id: agent_id
      })
    } else {
      this.setState({
        type: 'multi'
      })
    }
  }
  //提交-标为三方已下单
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.ttp_place_order_at = values.ttp_place_order_at.format("YYYY-MM-DD HH:mm:ss")
        if (this.state.type == "single") {
          values.ttp_cooperation_platform_id = this.state.singleIds[0]
          values.agent_id = this.state.singleIds[1]
        } else {
          values.ttp_cooperation_platform_id = values.multiAgentIds[0]
          values.agent_id = values.multiAgentIds[1]
          delete values.multiAgentIds
        }
        this.props.actions.labelPlaceOrder({ ...values }).then(() => {
          message.success('您所提交的信息已经保存成功！', 2)
          this.props.handleCancel()
          this.props.getList()
        }).catch(() => {
          message.error("标记三方已下单失败")
        })
      }
    });
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
  render() {
    const { form, record, orderDetail } = this.props
    const { getFieldDecorator } = form
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
    return <div className="modalBox">
      <Form layout="horizontal">
        {/* 下单时间 */}
        <PlaceOrderTime
          formLayout={formLayout}
          form={form}
          type="can_label_place_order"
          id="ttp_place_order_at"
        />
        {
          this.state.type == "single" ?
            <SingleAgent
              form={form}
              agent_id={this.state.agent_id}
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
              is_agentDetail_initial_loading={false}
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
            }]
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
            }]
          })(
            <TextArea placeholder="请输入备注"
              style={{ width: '350px' }}
              autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
      </Form>
      {/* 提交按钮 */}
      <div className="modalBox-btnGroup">
        <Button type="primary" onClick={this.submit}>提交</Button>
        <Button type="primary"
          className="modalBox-btnGroup-cancel"
          onClick={this.cancel}
        >取消</Button>
      </div>
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
)(Form.create()(LabelPublicOrder))

