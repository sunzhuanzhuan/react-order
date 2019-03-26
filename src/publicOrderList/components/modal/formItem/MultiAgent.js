/*

*多个平台/代理商

*/

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AgentDetail from './AgentDetail'
import { Form, Cascader } from 'antd';
import AddAgent from '../AddAgent'
import * as modalActions from '../../../actions/modalActions'

const FormItem = Form.Item;

class MultiAgent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  //改变代理商
  handleChange = (value) => {
    let id = value[1]
    //获取该代理商的详情
    this.props.actions.getAgentDetail({ id: id }).then(() => {
      console.log(this.props.agentDetail)
    })
  }
  //处理数据
  handleData = (data) => {
    return data.map(v => {
      return { ...v, agentName: v.cooperationPlatformName }
    })
  }
  render() {
    const { form, agentList, agentDetail, platformId } = this.props
    const { getFieldDecorator } = form
    return (
      <div>
        <div className="modalBox-singleAgent">
          <FormItem
            label="本单使用平台/代理商"
            layout={{
              labelCol: { span: 7 },
              wrapperCol: { span: 17 }
            }}
            style={{ width: '400px', float: 'left' }}
          >
            {getFieldDecorator("agent_id", {
              rules: [{
                required: true, message: '本项为必选项，请选择！',
              }],
              // initialValue: "1"
            })(
              <Cascader
                fieldNames={{ label: 'agentName', value: 'id', children: 'agentVOList' }}
                options={agentList.length != 0 ? this.handleData(agentList) : []}
                onChange={this.handleChange}
                style={{ width: "230px" }}
                placeholder="请选择本单使用平台/代理商"
              />
            )}
          </FormItem>
          <AddAgent platformId={platformId} />
        </div>
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
)(MultiAgent)
