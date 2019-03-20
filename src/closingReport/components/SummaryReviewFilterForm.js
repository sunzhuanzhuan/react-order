import React, { Component } from 'react';
import { Form, Input, Row, Col, Select, Button, DatePicker, Icon } from 'antd';
import EmSpan from '../base/EmSpan';
import SearchSelect from "@/base/SearchSelect";

const { RangePicker } = DatePicker;
const InputGroup = Input.Group;
const Option = Select.Option;

@Form.create()
export default class SummaryReviewFilterForm extends Component {
  state = {
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // 处理params
        this.props.getList({...values, page: 1})
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
    const { source, loading, actions } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return <Form onSubmit={this.handleSubmit} layout="inline" autoComplete="off">
      <Row>
        <Col span={8}>
          <Form.Item label="结案数据单名称">
            {getFieldDecorator('summary_name', {})(
              <Input placeholder="请输入名称" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={'创建人'}>
            {getFieldDecorator('creator_id', {})(
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
        <Col span={8}>
          <Form.Item label="公司简称">
            {getFieldDecorator('company_id', {
              initialValue: this.props.execution_status
            })(<SearchSelect placeholder="请输入并从下拉框选择" action={actions.getCompanyNames} wordKey='name'
                mapResultItemToOption={({ company_id, name } = {}) => ({
                  value: company_id,
                  label: name
                })}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label={<EmSpan length={7}>创建时间</EmSpan>}>
            {getFieldDecorator('created_at', {})(
              <RangePicker style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <div style={{ lineHeight: '40px', textAlign: 'right' }}>
            <Button type='primary' style={{ marginLeft: '20px' }} htmlType='submit' loading={loading}>查询</Button>
            <Button style={{ margin: '0 16px 0 10px' }} onClick={this.handleReset}>重置</Button>
          </div>
        </Col>
      </Row>
    </Form>;
  }
}
