import React, { Component } from 'react';
import { Table,PageHeader,Button,Tabs } from 'antd';
import OrderFilterForm from '../components/OrderFilterForm';
import OrderCard from '../components/OrderCard';
import { SH2 } from '@/base/SectionHeader'
const TabPane = Tabs.TabPane;


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

export default class Test extends Component {
  componentWillMount() {}
  render() {
    const rowSelection = {
      onChange: this.onSelectChange,
      getCheckboxProps: record => {
        return {
          disabled: true,
        }
      }
    };
    const pagination = {
      total: 50,
      onChange: (current, size) => {},
      onShowSizeChange: (current, size) => {},
      showSizeChanger: true,
      showQuickJumper: true
    };
    return <div>
      <PageHeader
        onBack={() => null}
        title="结案数据单详情页"
        extra={<Button type='primary' ghost>添加订单</Button>}
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane tab="全部 500  " key="1" />
            <TabPane tab="待提交内审 100 " key="2" />
          </Tabs>
        }
      >
        <p>结案数据单号：001          结案数据单名称：这里显示名称              创建人：蔡逸琦</p>
        <SH2/>
      </PageHeader>
      <OrderFilterForm />
      <Table dataSource={data} rowSelection={rowSelection} pagination={pagination} columns={columns}/>
      <OrderCard/>
    </div>;
  }
}
