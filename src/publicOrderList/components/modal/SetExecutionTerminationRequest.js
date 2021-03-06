/* 执行终止处理 */
import React, { Component } from 'react'
import { Form, message, Input, Button, Table, Radio } from 'antd';
import * as modalActions from '../../actions/modalActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

class SetExecutionTerminationRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      loading: false
    }
  }
  componentWillMount() {
    let orderDetail = this.props.orderDetail
    let dataSource = []
    if (orderDetail.execution_termination_request.reneger) {
      //申请执行终止
      let termination_reason_str = ""
      let termination_reason = orderDetail.execution_termination_request.termination_reason.split(",")
      let reneger = orderDetail.execution_termination_request.reneger
      orderDetail.termination_reason_list[reneger].forEach(v => {
        if (termination_reason.indexOf((v.value).toString()) != -1) {
          termination_reason_str = v.text + ";" + termination_reason_str
        }
      })
      let obj = {
        operation: "申请执行终止",
        operation_content: [
          {
            key: "违约方",
            value: orderDetail.reneger_list.find(v => v.key == orderDetail.execution_termination_request.reneger).value
          },
          {
            key: "终止原因",
            value: termination_reason_str
          }
        ],
        operator: `${orderDetail.execution_termination_request.requestor_name}（${orderDetail.execution_termination_request.requestor_group}）`,
        operation_time: orderDetail.execution_termination_request.created_at
      }
      dataSource.push(obj)
    }
    if (orderDetail.execution_termination_request.confirmations && orderDetail.execution_termination_request.confirmations.length != 0) {
      //确认执行终止
      let arr = orderDetail.execution_termination_request.confirmations
      arr.forEach(v => {
        let obj = {
          operation: "确认执行终止",
          operation_content: [
            {
              key: "执行终止",
              value: v.status == 1 ? "同意" : "拒绝"
            },
            {
              key: "原因",
              value: v.content
            }
          ],
          operator: `${v.confirmor_name}（${v.confirmor_group}）`,
          operation_time: v.created_at
        }
        dataSource.push(obj)
      })
    }
    this.setState({
      dataSource: [...dataSource]
    })
  }
  //提交-修改三方已下单
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        values.request_id = this.props.orderDetail.execution_termination_request.id
        values.confirmor_type = 8
        this.props.actions.dealExecutionTermination({ ...values }).then(() => {
          message.success('您所提交的信息已经保存成功！', 2)
          this.setState({
            loading: false
          })
          this.props.handleCancel()
          this.props.getList()
        }).catch(() => {
          message.error("执行终止处理失败")
          this.setState({
            loading: false
          })
        })
      }
    });
  }
  render() {
    const { form, orderDetail, handleCancelWithConfirm } = this.props
    const { getFieldDecorator } = form

    const columns = [
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation'
      },
      {
        title: '操作内容',
        dataIndex: 'operation_content',
        key: 'operation_content',
        render: text => {
          return <div>
            {
              text.map(v => {
                return <div key={v.key}>{`${v.key}：${v.value}`}</div>
              })
            }
          </div>
        }
      },
      {
        title: '操作人',
        dataIndex: 'operator',
        key: 'operator'
      },
      {
        title: '操作时间',
        dataIndex: 'operation_time',
        key: 'operation_time'
      }
    ];
    const formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    }
    return <div className="modalBox-singleAgent">
      <Form layout="horizontal">
        <FormItem
          label="需求名称"
          {...formLayout}
        >
          <span>{orderDetail.requirement.name}</span>
        </FormItem>
        <Table
          dataSource={this.state.dataSource}
          columns={columns}
          pagination={false}
        />
        <FormItem
          label="是否在微任务/WEIQ已下单"
          {...formLayout}
        >
          {getFieldDecorator("status", {
            rules: [{
              required: true, message: '本项为必选项，请选择！',
            }]
          })(
            <RadioGroup>
              <Radio value='2'>已下单，拒绝终止</Radio>
              <Radio value='1'>未下单，同意终止</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          label="备注"
          {...formLayout}
        >
          {getFieldDecorator("content", {
            rules: [{
              pattern: /^.{0,100}$/, message: '最多可输入100个字符！'
            }]
          })(
            <TextArea placeholder="请输入备注"
              style={{ width: '350px' }}
              autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
        {/* 提交按钮 */}
        <div className="modalBox-btnGroup">
          <Button type="primary" onClick={this.submit}
            loading={this.state.loading}
          >提交</Button>
          <Button type="primary"
            className="modalBox-btnGroup-cancel"
            onClick={handleCancelWithConfirm}
            loading={this.state.loading}
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

