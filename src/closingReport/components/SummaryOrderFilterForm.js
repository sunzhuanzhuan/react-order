import React, { Component } from 'react';
import { Form, Input, Row, Col, Select, Button, DatePicker, Icon } from 'antd';
import EmSpan from '../base/EmSpan';
import SearchSelect from '../../base/SearchSelect';
import * as actions from '../actions';

const { RangePicker } = DatePicker;
const InputGroup = Input.Group;
const Option = Select.Option;

function handleValue(values) {
  values['order_id'] = values['order_id'] && values['order_id'].trim().split(/\s+/g);
  values['execution_evidence_code'] = values['execution_evidence_code'] && values['execution_evidence_code'].trim().split(/\s+/g);
  values['requirement_id'] = values['requirement_id'] && values['requirement_id'].trim().split(/\s+/g);
  values.company_id = values.company_id && values.company_id.key;
  values.external_check_at = values.external_check_at && values.external_check_at.map(m => m && m.toJSON());
  values.internal_check_at = values.internal_check_at && values.internal_check_at.map(m => m && m.toJSON());
  values.submitter_at = values.submitter_at && values.submitter_at.map(m => m && m.toJSON());
  return values;
}

@Form.create()
export default class SummaryOrderFilterForm extends Component {
  state = {
    batchKey: 'order_id',
    timeType: 'submitter_at'
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // 处理params
        values = handleValue(values);
        this.props.getList({ ...values, page: 1 });
      }
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  validatorBatchId = (rule, value, callback) => {
    if (value && value.trim().split(/\s+/g).length > 200) {
      return callback('不能超过200个');
    }
    callback();
  };

  render() {
    const { source, loading, actions } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return <Form onSubmit={this.handleSubmit} layout="inline" autoComplete="off">
      <Row>
        <Col span={6}>
          <Form.Item label="公司简称">
            {getFieldDecorator('company_id', {
              initialValue: this.props.execution_status
            })(
              <SearchSelect placeholder="请输入并从下拉框选择" action={actions.getCompanyNames} wordKey='name'
                mapResultItemToOption={({ company_id, name } = {}) => ({
                  value: company_id,
                  label: name
                })}
              />
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
                {source.projectByUser.map(option => <Option key={option.id}>{option.name}</Option>)}
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
                {source.brandByUser.map(option =>
                  <Option key={option.id}>{option.view_name}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="结案数据单名称">
            {getFieldDecorator('summary_name', {})(
              <Input placeholder="请输入数据单名称" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='所属销售'>
            {getFieldDecorator('sale_manager_id', {})(
              <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                optionFilterProp='children'
              >
                {source.salesManagers.map(option =>
                  <Option key={option.owner_admin_id}>{option.real_name}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={<EmSpan length={4}>执行人</EmSpan>}>
            {getFieldDecorator('executor_admin_id', {})(
              <Select
                allowClear
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择"
                optionFilterProp='children'
              >
                {source.executors.map(option =>
                  <Option key={option.owner_admin_id}>{option.real_name}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={<EmSpan length={4}>时间</EmSpan>}>
            <InputGroup compact>
              <Select style={{ width: '130px' }} value={this.state.timeType} onChange={(key) => this.setState({ timeType: key })}>
                <Option value="submitter_at">提交时间</Option>
                <Option value="internal_check_at">内审审核时间</Option>
                <Option value="external_check_at">品牌审核时间</Option>
              </Select>
              {getFieldDecorator(this.state.timeType, {})(
                <RangePicker style={{ width: 'calc(100% - 130px)' }} />
              )}
            </InputGroup>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="批量查询">
            <InputGroup compact>
              <Select value={this.state.batchKey} style={{ width: '100px' }} onChange={(key) => this.setState({ batchKey: key })}>
                <Option value="order_id">订单ID</Option>
                <Option value="execution_evidence_code">PO单号</Option>
                <Option value="summary_id">数据单ID</Option>
              </Select>
              {getFieldDecorator(this.state.batchKey, {
                rules: [{
                  validator: this.validatorBatchId
                }]
              })(
                <Input placeholder='请输入订单ID/PO单号/数据单ID空格隔开，不超过200个' style={{ width: 'calc(100% - 100px)' }} />
              )}
            </InputGroup>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="审核状态">
            {getFieldDecorator('summary_status', {})(
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
                {source.summaryStatus.map(option =>
                  <Option key={option.value}>{option.label}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <div style={{ lineHeight: '40px', textAlign: 'left' }}>
            <Button type='primary' style={{ marginLeft: '20px' }} htmlType='submit' loading={loading}>查询</Button>
            <Button style={{ margin: '0 20px 0 10px' }} onClick={this.handleReset}>重置</Button>
          </div>
        </Col>
      </Row>
    </Form>;
  }
}
