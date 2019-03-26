/*

*这是标为三方已下单弹框内容组件

*/
import React, { Component } from 'react'
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
      singleIds: []
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
          type: 'single',
          singleIds: [this.props.agentList[0].id, this.props.agentList[0].agentVOList[0].id]
        })
        //获取该代理商的详情
        let id = this.props.agentList[0].agentVOList[0].id
        this.props.actions.getAgentDetail({ id: id }).then(() => {
          console.log(this.props.agentDetail)
        })
      } else {
        this.setState({
          type: 'multi',
          singleIds: []
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
    const { form, handleCancel, agentList, agentDetail, record } = this.props
    const { getFieldDecorator } = form
    return <div className="modalBox">
      <Form layout="inline">
        {/* 下单时间 */}
        <PlaceOrderTime
          form={form}
          type="can_label_place_order"
          id="ttp_place_order_at"
        />
        {
          this.state.type == "single" ?
            <SingleAgent
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
        <FormItem
          label="三方平台订单号"
          layout={{
            labelCol: { span: 7 },
            wrapperCol: { span: 17 }
          }}
          style={{ width: '450px' }}
        >
          {getFieldDecorator("public_order_id", {
            rules: [{
              pattern: /^[\u4e00-\u9fa5a-zA-Z0-9-_,]{0,100}$/, message: '最多可输入100个字符！'
            }]
          })(
            <Input
              style={{ width: '330px' }}
              placeholder="可以输入多个订单号，多个订单号之间需以,分隔" />
          )}
        </FormItem>
        <FormItem
          label="备注"
          layout={{
            labelCol: { span: 10 },
            wrapperCol: { span: 14 }
          }}
          style={{ width: '450px' }}
        >
          {getFieldDecorator("comment", {
            rules: [{
              pattern: /^.{0,100}$/, message: '最多可输入100个字符！'
            }]
          })(
            <TextArea placeholder="请输入备注"
              style={{ width: '400px' }}
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

