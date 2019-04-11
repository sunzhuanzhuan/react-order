import React from 'react'
import { Breadcrumb, Table } from 'antd'
import ListQuery from '../components/listQuery'
import { SpotplanListCols } from '../constants'
import './spotplan.less'

export default class SpotPlanList extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    return <div className='spotList-list-container'>
      <Breadcrumb>
        <Breadcrumb.Item><a href="">Spotplan管理</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="">Spotplan列表</a></Breadcrumb.Item>
      </Breadcrumb>
      <h2>Spotplan列表</h2>
      <h3 style={{ marginTop: '20px' }}>筛选项</h3>
      <ListQuery />
      <h3 style={{ marginTop: '20px' }}>Spotplan列表</h3>
      <Table
        rowKey='id'
        // loading={loading}
        columns={SpotplanListCols}
        // dataSource={list}
        bordered
      // pagination={total > page_size ? paginationObj : false}
      />
    </div>
  }
}
