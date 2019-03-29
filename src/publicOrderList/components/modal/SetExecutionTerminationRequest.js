/* 执行终止处理 */
import React, { Component } from 'react'
import { Form, message, Modal, Input, Button, Table, Radio } from 'antd';
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

class SetExecutionTerminationRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {

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
  //提交-修改三方已下单
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
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
    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];
    return <div className="modalBox-singleAgent">
      <Form layout="inline">
        <ul>
          <li>需求名称： 大元客户发布发布</li>
        </ul>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
        <FormItem
          label="是否在微任务/WEIQ已下单"
          layout={{
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
          }}
          style={{ width: '500px' }}
        >
          {getFieldDecorator("operate_type", {
            rules: [{
              required: true, message: '本项为必选项，请选择！',
            }],
            initialValue: '1'
          })(
            <RadioGroup>
              <Radio value='1'>已下单，拒绝终止</Radio>
              <Radio value='2'>未下单，同意终止</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          label="备注"
          layout={{
            labelCol: { span: 10 },
            wrapperCol: { span: 14 }
          }}
          style={{ width: '450px', margin: '5px auto', display: 'block' }}
        >
          {getFieldDecorator("comment", {
            rules: [{
              pattern: /^.{0,100}$/, message: '最多可输入100个字符！'
            }]
          })(
            <TextArea placeholder="请输入备注"
              style={{ width: '300px' }}
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
)(Form.create()(SetExecutionTerminationRequest))

