/*

*这是撤销三方已下单组件

*/
import React, { Component } from 'react'
import * as modalActions from '../../actions/modalActions'
import { Button, message, Spin, Form } from 'antd';
import SingleAgent from './formItem/SingleAgent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'
import './formItem/formItem.less'

const FormItem = Form.Item;

class WithdrawPublicOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      agentName: "",
      agentDetail: {},
      is_agentDetail_loading: true,
      agent_id: ''
    }
  }
  componentWillMount() {
    let orderDetail = this.props.orderDetail
    let agent_id = orderDetail.public_order.agent_id
    this.setState({
      agent_id: agent_id,
      is_agentDetail_loading: false
    })
  }
  //撤销三方已下单
  submit = () => {
    this.props.actions.withdrawLabelPlaceOrder({
      public_order_id: this.props.record.public_order.public_order_id
    }).then(() => {
      message.success('您所提交的信息已经保存成功！', 2)
      this.props.handleCancel()
      this.props.getList()
    }).catch(() => {
      message.error("撤销三方已下单操作失败", 2)
    })
  }
  render() {
    const { orderDetail, record, form, handleCancelWithConfirm } = this.props
    const { is_agentDetail_loading } = this.state
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
    return <div className="withdrawPublicOrder">
      <Form layout="horizontal">
        <FormItem
          label="下单时间"
          {...formLayout}
        >
          <span>{orderDetail.public_order.ttp_place_order_at}</span>
        </FormItem>
        {/* 是否加载中 */}
        {
          is_agentDetail_loading ?
            <div className="multiAgent-agentDetail-loading">
              <Spin />
            </div> : <SingleAgent
              formLayout={formLayout}
              form={form}
              agent_id={this.state.agent_id}
              platformId={record.account.platform_id}
              platformName={orderDetail.platform.platform_name}
            />
        }
        <FormItem
          label="三方订单号"
          {...formLayout}
        >
          <span>{orderDetail.public_order.ttp_order_id}</span>
        </FormItem>
        <FormItem
          label="备注"
          {...formLayout}
        >
          <span>{orderDetail.public_order.label_place_order_comment}</span>
        </FormItem>
      </Form>
      <div className="withdrawPublicOrder-tips">是否要撤销三方已下单的标识？</div>
      <div className="modalBox-btnGroup">
        <Button type="primary" onClick={this.submit}>确定撤销</Button>
        <Button type="primary"
          className="modalBox-btnGroup-cancel"
          onClick={handleCancelWithConfirm}
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
)(Form.create()(WithdrawPublicOrder))

