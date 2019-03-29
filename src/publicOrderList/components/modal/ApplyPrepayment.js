/* 申请预付款 */
import React, { Component } from 'react'
import { Form, message, Modal, Input, Button, DatePicker } from 'antd';
import MultiAgent from './formItem/MultiAgent'
import * as modalActions from '../../actions/modalActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'

const FormItem = Form.Item;
const { TextArea } = Input;
const confirm = Modal.confirm;

class ApplyPrepayment extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount() {

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
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        // values.ttp_place_order_at = values.ttp_place_order_at.format("YYYY-MM-DD HH:mm:ss")
        // if (this.state.type == "single") {
        //   values.ttp_cooperation_platform_id = this.state.cooperationPlatform
        //   values.agent_id = this.state.agent_id
        // } else {
        //   values.ttp_cooperation_platform_id = values.multiAgentIds[0]
        //   values.agent_id = values.multiAgentIds[1]
        //   delete values.multiAgentIds
        // }
        // this.props.actions.modifyLabelPlaceOrder({ ...values }).then(() => {
        //   message.success('您所提交的信息已经保存成功！', 2)
        //   this.props.handleCancel()
        // }).catch(() => {
        //   message.error("修改三方已下单失败")
        // })
      }
    });
  }
  render() {
    const { form, record, orderDetail } = this.props
    const { getFieldDecorator } = form
    return <div className="modalBox-singleAgent">
      <Form layout="inline">
        <ul>
          <li>需求名称： 大元客户发布发布</li>
          <li>厂商： 宝洁</li>
          <li>创建需求销售：吴一一</li>
          <li>快接单下单金额（元）： 10000.00</li>
        </ul>
        <MultiAgent
          form={form}
          platformId={record.account.platform_id}
          is_agentDetail_initial_loading={false}
        />
        <FormItem
          label="预计推广时间"
          layout={{
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
          }}
          style={{ width: '500px' }}
        >
          {getFieldDecorator("promote_started_at")(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
          <span>-</span>
          {getFieldDecorator("promote_ended_at")(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>
        <FormItem
          label="备注"
          layout={{
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
          }}
          style={{ width: '500px', marginTop: '5px' }}
        >
          {getFieldDecorator("comment", {
            rules: [{
              pattern: /^.{0,50}$/, message: '最多可输入50个字！'
            }]
          })(
            <TextArea placeholder="请输入备注"
              style={{ width: '400px' }}
              autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
        {/* 提交按钮 */}
        <div className="modalBox-btnGroup">
          <Button type="primary" onClick={this.submit}>提交</Button>
          <Button type="primary"
            className="modalBox-btnGroup-cancel"
            onClick={this.cancel}
          >取消</Button>
        </div>
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
)(Form.create()(ApplyPrepayment))

