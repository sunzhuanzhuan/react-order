import React, { Component } from 'react';
import { Card, Table, Checkbox } from 'antd';
import AddInternalOrder from '../components/AddInternalOrder';

const CheckboxGroup = Checkbox.Group;
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
      list: this.state.list.filter(key => !this.state.selectedRowKeys.includes(key))
    });
  };
  disassociate = () => {
    this.setState({
      joinStore: [],
      selectedRowKeys: this.state.selectedRowKeys.concat(this.state.joinStore),
      list: this.state.joinStore.concat(this.state.list)
    });
  };

  componentWillMount() {}

  render() {
    const { selectedRowKeys, joinStore } = this.state;
    const listDate = this.state.list.map(key => dataMap[key]);
    let extra = joinStore.length ? <a href="#" onClick={this.disassociate}>解除关联</a> :
      selectedRowKeys.length ? <a href="#" onClick={this.joint}>关联</a> : null;

    return <div className='reconciliation-container'>
      <div className='left'>
        <CheckboxGroup value={selectedRowKeys} onChange={(selectedRowKeys) => {
          this.setState({ selectedRowKeys });
        }}>
          {listDate.map(item => <div key={item.key} className='card-container'>
            <Checkbox value={item.key} checked={item.checked}>
              <div className='card-content'>{item.name}</div>
            </Checkbox></div>)}
        </CheckboxGroup>
      </div>
      <div className='right'>
        <Card
          title="Default size card"
          extra={extra}
        >
          {joinStore.map(key => <p key={key}>{dataMap[key].name}</p>)}
        </Card>
        <AddInternalOrder />
      </div>
    </div>;
  }
}
