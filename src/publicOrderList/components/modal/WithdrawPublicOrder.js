/*

*这是撤销三方已下单组件

*/
import React, { Component } from 'react'
import api from '../../../api/index'
import * as modalActions from '../../actions/modalActions'
import { Button, message, Spin } from 'antd';
import AgentDetail from './formItem/AgentDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'
import './formItem/formItem.less'

class WithdrawPublicOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      agentName: "",
      agentDetail: {},
      is_agentDetail_loading: true
    }
  }
  componentWillMount() {
    let orderDetail = this.props.orderDetail
    let agent_id = orderDetail.public_order.agent_id
    this.props.actions.getAgentDetail({ id: agent_id }).then(() => {
      this.setState({
        is_agentDetail_loading: false
      })
    }).catch(() => {
      this.setState({
        is_agentDetail_loading: false
      }, () => { message.error("代理商详情加载失败", 2) })
    })
  }
  //撤销三方已下单
  submit = () => {
    this.props.actions.withdrawLabelPlaceOrder({
      public_order_id: this.props.record.public_order.public_order_id
    }).then(() => {
      message.success('您所提交的信息已经保存成功！', 2)
      this.props.handleCancel()
    }).catch(() => {
      message.error("撤销三方已下单操作失败", 2)
    })
  }
  render() {
    const { orderDetail, agentDetail } = this.props
    const { is_agentDetail_loading } = this.state
    const { handleCancel } = this.props
    return <div className="withdrawPublicOrder">
      <ul>
        <li>下单时间：{orderDetail.public_order.ttp_place_order_at}</li>
        <li style={{ marginTop: '5px' }}>本单使用平台/代理商：{Object.keys(agentDetail).length != 0 ? "-" : agentDetail.agentName}</li>
        {/* 是否加载中 */}
        {
          is_agentDetail_loading ?
            <div className="multiAgent-agentDetail-loading">
              <Spin />
            </div> : null
        }
        {/* 平台/代理商详情 */}
        {
          Object.keys(agentDetail).length != 0 ?
            <AgentDetail agentDetail={agentDetail} /> :
            null
        }
        <li style={{ marginTop: '5px' }}>三方订单号：这是假数据</li>
        <li style={{ marginTop: '5px' }}>备注：{orderDetail.public_order.deal_execution_notification_comment}</li>
      </ul>
      <div className="withdrawPublicOrder-tips">是否要撤销三方已下单的标识？</div>
      <div className="modalBox-btnGroup">
        <Button type="primary" onClick={this.submit}>确定撤销</Button>
        <Button type="primary"
          className="modalBox-btnGroup-cancel"
          onClick={() => handleCancel()}
        >取消</Button>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    agentDetail: state.publicOrderListReducer.agentDetail
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
)(WithdrawPublicOrder)

