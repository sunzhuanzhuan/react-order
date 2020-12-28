import React from 'react'
import { Row, Form, Select, Input, Button, DatePicker, message, Col } from 'antd'
import qs from 'qs'
import moment from 'moment';
import 'moment/locale/zh-cn';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm:ss'


class FilterForm extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
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
    return <Form {...formItemLayout}>
      <Row>
        <Col span={6}>
          <FormItem label='wby订单号'>
            {getFieldDecorator('settle_type')(
              <Input style={{ width: 140 }} allowClear placeholder='请输入订单ID ，多个空格隔开；最多能输入200个订单' />
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label='koc订单号'>
            {getFieldDecorator('spotplan_name')(
              <Input placeholder='请输入spotplan名称' style={{ width: 140 }} allowClear />
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label='需求ID'>
            {getFieldDecorator('brand_id')(
              <Select style={{ width: 140 }} >
                <Option value="jack">123</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label='PO'>
            {getFieldDecorator('creator_id')(
              <Input placeholder='请输入spotplan名称' style={{ width: 140 }} allowClear />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <FormItem label='平台'>
            {getFieldDecorator('1')(
              <Select style={{ width: 140 }} >
                <Option value="jack">123</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label='订单状态'>
            {getFieldDecorator('2')(
              <Select style={{ width: 140 }} >
                <Option value="jack">123</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label='创建时间'>
            {getFieldDecorator('created_at')(
              <RangePicker showTime style={{ width: 250 }} format={dateFormat} />
            )}
          </FormItem>
        </Col>
        <Col span={6} style={{ textAlign: 'center' }}>
          <Button onClick={this.handleReset}>重置</Button>
          <Button style={{ marginLeft: '20px' }} type='primary' onClick={this.handleSearch}>搜索</Button>
        </Col>
      </Row>
    </Form>
  }
}

export default Form.create()(FilterForm)
