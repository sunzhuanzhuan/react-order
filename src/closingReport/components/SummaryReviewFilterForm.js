import React, { Component } from 'react'
import { Form, Input, Row, Col, Select, Button, DatePicker } from 'antd'
import EmSpan from '../base/EmSpan'
import SearchSelect from '@/base/SearchSelect'
import { moment2dateStr } from '../util'

const { RangePicker } = DatePicker
const Option = Select.Option

@Form.create()
export default class SummaryReviewFilterForm extends Component {
  state = {}
  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.company_id = values.company_id && values.company_id.key
        values.created_at = moment2dateStr(values.created_at)
        this.props.getList({ ...values, page: 1 })
      }
    })
  }
  handleReset = () => {
    this.props.form.resetFields()
  }

  componentDidMount() {
    this.handleSubmit()
  }
  render() {
    const { source, loading, actions } = this.props
    const { getFieldDecorator } = this.props.form
    return <Form onSubmit={this.handleSubmit} layout="inline" autoComplete="off">
      <Row>
        <Col span={8}>
          <Form.Item label="投放数据汇总单名称">
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
                getPopupContainer={() => document.querySelector('.closing-report-filter-container')}
                optionFilterProp='children'
              >
                {source.executors.map(option =>
                  <Option key={option.owner_admin_id}>{option.real_name}</Option>)}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="公司简称">
            {getFieldDecorator('company_id', {
              initialValue: this.props.execution_status
            })(
              <SearchSelect placeholder="请输入并从下拉框选择" action={actions.getCompanyNames} wordKey='name'
                getPopupContainer={() => document.querySelector('.closing-report-filter-container')}
                mapResultItemToOption={({ company_id, name } = {}) => ({
                  value: company_id,
                  label: name
                })}
              />
            )}
          </Form.Item>
        </Col>
        {/*<Col span={6}>
          <Form.Item label="是否含待内审订单">
            {getFieldDecorator('summary_data_status', {
              initialValue: 1
            })(
              <Select
                style={{ width: '100%' }}
                placeholder="请选择"
                getPopupContainer={() => document.querySelector('.closing-report-filter-container')}
              >
                  <Option value={1}>是</Option>
                  <Option value={0}>否</Option>
              </Select>
            )}
          </Form.Item>
        </Col>*/}
        <Col span={16}>
          <Form.Item label={<EmSpan length={9}>创建时间</EmSpan>}>
            {getFieldDecorator('created_at', {})(
              <RangePicker showTime style={{ width: '100%' }} />
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
    </Form>
  }
}
