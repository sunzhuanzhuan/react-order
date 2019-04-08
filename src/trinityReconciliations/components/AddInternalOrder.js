import React, { Component } from 'react';
import { Alert, Table, Form, DatePicker, Input, Button, Icon } from 'antd';
import './AddInternalOrder.less';
import RangeInput from '../base/RangeInput';
const { RangePicker } = DatePicker

const columns = [{
  title: '订单号',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '三方平台下单价',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '账号名',
  dataIndex: 'address',
  key: 'address'
}, {
  title: '下单时间',
  dataIndex: 'address1',
  key: 'address1'
}, {
  title: '对账状态',
  dataIndex: 'address2',
  key: 'address2'
}];
export default class AddInternalOrder extends Component {
  componentWillMount() {}

  render() {
    let tableSummaryChild = <div>
      已选择订单 <b>4</b> 条    共计 200000.00 元
    </div>
    return <div className='module-page add-internal-order'>
      <section className='section'>
        <h2>三方对账单信息</h2>
        <ul className='summary-box'>
          <li className='summary-item'>
            <span className='name'>三方对账总额</span>
            <span className='value red'>20000.00</span>
          </li>
          <li className='summary-item'>
            <span className='name'>三方对账总额</span>
            <span className='value'>20000元</span>
          </li>
          <li className='summary-item'>
            <span className='name'>三方对账总额</span>
            <span className='value'>20000元</span>
          </li>
          <li className='summary-item'>
            <span className='name'>三方对账总额</span>
            <span className='value'>20000元</span>
          </li>
          <li className='summary-item'>
            <span className='name'>三方对账总额</span>
            <span className='value'>20000元</span>
          </li>
          <li className='summary-item'>
            <span className='name'>三方对账总额</span>
            <span className='value'>20000元</span>
          </li>
        </ul>
      </section>
      <section>
        <h2>微博易订单</h2>
        <div>
          <ListFilterForm />
          <div className='table-summary'>
            <Alert message={tableSummaryChild} type="info" />
          </div>
          <Table columns={columns} bordered/>
        </div>
      </section>
    </div>;
  }
}

@Form.create({ name: 'internal_search' })
class ListFilterForm extends Component {
  state = {
    expand: false
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return <Form layout="inline" className='filter-form' onSubmit={this.handleSubmit}>
      <Form.Item label={`金额`}>
        {getFieldDecorator(`sum`, {
        })(<RangeInput  placeholder="金额"/>)}
      </Form.Item>
      <Form.Item label={`下单时间`}>
        {getFieldDecorator(`data`, {
        })(
          <RangePicker />
        )}
      </Form.Item>
      {this.state.expand ? <Form.Item label={`订单id`}>
        {getFieldDecorator(`wby_order_id`, {
        })(<Input placeholder="1020322323" />)}
      </Form.Item> : null}
      <Button type="primary" htmlType="submit">搜索</Button>
      <a className='more' onClick={this.toggle}>
        更多筛选 <Icon type={this.state.expand ? 'up' : 'down'} />
      </a>
    </Form>;
  }
}
