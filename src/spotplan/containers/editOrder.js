import React from 'react'
import { Table } from 'antd'
import { EditOrderCols } from '../constants'
import Header from '../components/header'
export default class EditOrder extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    return <div className='splotplan-edit-container'>
      <Header />
      <h3 className='top-gap'>订单列表</h3>
      <div className='edit-table-container top-gap'>
        <Table
          rowKey='id'
          columns={EditOrderCols}
          bordered
        />
      </div>
    </div>
  }
}
