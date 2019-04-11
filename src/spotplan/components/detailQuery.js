import React from 'react'
import { Row, Form, Select, Input, Button } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
class DetailQuery extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return <Form className='spotplan-check-form'>
      <Row>
        <FormItem label='Spotplan更新审核状态'>
          {getFieldDecorator('some_people')(
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
            <Input placeholder='请输入订单ID/priceID，多个空格隔开' className='left-little-gap' style={{ width: 240 }} />
          )}
        </FormItem>
        <FormItem label='账号名称'>
          {getFieldDecorator('account_name')(
            <Input placeholder='请输入账号名称，多个以空格隔开' style={{ width: 240 }} />
          )}
        </FormItem>
        <FormItem label='平台'>
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
        <FormItem label='执行人'>
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
        <Button className='left-gap' type='primary'>查询</Button>
      </Row>
    </Form>
  }
}
export default Form.create()(DetailQuery)
