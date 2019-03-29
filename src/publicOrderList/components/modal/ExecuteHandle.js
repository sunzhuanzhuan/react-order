/* 执行申请处理 */
import React, { Component } from 'react'
import { Form, message, Modal, Input, Button, Radio } from 'antd';
import PlaceOrderTime from './formItem/PlaceOrderTime'
import MultiAgent from './formItem/MultiAgent'
import SingleAgent from './formItem/SingleAgent'
import * as modalActions from '../../actions/modalActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

class ExecuteHandle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settleType: '1'
    }
  }
  componentWillMount() {
    let orderDetail = this.props.orderDetail
    let settle_type_statistic = orderDetail.public_order.settle_type_statistic
    let agent_id = orderDetail.public_order.agent_id
    let cooperationPlatform = orderDetail.public_order.cooperation_platform_id

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
  //提交-执行处理
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.ttp_place_order_at = values.ttp_place_order_at.format("YYYY-MM-DD HH:mm:ss")
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
  // 改变结算方式
  changeSettleType = (e) => {
    console.log(e.target.value)
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
          <li>预计推广时间： 2019-1-22 19：00：00--2019-1-23 19：00：00</li>
        </ul>
        <FormItem
          label="是否发起预付款申请"
          layout={{
            labelCol: { span: 7 },
            wrapperCol: { span: 17 }
          }}
          style={{ width: '400px' }}
        >
          {getFieldDecorator("settle_type", {
            rules: [{
              required: true, message: '本项为必选项，请选择！',
            }],
            initialValue: '1'
          })(
            <RadioGroup onChange={this.changeSettleType}>
              <Radio value='1'>发起预付</Radio>
              <Radio value='2'>周期付款</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {
          this.state.settleType == '1' ?
            <MultiAgent
              form={form}
              platformId={record.account.platform_id}
              is_agentDetail_initial_loading={false}
            /> : null
        }
        <FormItem
          label="备注"
          layout={{
            labelCol: { span: 10 },
            wrapperCol: { span: 14 }
          }}
          style={{ width: '450px', marginTop: '5px' }}
        >
          <div className="executeHandle-comment">
            <Input disabled={true}
              style={{ width: '400px', border: 'none' }}
              defaultValue="11111111"
            />
            {getFieldDecorator("comment", {
              rules: [{
                pattern: /^.{0,50}$/, message: '最多可输入50个字符！'
              }]
            })(
              <TextArea placeholder="请输入备注"
                autosize={false}
                style={{ width: '400px', border: 'none' }} />
            )}
          </div>
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
)(Form.create()(ExecuteHandle))

