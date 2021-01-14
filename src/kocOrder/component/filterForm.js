import React from 'react'
import { Row, Form, Select, Input, Button, DatePicker, message, Col } from 'antd'
import qs from 'qs'
import moment from 'moment';
import 'moment/locale/zh-cn';

const { RangePicker } = DatePicker;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD'


class Filter extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  validatorLength = (rule, value, callback) => {
    if (!value) {
      callback()
    } else if (value.toString().split(',').length > 200) {
      callback('最多能输入200个订单')
      return
    } else {
      callback()
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values.created_at);
        values.page = 1
        values.pageSize = 50

        this.props.getList(values)
      }
    });
  }
  render() {
    let { platforms } = this.props
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return <Form {...formItemLayout} onSubmit={this.handleSubmit}>
      <Row>
        <Col span={8}>
          <Form.Item label='wby订单号'>
            {getFieldDecorator('wby_order_id', {
              rules: [{
                validator: this.validatorLength
              }]
            })(
              <Input style={{ width: 220 }} allowClear placeholder='请输入订单ID ，多个空格隔开' />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='koc订单号'>
            {getFieldDecorator('koc_order_id', {
              rules: [{
                validator: this.validatorLength
              }]
            })(
              <Input placeholder='请输入koc订单ID ，多个空格隔开' style={{ width: 220 }} allowClear />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='需求ID'>
            {getFieldDecorator('requirement_id', {
              rules: [{
                validator: this.validatorLength
              }]
            })(
              <Input placeholder='请输入订单ID ，多个空格隔开' style={{ width: 220 }} allowClear />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item label='PO'>
            {getFieldDecorator('po_code')(
              <Input placeholder='请输入PO号' style={{ width: 220 }} allowClear />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='平台'>
            {getFieldDecorator('platform_id')(
              <Select style={{ width: 220 }} >
                <Option value="">请选择</Option>
                {platforms.map(d =>
                  <Option value={d.pid} key={d.pid}>{d.platform_name}</Option>
                )}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='订单状态'>
            {getFieldDecorator('status')(
              <Select style={{ width: 220 }} >
                <Option value="1">已确认</Option>
                <Option value="2">已执行</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8} style={{ whiteSpace: 'nowrap' }}>
          <Form.Item label="任务开始时间" {...formItemLayout}>
            {getFieldDecorator('created_start')(
              <DatePicker format="YYYY-MM-DD" placeholder='开始日期' />
            )}
            ~
						{getFieldDecorator('created_end')(
              <DatePicker format="YYYY-MM-DD " placeholder='结束日期' />
            )}
          </Form.Item>
        </Col>
        <Col span={8} style={{ textAlign: 'center', marginLeft: '40px' }}>
          <Form.Item>
            <Button htmlType="submit" type='primary'>搜索</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }
}

export default Form.create()(Filter)
