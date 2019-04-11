import React from 'react'
import { Table } from 'antd'
import { DetailTableCols } from '../constants'
export default class DetailTable extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {
    console.log('mounted');
  }
  render() {
    const { data } = this.props;
    return <Table
      columns={DetailTableCols}
      border
    />
  }
}
