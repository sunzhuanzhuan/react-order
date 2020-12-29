import React from 'react'
import { Row, Form, Select, Input, Button, DatePicker, message, Col } from 'antd'
import qs from 'qs'
import moment from 'moment';
import 'moment/locale/zh-cn';

const { RangePicker } = DatePicker;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD'


class FilterForm extends React.Component {
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
        console.log('Received values of form: ', values);
        this.props.postSearchList()
      }
    });
  }
  render() {
    let { platforms } = this.props
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    return <Form {...formItemLayout} onSubmit={this.handleSubmit}>
      <Row>
        <Col span={6}>
          <Form.Item label='wby订单号'>
            {getFieldDecorator('settle_type', {
              rules: [{
                validator: this.validatorLength
              }]
            })(
              <Input style={{ width: 220 }} allowClear placeholder='请输入订单ID ，多个空格隔开' />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='koc订单号'>
            {getFieldDecorator('spotplan_name', {
              rules: [{
                validator: this.validatorLength
              }]
            })(
              <Input placeholder='请输入订单ID ，多个空格隔开' style={{ width: 220 }} allowClear />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='需求ID'>
            {getFieldDecorator('brand_id', {
              rules: [{
                validator: this.validatorLength
              }]
            })(
              <Input placeholder='请输入订单ID ，多个空格隔开' style={{ width: 220 }} allowClear />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='PO'>
            {getFieldDecorator('creator_id')(
              <Input placeholder='请输入PO号' style={{ width: 220 }} allowClear />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item label='平台'>
            {getFieldDecorator('platform')(
              <Select style={{ width: 220 }} >
                <Option value="">请选择</Option>
                {platforms.map(d =>
                  <Option value={d.pid} key={d.pid}>{d.platform_name}</Option>
                )}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='订单状态'>
            {getFieldDecorator('name')(
              <Select style={{ width: 220 }} >
                <Option value="1">请选择</Option>
                <Option value="2">已确认</Option>
                <Option value="3">已执行</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='创建时间'>
            {getFieldDecorator('created_at')(
              <RangePicker style={{ width: 220 }} format={dateFormat} />
            )}
          </Form.Item>
        </Col>
        <Col span={6} style={{ textAlign: 'center' }}>
          <Form.Item>
            <Button htmlType="submit" type='primary'>搜索</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }
}

export default Form.create()(FilterForm)
