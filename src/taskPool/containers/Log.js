import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { bindActionCreators } from 'redux';



const Log = (props) => {
  const [listLoading, setListLoading] = useState(false)
  const columns = [
    {
      title: '用户名',
      dataIndex: 'id',
      width: '30%',
      key: 'id'
    },
    {
      title: '记录时间',
      width: '30%',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作记录',
      width: '40%',
      dataIndex: 'remark',
      key: 'remark',
    }
  ]
  useEffect(() => {
    let params = {
      page: {
        currentPage: 1,
        pageSize: 50
      }
    }
    getList(params)
  }, [])

  const getList = (params) => {
    setListLoading(true)
    props.actions.TPPostOperationLog(params).then(() => {
      setListLoading(false)
    })
  }
  const pagination = {
    total: 100,
    pageSize: 10,
    currentPage: 1,
    onChange: (current) => {
      let params = {
        page: {
          currentPage: current,
          pageSize: 50
        }
      }
      getList(params)
    },
    showQuickJumper: true
  }
  const { log = [] } = props.clueReducers
  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>操作日志列表</h2>
      {log && <Table loading={listLoading} columns={columns} dataSource={log} pagination={pagination} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  clueReducers: state.taskPoolReducers
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Log)
