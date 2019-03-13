import React, { Component } from 'react';
import { Form, Input, Row, Col, Select, Button, DatePicker, Icon } from 'antd';
import EmSpan from '../base/EmSpan';

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
    expand: false,
    batchKey: 'order_id'
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


  componentWillMount() {
  }

  render() {
    const { source } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return <Form onSubmit={this.handleSubmit} layout="inline" autoComplete="off">
      <Row>
        <Col span={6}>
          <Form.Item label="账号名称">
            {getFieldDecorator('weibo_name', {})(
              <Input placeholder="请输入账号名称" style={{ width: '100%' }}/>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="所属项目">
            {getFieldDecorator('project_id', {})(
              <Select
                allowClear
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
                maxTagCount={0}
                optionFilterProp='children'
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`;
                }}
              >
                {source.brandByCompany.map(option => <Option key={option.brand_id}>{option.view_name}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="所属品牌">
            {getFieldDecorator('brand_id', {})(
              <Select
                allowClear
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
                maxTagCount={0}
                optionFilterProp='children'
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`;
                }}
              >
                {source.projectByCompany.map(option => <Option key={option.project_id}>{option.project_name}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={<EmSpan length={this.state.expand ? 6 : 3}>执行人</EmSpan>}>
            {getFieldDecorator('sale_manager_id', {})(
              <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                optionFilterProp='children'
              >
                {source.salesManager.map(option => <Option key={option.owner_admin_id}>{option.real_name}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item label="批量查询">
            <InputGroup compact>
              <Select value={this.state.batchKey}  style={{ width: '100px' }} onChange={(key) => this.setState({batchKey: key})}>
                <Option value="order_id">订单ID</Option>
                <Option value="execution_evidence_code">PO单号</Option>
                <Option value="requirement_id">需求ID</Option>
              </Select>
              {getFieldDecorator(this.state.batchKey, {
                rules: [{
                  message: '账号名称'
                }]
              })(
                <Input placeholder='请输入订单ID/PO单号/需求ID空格隔开，不超过200个' style={{ width: 'calc(100% - 100px)' }}/>
              )}
            </InputGroup>
          </Form.Item>
        </Col>
        {this.state.expand ? <Col span={6}>
          <Form.Item label="订单执行状态">
            {getFieldDecorator('execution_status', {})(
              <Input placeholder="请选择"/>
            )}
          </Form.Item>
        </Col> : null}
        {this.state.expand ? <Col span={12}>
          <Form.Item label={<EmSpan length={4}>时间</EmSpan>}>
            <InputGroup compact>
              {getFieldDecorator(`time_type`, {
                initialValue: '1',
                rules: [{
                  message: '时间'
                }]
              })(
                <Select style={{ width: '150px' }}>
                  <Option value="1">回填执行链接时间</Option>
                  <Option value="2">执行时间</Option>
                  <Option value="3">提交时间</Option>
                  <Option value="4">结算时间</Option>
                </Select>
              )}
              {getFieldDecorator(`screen_time`, {})(
                <RangePicker style={{ width: 'calc(100% - 150px)' }}/>
              )}
            </InputGroup>
          </Form.Item>
        </Col> : null}
        <Col span={this.state.expand ? 12 : 6}>
          <div style={{ lineHeight: '40px', textAlign: 'left' }}>
            <Button type='primary' style={{ marginLeft: '20px' }} htmlType='submit'>查询</Button>
            <Button style={{ margin: '0 20px 0 10px' }} onClick={this.handleReset}>重置</Button>
            <a style={{ fontSize: 12 }} onClick={this.toggle}>
              更多 <Icon type={this.state.expand ? 'up' : 'down'}/>
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
