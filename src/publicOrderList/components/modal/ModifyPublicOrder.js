/* 

*这是修改三方已下单组件

*/
import React, { Component } from 'react'
import { Form } from 'antd';
import api from '../../../api/index'
import PlaceOrderTime from './formItem/PlaceOrderTime'
import MultiAgent from './formItem/MultiAgent'
import * as modalActions from '../../actions/modalActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'

const FormItem = Form.Item;

class ModifyPublicOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }
  componentWillMount() {
    // 获取标为三方已下单详情
    api.get("/trinity/publicOrder/getPublicOrderInfoForModify", {
      params: {
        "public_order_id": this.props.record.public_order.public_order_id
      }
    }).then((res) => {
      let data = res.data
      let agent_id = data.agent_id
      // api.get("/operator-gateway/trinityAgent/v1/getAgentById", {
      //   params: {
      //     id: agent_id
      //   }
      // }).then((res) => {
      //   this.setState({
      //     agentName: res.data.agentName,
      //     agentDetail: res.data
      //   })
      // })
      this.props.actions.getAgent({ platformId: this.props.record.account.platform_id })
      this.props.actions.getAgentDetail({ id: agent_id })
      this.setState({
        data: { ...data }
      })
    })
  }
  render() {
    const { form } = this.props
    const { data } = this.state
    // const { getFieldDecorator } = form
    return <div>
      <Form layout="inline">
        {/* 下单时间 */}
        <PlaceOrderTime
          form={form}
          type="can_modify_public_order"
          id="ttp_place_order_at"
          initialValue="2018-10-10 10:10:10"
        />
        {/* 本单使用平台/代理商 */}
        {
          Object.keys(data).length == 0 ?
            null :
            <MultiAgent
              form={form}
            />
        }
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

