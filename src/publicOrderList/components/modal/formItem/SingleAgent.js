/*

*本单使用平台/代理商只有一个

*/

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AgentDetail from './AgentDetail'
import { Form, Skeleton } from 'antd';
const FormItem = Form.Item;
const SingleAgent = (props) => {
  const { agentDetail, form, agentName, agentId } = props
  const { getFieldDecorator } = form
  return (
    <div className="modalBox-singleAgent">
      <FormItem
        label="本单使用平台/代理商"
        layout={{
          labelCol: { span: 7 },
          wrapperCol: { span: 17 }
        }}
        style={{ width: '500px' }}
      >
        {getFieldDecorator("agent_id", {
          rules: [{
            required: true, message: '本项为必选项，请选择！',
          }],
          initialValue: { agentId }
        })(
          <span>{agentName}</span>
        )}
      </FormItem>
      {/* 平台/代理商详情 */}
      {
        Object.keys(agentDetail).length != 0 ?
          <AgentDetail agentDetail={agentDetail} /> :
          <Skeleton active />
      }
    </div>
  )
}
const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({

  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleAgent)

