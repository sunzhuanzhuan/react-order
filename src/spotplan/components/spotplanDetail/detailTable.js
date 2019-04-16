import React from 'react'
import { Table } from 'antd'
import { DetailTableCols } from '../../constants'
export default class DetailTable extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {
    console.log('mounted');
  }
  render() {
    const { dataSource, rowSelection } = this.props;
    return <Table
      rowSelection={rowSelection}
      rowKey='order_id'
      columns={DetailTableCols}
      dataSource={dataSource}
      border
    />
  }
}
