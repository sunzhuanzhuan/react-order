import React, { Component } from 'react';
import { Card, Table } from 'antd';
import AddInternalOrder from '../components/AddInternalOrder';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="javascript:;">{text}</a>
}, {
  title: 'Age',
  dataIndex: 'age'
}, {
  title: 'Address',
  dataIndex: 'address'
}];
const dataMap = {
  '1': {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  }, '2': {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  }, '3': {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }, '4': {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park'
  }
};


export default class Test extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedRowKeys: [],
      joinStore: [],
      list: Object.keys(dataMap)
    };
  }

  joint = () => {
    console.log(this.state.selectedRowKeys.length, '----');
    if (this.state.selectedRowKeys.length <= 0) return;
    this.setState({
      selectedRowKeys: [],
      joinStore: this.state.selectedRowKeys,
      list: this.state.list.filter(key => !this.state.selectedRowKeys.includes(key) )
    });
  };
  disassociate = () => {
    this.setState({
      joinStore: [],
      list: this.state.list.concat(this.state.joinStore)
    });
  };

  componentWillMount() {}

  render() {
    const listDate = this.state.list.map(key => dataMap[key]);
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      selectedRowKeys: this.state.selectedRowKeys,
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name
      })
    };
    const { selectedRowKeys, joinStore } = this.state;
    let extra = joinStore.length ? <a href="#" onClick={this.disassociate}>解除关联</a> :
      selectedRowKeys.length ? <a href="#" onClick={this.joint}>关联</a> : null;


    return <div className='reconciliation-container'>
      <div className='left'>
        <Table rowSelection={rowSelection} columns={columns} dataSource={listDate} pagination={false} bordered/>
      </div>
      <div className='right'>
        <Card
          title="Default size card"
          extra={extra}
        >
          {joinStore.map(key => <p key={key}>{dataMap[key].name}</p>)}
        </Card>
        <AddInternalOrder/>
      </div>
    </div>;
  }
}
