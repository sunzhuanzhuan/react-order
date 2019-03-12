import React, { Component } from 'react';
import { Table } from 'antd';
import OrderFilterForm from '../components/OrderFilterForm';
import { SH2 } from '../../base/SectionHeader';
import './SelectOrders.less'

const columns = [{
  title: '订单ID',
  dataIndex: 'name'
}, {
  title: 'PO单号',
  dataIndex: 'age'
}, {
  title: '需求名称',
  dataIndex: 'address'
}, {
  title: '主平台信息',
  dataIndex: 'name1'
}, {
  title: '项目/品牌',
  dataIndex: 'age1'
}, {
  title: '状态',
  dataIndex: 'address2'
}, {
  title: '执行人',
  dataIndex: 'address3'
}];
const data = [
  {
    name: '11',
    age: '11',
    address: '11',
    name1: '11',
    age1: '11',
    address2: '11',
    address3: '11'
  }
];

export default class SelectOrders extends Component {
  componentWillMount() {}

  render() {
    const rowSelection = {
      onChange: this.onSelectChange,
      getCheckboxProps: record => {
        return {
          disabled: true
        };
      }
    };
    const pagination = {
      total: 50,
      onChange: (current, size) => {},
      onShowSizeChange: (current, size) => {},
      showSizeChanger: true,
      showQuickJumper: true
    };
    return <div className='select-orders flex-form-layout'>
      <SH2 title='订单列表' />
      <div style={{padding: '20px 0'}}>
        <OrderFilterForm />
      </div>
      <Table dataSource={data} rowSelection={rowSelection} pagination={pagination} columns={columns} />
    </div>;
  }
}
