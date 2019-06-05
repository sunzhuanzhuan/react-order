/*

*本单使用平台/代理商只有一个

*/

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AgentDetail from './AgentDetail'
import AddAgent from '../AddAgent'
import { Form, Spin, message } from 'antd';
import * as modalActions from '../../../actions/modalActions'
import './formItem.less'
const FormItem = Form.Item;
class SingleAgent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      is_agentDetail_loading: false
    }
  }
  componentWillMount() {
    this.props.actions.resetAgentDetail()
    this.setState({
      is_agentDetail_loading: true
    })
    this.props.actions.getAgentDetail({ id: this.props.agent_id }).then(() => {
      this.setState({
        is_agentDetail_loading: false
      })
    }).catch(() => {
      this.setState({
        is_agentDetail_loading: false
      }, () => { message.error("代理商详情加载失败", 2) })
    })
  }
  render() {
    const { agentDetail, form, platformId, formLayout, platformName, hideAdd } = this.props
    const { getFieldDecorator } = form
    const { is_agentDetail_loading } = this.state
    return (
      <div>
        <div className="modalBox-singleAgent">
          <FormItem
            label="本单使用平台/代理商"
            {...formLayout}
          >
            {getFieldDecorator("agent_id", {
              initialValue: agentDetail.agentId
            })(
              <span>{agentDetail.agentName}</span>
            )}
          </FormItem>
          {hideAdd ? null : <AddAgent platformId={platformId} platformName={platformName} />}
        </div>
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
      </div>
    )
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
)(SingleAgent)

