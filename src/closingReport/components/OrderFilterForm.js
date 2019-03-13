import React, { Component } from 'react';
import { Form, Input, Row, Col, Select, Button, DatePicker, Icon } from 'antd';
import SwitchRequiredInput from '../base/SwitchRequiredInput';
import RadioLink from '@/closingReport/base/RadioLink';
import { Outline } from '../components/dataDetails';
import { Review as OutlineReview } from '../components/dataDetails/Outline';
import EmSpan from '../base/EmSpan';

const OutlineEdit = Outline.Edit;
const OutlineView = Outline.View;
const { RangePicker } = DatePicker;
const InputGroup = Input.Group;
const Option = Select.Option;

const formItemLayout = (l = 9, w = 15) => ({
  labelCol: { span: l },
  wrapperCol: { span: w }
});

@Form.create()
export default class OrderFilterForm extends Component {
  state = {
    expand: false
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };


  componentWillMount() {}

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return <Form onSubmit={this.handleSubmit} layout="inline" autoComplete="off">
      <Row>
        <Col span={6}>
          <Form.Item label="账号名称">
            {getFieldDecorator('username', {})(
              <Input placeholder="账号名称" style={{ width: '100%' }}/>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="所属项目">
            {getFieldDecorator('accountName', {})(
              <Input placeholder="账号名称" style={{ width: '100%' }}/>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="所属品牌">
            {getFieldDecorator('username5', {})(
              <Input placeholder="账号名称" style={{ width: '100%' }}/>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={<EmSpan length={this.state.expand ? 6 : 3}>执行人</EmSpan>}>
            {getFieldDecorator('username6', {})(
              <Input placeholder="账号名称" style={{ width: '100%' }}/>
            )}
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item label="批量查询">
            <InputGroup compact>
              <Select defaultValue="订单ID" style={{ width: '100px' }}>
                <Option value="订单ID">订单ID</Option>
                <Option value="PO单号">PO单号</Option>
                <Option value="需求ID">需求ID</Option>
              </Select>
              {getFieldDecorator(`username2`, {
                rules: [{
                  message: '账号名称'
                }]
              })(
                <Input style={{ width: 'calc(100% - 100px)' }} />
              )}
            </InputGroup>
          </Form.Item>
        </Col>
        {this.state.expand ? <Col span={6}>
          <Form.Item label="订单执行状态">
            {getFieldDecorator('username3', {})(
              <Input placeholder="账号名称" />
            )}
          </Form.Item>
        </Col> : null}
        {this.state.expand ? <Col span={12}>
          <Form.Item label={<EmSpan length={4}>时间</EmSpan>}>
            <InputGroup compact>
              <Select defaultValue="订单ID" style={{ width: '100px' }}>
                <Option value="订单ID">订单ID</Option>
                <Option value="PO单号">PO单号</Option>
              </Select>
              {getFieldDecorator(`username232`, {
                rules: [{
                  message: '账号名称'
                }]
              })(
                <Input style={{ width: 'calc(100% - 100px)' }} />
              )}
            </InputGroup>
          </Form.Item>
        </Col> : null}
        <Col span={this.state.expand ? 12 : 6}>
          <div style={{ lineHeight: '40px', textAlign: 'left' }}>
            <Button type='primary' style={{ marginLeft: '20px' }} htmlType='submit'>查询</Button>
            <Button style={{ margin: '0 20px 0 10px' }} onClick={this.handleReset}>重置</Button>
            <a style={{ fontSize: 12 }} onClick={this.toggle}>
              更多 <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </div>
        </Col>
      </Row>
      {/*
      <Form.Item label="账号名称">
        {getFieldDecorator(`username90`, {
          initialValue: { radio: 1 },
          rules: [{ validator: this.checkRadioLink }]
        })(<RadioLink />)}
      </Form.Item>
      <OutlineReview form={this.props.form} />*/}
    </Form>;
  }
}
