/*

*这是标为三方已下单弹框内容组件

*/
import React, { Component } from 'react'
import { Form, Button, message } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActions from '../../actions/modalActions'
import PlaceOrderTime from './formItem/PlaceOrderTime'
import SingleAgent from './formItem/SingleAgent'
import MultiAgent from './formItem/MultiAgent'
import './ModalComponent.less'

class LabelPublicOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: ""
    }
  }
  componentWillMount() {
    // 清空代理商列表和详情
    this.props.actions.resetAgent()
    this.props.actions.resetAgentDetail()
    //获取媒体平台下所有启用合作平台及启用代理商
    this.props.actions.getAgent({ platformId: this.props.record.account.platform_id }).then(() => {
      // 只有一个平台/代理商
      if (this.props.agentList.length == 1 && this.props.agentList[0].agentVOList.length == 1) {
        this.setState({
          type: 'single'
        })
        //获取该代理商的详情
        let id = this.props.agentList[0].agentVOList[0].id
        this.props.actions.getAgentDetail({ id: id }).then(() => {
          console.log(this.props.agentDetail)
        })
      } else {
        this.setState({
          type: 'multi'
        })
      }
    }).catch(() => {
      message.error("该媒体平台下启用合作平台及启用代理商获取失败")
    })
  }
  //提交-标为三方已下单
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { form, handleCancel, agentList, agentDetail, record } = this.props
    return <div className="modalBox">
      <Form layout="inline">
        {/* 下单时间 */}
        <PlaceOrderTime
          form={form}
          type="can_label_place_order"
        />
        {
          this.state.type == "single" ?
            < SingleAgent
              form={form}
              agentId={agentList.length != 0 ? agentList[0].agentVOList[0].id : ""}
              agentName={agentList.length != 0 ? agentList[0].agentVOList[0].agentName : ""}
              agentDetail={Object.keys(agentDetail).length != 0 ? agentDetail : {}}
            /> :
            <MultiAgent
              form={form}
              agentList={agentList}
              platformId={record.account.platform_id}
            />
        }
      </Form>
      {/* 提交按钮 */}
      <div className="modalBox-btnGroup">
        <Button type="primary" onClick={this.submit}>提交</Button>
        <Button type="primary"
          className="modalBox-btnGroup-cancel"
          onClick={handleCancel}
        >取消</Button>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    agentList: state.publicOrderListReducer.agentList,
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
)(Form.create()(LabelPublicOrder))

