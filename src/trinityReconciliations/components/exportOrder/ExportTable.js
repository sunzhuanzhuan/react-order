import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import qs from 'qs'

import { Table } from "antd";
import { getTotalWidth, events } from '../../../util'
import Scolltable from '../../../components/Scolltable';
// import './list.less'
class List extends Component {
  constructor(props) {
    super(props)
    this.state={
      leftWidth: 40
    }
    events.on('message', this.collapsedListener); 
  }
  collapsedListener = isClosed => {
		this.setState({leftWidth: isClosed ? 40 : 200});
  }
  componentDidMount() {
    const leftSlide = document.getElementsByClassName('ant-layout-sider-trigger')[0];
		const leftWidth = leftSlide && leftSlide.clientWidth;
		this.setState({leftWidth});
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
    const totalWidth = getTotalWidth(columns);
    const { leftWidth } = this.state;

    return <div className='top-gap'>
      <Scolltable scrollClassName='.ant-table-body' widthScroll={totalWidth + leftWidth}>
        <Table
          bordered
          className='export_public_order_table'
          loading={loading}
          columns={columns}
          dataSource={dataTable}
          rowSelection={rowSelection}
          rowKey={record => { return record.wby_order_id ? record.wby_order_id.toString() : '' }}
          pagination={paginationObj}
          scroll={{ x: totalWidth }}
        // questAction={this.props.actions.getMissionList}

        // filterParams={filterParams}
        // handlePageSize={this.handlePageSize}
        ></Table>
      </Scolltable>
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
