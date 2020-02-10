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
      dataIndex: 'createdName',
      align: 'center',
      width: '30%',
      key: 'createdName'
    },
    {
      title: '记录时间',
      align: 'center',
      width: '30%',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作记录',
      align: 'center',
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
  const { log: { list = [], total, pageNum, pageSize } } = props.clueReducers
  const pagination = {
    total: total,
    pageSize: pageSize,
    current: pageNum,
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
  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>操作日志列表</h2>
      {list && <Table loading={listLoading} columns={columns} dataSource={list} pagination={pagination} />}
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
