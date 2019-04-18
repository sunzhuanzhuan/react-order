import React from 'react'
import { Table } from 'antd'

export default class DetailTable extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {
    console.log('mounted');
  }
  render() {
    const { columns, dataSource, rowSelection } = this.props;
    return <Table
      rowSelection={rowSelection}
      rowKey={record => record.order_id.toString()}
      columns={columns}
      dataSource={dataSource}
      bordered
      scroll={{ x: 1540 }}
    />
  }
}
