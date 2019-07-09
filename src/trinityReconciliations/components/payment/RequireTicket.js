import React, { Component } from 'react';
import { Row, Col, Form, Radio, InputNumber, Button, message, Input } from "antd";
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import { withRouter } from 'react-router-dom'
import qs from 'qs'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class ListQuery extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showReturnAmount: true,
      disabled: false
    };
  }
  handleSearch = (e) => {
    const search = qs.parse(this.props.location.search.substring(1));
    const { confirmApply, summary_sheet_id, queryData, filterParams, page_size, item } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        if (summary_sheet_id != '') {
          if (values.return_invoice_type == 1) {
            values.return_invoice_amount == item.total_pay_amount
          } else if (values.return_invoice_type == 3) {
            values.return_invoice_amount = 0
          }
          if (values.return_invoice_amount > item.total_pay_amount) {
            message.error('最大值不可大于申请金额，不可为负数，仅可输入数字');
            return
          }
          let params = { summary_sheet_id: summary_sheet_id, ...values, agent_id: search.agent_id };
          confirmApply({ ...params }).then((res) => {
            if (res.code == 200 || res.code == 200) {
              queryData({ ...filterParams, page: 1, page_size: page_size })
              this.props.handleSelectDetail({ summary_sheet_id: '' });
              this.props.form.resetFields();
              message.success('申请成功')
            } else {
              message.error('申请失败');
              this.props.handleSelectDetail({ summary_sheet_id: '' });
              this.props.form.resetFields();
            }
          })
        } else {
          message.error('请选择汇款单名称')
        }

      }
    });
  }
  handleClear = () => {
    this.props.form.resetFields();
    this.props.handleSelectDetail({ summary_sheet_id: '' })
  }
  handleResetForm = () => {
    this.props.form.resetFields();
  }

  handleChoseTypeByReturnInvoice = (e) => {
    if (e.target.value == 1) {
      this.props.form.setFieldsValue({
        return_invoice_amount: this.props.item.total_pay_amount
      })
      this.setState({ disabled: true })
    } else if (e.target.value == 3) {
      this.props.form.setFieldsValue({
        return_invoice_amount: 0
      })
      this.setState({ disabled: true })
    } else {
      this.props.form.setFieldsValue({
        return_invoice_amount: ''
      })
      this.setState({ disabled: false })
    }
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  validator = (rule, value, callback) => {
    const item = this.props.form.getFieldsValue(['return_invoice_type'])
    if (item.return_invoice_type == 2) {
      console.log(item.return_invoice_type)
      if (value == 0) {
        callback('请输入大于0的金额');
        return;
      } else if (value >= this.props.item.total_pay_amount) {
        callback('输入的部分回款金额应小于应实付金额')
        return;
      } else {
        callback()
      }

    } else {
      callback()
    }

  }
  handleBackList = () => {
    this.props.history.push({
      pathname: '/order/publicOrderList'
    })
  }
  render() {
    let { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    return <div>
      <Form>
        <Row style={{ textAlign: 'center', height: '60px' }}>
          <Col span={7}></Col>

          <Col span={8}>
            <FormItem label='回汇票方式' {...formItemLayout}>
              {getFieldDecorator('return_invoice_type', {
                rules: [{ required: true, message: '请输入回票方式' }],

              })(
                <RadioGroup onChange={this.handleChoseTypeByReturnInvoice}>
                  <Radio value={1}>全部回票</Radio>
                  <Radio value={2}>部分回票</Radio>
                  <Radio value={3}>不回票</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
          <Col span={7}></Col>
        </Row>
        <Row style={{ textAlign: 'center', height: '60px' }}>
          <Col span={7}></Col>
          <Col span={10} style={{ textAlign: 'left' }}>
            <FormItem label='回票金额(元)' {...formItemLayout}>
              {getFieldDecorator('return_invoice_amount', {
                rules: [{ required: true, message: '请输入回票金额' },
                { validator: this.validator }]
              })(
                <InputNumber disabled={this.state.disabled} style={{ width: 140 }} decimalSeparator="." precision={2} />
              )}
            </FormItem>
          </Col>
          <Col span={7}></Col>
        </Row>
        <Row style={{ textAlign: 'center', height: '50px' }}>
          <Col span={10}></Col>
          <Col span={7} style={{ textAlign: 'left' }}>
            <Button onClick={this.handleClear}>取消已选</Button>
            <Button type="primary" style={{ margin: '0 20px' }}
              onClick={this.handleSearch}>确认申请</Button>
            <Button onClick={this.handleBackList}>返回列表</Button>
          </Col>
          <Col span={7}></Col>
        </Row>

      </Form>
    </div>;
  }
}
export default Form.create()(withRouter(ListQuery));
