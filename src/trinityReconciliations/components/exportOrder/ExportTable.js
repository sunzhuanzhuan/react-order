import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import qs from 'qs'

import { Table } from "antd";
// import './list.less'

class List extends Component {
  constructor(props) {
    super(props)

  }
  handleNewModal = ({ id }) => {
    // console.log(record)
    this.props.history.push({
      pathname: '/finance/zhangwu/detail',
      search: `?${qs.stringify({ id: id })}`,
    });
  }
  render() {
    let { columns, paginationObj, dataTable, rowSelection, loading } = this.props;


    return <div className='top-gap'>
      <Table
        bordered
        loading={loading}
        columns={columns}
        dataSource={dataTable}
        rowSelection={rowSelection}
        rowKey={record => { return record.wby_order_id ? record.wby_order_id.toString() : '' }}
        pagination={paginationObj}
      // questAction={this.props.actions.getMissionList}

      // filterParams={filterParams}
      // handlePageSize={this.handlePageSize}
      ></Table>
    </div>
  }
}

const mapStateToProps = () => {
  return {

  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(List)
