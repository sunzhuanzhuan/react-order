import React from 'react'
import { Row, Form, Select, Input, Button, DatePicker } from 'antd'
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
class CheckQuery extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return <Form className='spotplan-check-form'>
      <Row>
        <FormItem label='批量查询'>
          {getFieldDecorator('settle_type', {
            initialValue: { key: '订单ID', value: 1 }
          })(
            <Select style={{ width: 100 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-check-form')}
              labelInValue
            >
              <Option value={1} key={1}>订单ID</Option>
              <Option value={2} key={2}>需求ID</Option>
            </Select>
          )}
          {getFieldDecorator('settle_id')(
            <Input placeholder='请输入订单ID/需求ID，多个空格隔开' className='left-little-gap' style={{ width: 240 }} />
          )}
        </FormItem>
        <FormItem label='Spotplan名称'>
          {getFieldDecorator('spotplan_name')(
            <Input placeholder='请输入spotplan名称' style={{ width: 240 }} />
          )}
        </FormItem>
        <FormItem label='所属项目'>
          {getFieldDecorator('project_name')(
            <Select style={{ width: 140 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-check-form')}
              labelInValue
              allowClear
              showSearch
              filterOption={(input, option) => (
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
            >
              <Option value={1} key={1}>订单ID</Option>
              <Option value={2} key={2}>需求ID</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label='所属品牌'>
          {getFieldDecorator('plam_id')(
            <Select style={{ width: 140 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-check-form')}
              labelInValue
              allowClear
              showSearch
              filterOption={(input, option) => (
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
            >
              <Option value={1} key={1}>订单ID</Option>
              <Option value={2} key={2}>需求ID</Option>
            </Select>
          )}
        </FormItem>
      </Row>
      <Row>
        <FormItem label='创建人'>
          {getFieldDecorator('belong_to')(
            <Select style={{ width: 140 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-check-form')}
              labelInValue
              allowClear
              showSearch
              filterOption={(input, option) => (
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
            >
              <Option value={1} key={1}>1</Option>
              <Option value={2} key={2}>2</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label='创建时间'>
          {getFieldDecorator('created_at')(
            <RangePicker showTime style={{ width: 240 }} />
          )}
        </FormItem>
        <FormItem label='是否存在更新请求被拒订单'>
          {getFieldDecorator('is_true')(
            <Select style={{ width: 140 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-check-form')}
              labelInValue
              allowClear
              showSearch
              filterOption={(input, option) => (
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
            >
              <Option value={1} key={1}>1</Option>
              <Option value={2} key={2}>2</Option>
            </Select>
          )}
        </FormItem>
        <Button className='left-gap'>重置</Button>
        <Button className='left-gap' type='primary'>搜索</Button>
      </Row>
    </Form>
  }
}
export default Form.create()(CheckQuery)
