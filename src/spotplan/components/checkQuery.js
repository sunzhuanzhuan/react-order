import React from 'react'
import { Row, Form, Select, Input, Button } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
class CheckQuery extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { customer_status, reservation_status, spotplan_executor, spotplan_platform, spotplan_project } = this.props;
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
        <FormItem label='执行人'>
          {getFieldDecorator('executor_admin_id')(
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
              {spotplan_executor && spotplan_executor.map(item => (<Option value={item.owner_admin_id} key={item.owner_admin_id}>{item.real_name}</Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem label='平台'>
          {getFieldDecorator('platform_id')(
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
              {spotplan_platform && spotplan_platform.map(item => (<Option value={item.platform_id} key={item.platform_id}>{item.platform_name}</Option>))}
            </Select>
          )}
        </FormItem>
      </Row>
      <Row>
        <FormItem label='账号名称'>
          {getFieldDecorator('weibo_name')(
            <Input placeholder='请输入账号名称，多个以空格隔开' style={{ width: 240 }} />
          )}
        </FormItem>
        <FormItem label='需求名称'>
          {getFieldDecorator('requirement_name')(
            <Input placeholder='请输入需求名称' style={{ width: 160 }} />
          )}
        </FormItem>
        <FormItem label='所属项目'>
          {getFieldDecorator('project_id')(
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
              {spotplan_project && spotplan_project.map(item => (<Option value={item.id} key={item.id}>{item.name}</Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem label='订单预约状态'>
          {getFieldDecorator('reservation_status', {
            initialValue: { key: '应约', value: 2 }
          })(
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
              {reservation_status && reservation_status.map(item => (<Option value={item.value} key={item.value}>{item.key}</Option>))}
            </Select>
          )}
        </FormItem>
      </Row>
      <Row>
        <FormItem label='客户确认状态'>
          {getFieldDecorator('customer_confirmation_status')(
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
              {customer_status && customer_status.map(item => (<Option value={item.value} key={item.value}>{item.key}</Option>))}
            </Select>
          )}
        </FormItem>
        <Button className='left-gap'>重置</Button>
        <Button className='left-gap' type='primary'>查询</Button>
      </Row>
    </Form>
  }
}
export default Form.create()(CheckQuery)
