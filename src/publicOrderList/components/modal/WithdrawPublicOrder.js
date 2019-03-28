/*

*这是撤销三方已下单组件

*/
import React, { Component } from 'react'
import api from '../../../api/index'
import * as modalActions from '../../actions/modalActions'
import { Skeleton, Button, message } from 'antd';
import AgentDetail from './formItem/AgentDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'

class WithdrawPublicOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      agentName: "",
      agentDetail: {}
    }
  }
  componentWillMount() {
    api.get("/trinity/publicOrder/getPublicOrderInfoForModify", {
      params: {
        "public_order_id": this.props.record.public_order.public_order_id
      }
    }).then((res) => {
      let data = res.data
      let agent_id = data.agent_id
      api.get("/operator-gateway/trinityAgent/v1/getAgentById", {
        params: {
          id: agent_id
        }
      }).then((res) => {
        this.setState({
          agentName: res.data.agentName,
          agentDetail: res.data
        })
      })
      this.setState({
        data: { ...data }
      })
    })
  }
  //撤销三方已下单
  submit = () => {
    this.props.actions.withdrawLabelPlaceOrder({
      public_order_id: this.props.record.public_order.public_order_id
    }).then(() => {
      this.props.handleCancel()
    }).catch(() => {
      message.error("撤销三方已下单操作失败", 2)
    })
  }
  render() {
    const { data, agentName, agentDetail } = this.state
    const { handleCancel } = this.props
    return <div className="withdrawPublicOrder">
      {
        Object.keys(data).length != 0 ?
          <ul>
            <li>下单时间：{data.ttp_place_order_at}</li>
            <li>本单使用平台/代理商：{agentName == "" ? "-" : agentName}</li>
            <AgentDetail
              agentDetail={agentDetail}
            />
            <li>三方订单号：{data.ttp_order_id}</li>
            <li>备注：{data.comment}</li>
          </ul> : <Skeleton active />
      }
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

