import React, { Component } from 'react';
import { Form, Input, Row, Col, Select, Button, DatePicker, Icon } from 'antd';
import EmSpan from '../base/EmSpan';

const { RangePicker } = DatePicker;
const InputGroup = Input.Group;
const Option = Select.Option;

@Form.create()
export default class SummaryReviewFilterForm extends Component {
  state = {
    expand: false,
    batchKey: 'order_id',
    timeType: 'time_type_1'
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // reset select
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
  validatorBatchId = (rule, value, callback) => {
    if (value && value.trim().split(/\s+/g).length > 200) {
      return callback('不能超过200个');
    }
    callback();
  };

  render() {
    const { source, loading } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return <Form onSubmit={this.handleSubmit} layout="inline" autoComplete="off">
      <Row>
        <Col span={6}>
          <Form.Item label="结案数据单名称">
            {getFieldDecorator('weibo_name', {})(
              <Input placeholder="请输入账号名称" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="结案数据单ID">
            {getFieldDecorator('weibo_name', {})(
              <Input placeholder="请输入账号名称" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={'创建人'}>
            {getFieldDecorator('executor_admin_id', {})(
              <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                optionFilterProp='children'
              >
                {source.salesManagers || [].map(option =>
                  <Option key={option.owner_admin_id}>{option.real_name}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="公司简称">
            {getFieldDecorator('execution_status', {
              initialValue: this.props.execution_status
            })(
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
                {source.executionStatus || [].map(option =>
                  <Option key={option.value}>{option.label}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item label={<EmSpan length={7}>创建时间</EmSpan>}>
            {getFieldDecorator(this.state.timeType, {})(
              <RangePicker style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <div style={{ lineHeight: '40px', textAlign: 'right' }}>
            <Button type='primary' style={{ marginLeft: '20px' }} htmlType='submit' loading={loading}>查询</Button>
            <Button style={{ margin: '0 16px 0 10px' }} onClick={this.handleReset}>重置</Button>
          </div>
        </Col>
      </Row>
    </Form>;
  }
}
