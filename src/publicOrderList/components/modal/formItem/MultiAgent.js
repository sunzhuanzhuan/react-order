/*

*多个平台/代理商

*/

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AgentDetail from './AgentDetail'
import { Form, Cascader, Spin, message } from 'antd';
import AddAgent from '../AddAgent'
import * as modalActions from '../../../actions/modalActions'
import './formItem.less'

const FormItem = Form.Item;

class MultiAgent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      is_agentDetail_loading: false,
      initialValue: []
    }
  }
  componentWillMount() {
    // 初始是否加载
    if (this.props.is_agentDetail_initial_loading) {
      this.setState({
        is_agentDetail_loading: true
      })
    }
    // 清空代理商列表和详情
    this.props.actions.resetAgent()
    this.props.actions.resetAgentDetail()
    //获取媒体平台下所有启用合作平台及启用代理商
    this.props.actions.getAgent({ platformId: this.props.platformId }).then(() => {
      if (this.props.agent_id) {
        // 有代理商id的初始值-说明是修改
        this.setState({
          is_agentDetail_loading: true
        })
        this.props.actions.getAgentDetail({ id: this.props.agent_id }).then(() => {
          this.callback()
        }).catch(() => {
          this.callback("代理商详情加载失败")
        })
      } else {
        // 没有代理商id的初始值
        if (this.props.agentList.length == 1 && this.props.agentList[0].agentVOList.length == 1) {
          // 只有一个代理商
          this.setState({
            is_agentDetail_loading: true
          })
          let id = this.props.agentList[0].agentVOList[0].id
          this.setState({
            initialValue: [this.props.agentList[0].id, id]
          })
          this.props.actions.getAgentDetail({ id: id }).then(() => {
            this.callback()
          }).catch(() => {
            this.callback("代理商详情加载失败")
          })
        }
      }
    }).catch(() => {
      message.error("媒体平台下所有启用下单平台及启用代理商加载失败", 2)
    })
  }
  // 代理商详情加载完后的回调函数
  callback = (message) => {
    this.setState({
      is_agentDetail_loading: false
    }, () => {
      message ? message.error(message, 2) : null
    })
  }
  //改变代理商
  handleChange = (value) => {
    this.props.actions.resetAgentDetail()
    this.setState({
      is_agentDetail_loading: true
    })
    let id = value[1]
    //获取该代理商的详情
    this.props.actions.getAgentDetail({ id: id }).then(() => {
      this.callback()
    }).catch(() => {
      this.callback("代理商详情加载失败")
    })
  }
  // 新增代理商成功后
  addAgentSuccessCallback = () => {
    this.props.actions.resetAgentDetail()
    this.props.actions.resetAgent()
    this.props.props.setFieldsValue({ "multiAgentIds": [] })
    this.setState({
      is_agentDetail_loading: true
    })
    this.props.actions.getAgent({ platformId: this.props.platformId }).then(() => {

    })
  }
  //处理数据
  handleData = (data) => {
    return data.map(v => {
      return { ...v, agentName: v.cooperationPlatformName }
    })
  }
  render() {
    const { form, agentList, agentDetail, platformId, formLayout, platformName } = this.props
    const { getFieldDecorator } = form
    const { is_agentDetail_loading, initialValue } = this.state
    let agentDetailInitialValue = this.props.agent_id ? [this.props.cooperationPlatform, this.props.agent_id] :
      initialValue
    return (
      <div>
        <div className="modalBox-singleAgent">
          <FormItem
            label="本单使用平台/代理商"
            {...formLayout}
          >
            {getFieldDecorator("multiAgentIds", {
              rules: [{
                required: true, message: '本项为必选项，请选择！',
              }],
              initialValue: agentDetailInitialValue
            })(
              <Cascader
                fieldNames={{ label: 'agentName', value: 'id', children: 'agentVOList' }}
                options={agentList.length != 0 ? this.handleData(agentList) : []}
                onChange={this.handleChange}
                style={{ width: "300px" }}
                placeholder="请选择本单使用平台/代理商"
              />
            )}
          </FormItem>
          <AddAgent
            platformId={platformId}
            platformName={platformName}
            addAgentSuccessCallback={this.addAgentSuccessCallback}
            type="multi"
          />
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
          Object.keys(agentDetail).length == 0 ?
            null :
            <AgentDetail
              agentDetail={agentDetail}
            />
        }
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    agentDetail: state.publicOrderListReducer.agentDetail,
    agentList: state.publicOrderListReducer.agentList
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
)(MultiAgent)
