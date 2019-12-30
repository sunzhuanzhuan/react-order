import React, { } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { bindActionCreators } from 'redux';



const Log = (props) => {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '记录时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作记录',
      dataIndex: 'remark',
      key: 'remark',
    }
  ]

  const getList = () => {
    const { actions } = this.props
    this.setState({ listLoading: true })
    actions.postOperationLog().finally(() => {
      this.setState({ listLoading: false })
    })
  }
  const pagination = {
    total: 100,
    pageSize: 10,
    currentPage: 1,
    onChange: (current) => {
      getList({ currentPage: current })
    },
    showQuickJumper: true
  }
  return (
    <div>
      <Table loading={false} columns={columns} dataSource={[]} pagination={pagination} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  orderReducers: state.taskPoolReducers
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Log)
