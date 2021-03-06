/* eslint-disable no-self-assign */
import React, { Component } from 'react'
import { Form, Input, Row, Col, Select, Button, DatePicker, Icon } from 'antd'
import EmSpan from '../base/EmSpan'
import { batchText2Array, moment2dateStr } from '../util'

const { RangePicker } = DatePicker
const InputGroup = Input.Group
const Option = Select.Option

@Form.create()
export default class OrderFilterForm extends Component {
  state = {
    expand: false,
    batchKey: 'order_id',
    timeType: 'time_type_1'
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // reset select
        this.props.onSelectChange([])
        // 处理params
        values['order_id'] = batchText2Array(values['order_id'])
        values['execution_evidence_code'] = batchText2Array(values['execution_evidence_code'], true)
        values['requirement_id'] = batchText2Array(values['requirement_id'])

        values['time_type_1'] = moment2dateStr(values['time_type_1'])
        values['time_type_2'] = moment2dateStr(values['time_type_2'])
        values['time_type_3'] = moment2dateStr(values['time_type_3'])
        values['time_type_4'] = moment2dateStr(values['time_type_4'])
        this.props.getList({ ...values, page: 1 })
      }
    })
  }
  handleReset = () => {
    this.props.form.resetFields()
  }
  toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  }
  validatorBatchId = (rule, value, callback) => {
    if (value && value.trim().split(/\s+/g).length > 200) {
      return callback('不能超过200个')
    }
    callback()
  }

  render() {
    const { source, loading } = this.props
    const { getFieldDecorator } = this.props.form
    return <Form onSubmit={this.handleSubmit} layout="inline" autoComplete="off">
      <Row>
        <Col span={6}>
          <Form.Item label="账号名称">
            {getFieldDecorator('weibo_name', {})(
              <Input placeholder="请输入账号名称" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="所属项目">
            {getFieldDecorator('project_id', {})(
              <Select
                allowClear
                mode="multiple"
                getPopupContainer={() => document.querySelector('.closing-report-filter-container')}
                style={{ width: '100%' }}
                placeholder="请选择"
                maxTagCount={0}
                optionFilterProp='children'
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`
                }}
              >
                {source.projectByCompany.map(option =>
                  <Option key={option.project_id}>{option.project_name}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={<EmSpan length={6}>所属品牌</EmSpan>}>
            {getFieldDecorator('brand_id', {})(
              <Select
                allowClear
                mode="multiple"
                getPopupContainer={() => document.querySelector('.closing-report-filter-container')}
                style={{ width: '100%' }}
                placeholder="请选择"
                maxTagCount={0}
                optionFilterProp='children'
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`
                }}
              >
                {source.brandByCompany.map(option =>
                  <Option key={option.brand_id}>{option.view_name}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={"执行人"}>
            {getFieldDecorator('executor_admin_id', {})(
              <Select
                allowClear
                showSearch
                getPopupContainer={() => document.querySelector('.closing-report-filter-container')}
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
          <Form.Item label="批量查询">
            <InputGroup compact>
              <Select
                value={this.state.batchKey}
                style={{ width: '100px' }}
                getPopupContainer={() => document.querySelector('.closing-report-filter-container')}
                onChange={(key) => this.setState({ batchKey: key })}
              >
                <Option value="order_id">订单ID</Option>
                <Option value="execution_evidence_code">PO单号</Option>
                <Option value="requirement_id">需求ID</Option>
              </Select>
              {getFieldDecorator(this.state.batchKey, {
                rules: [{
                  validator: this.validatorBatchId
                }]
              })(
                <Input placeholder='请输入订单ID/PO单号/需求ID空格隔开，不超过200个' style={{ width: 'calc(100% - 100px)' }} />
              )}
            </InputGroup>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="订单执行状态">
            {getFieldDecorator('execution_status', {
              initialValue: ['21', '22', '26', '27', '28', '32', '33', '34', '35']
            })(
              <Select
                allowClear
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
                maxTagCount={0}
                optionFilterProp='children'
                getPopupContainer={() => document.querySelector('.closing-report-filter-container')}
                maxTagPlaceholder={(omittedValues) => {
                  return `已选${omittedValues.length}项`
                }}
              >
                {source.executionStatus.map(option =>
                  <Option key={option.value}>{option.label}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <div style={{ lineHeight: '40px', textAlign: 'left' }}>
            <Button type='primary' style={{ marginLeft: '20px' }} htmlType='submit' loading={loading}>查询</Button>
            <Button style={{ margin: '0 20px 0 10px' }} onClick={this.handleReset}>重置</Button>
            <a style={{ fontSize: 12 }} onClick={this.toggle}>
              更多 <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </div>
        </Col>
        {this.state.expand ? <Col span={12}>
          <Form.Item label={<EmSpan length={4}>时间</EmSpan>}>
            <InputGroup compact>
              <Select
                style={{ width: '150px' }}
                value={this.state.timeType}
                getPopupContainer={() => document.querySelector('.closing-report-filter-container')}
                onChange={(key) => this.setState({ timeType: key })}
              >
                <Option value="time_type_1">回填执行链接时间</Option>
                <Option value="time_type_2">执行时间</Option>
                <Option value="time_type_3">提交时间</Option>
                <Option value="time_type_4">结算时间</Option>
              </Select>
              {getFieldDecorator(this.state.timeType, {})(
                <RangePicker showTime style={{ width: 'calc(100% - 150px)' }} />
              )}
            </InputGroup>
          </Form.Item>
        </Col> : null}
      </Row>
    </Form>
  }
}
