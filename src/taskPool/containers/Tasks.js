/**
 * Created by lzb on 2019-12-03.
 */
import React, {} from 'react';
import { Table, Tabs, Typography } from 'antd';
import Filters from '../components/Task/Filters';
import { bindActionCreators } from 'redux';
import * as commonActions from '@/actions';
import * as actions from '@/taskPool/actions';
import { connect } from 'react-redux';

const { Title } = Typography;

const Tasks = (props) => {

  const columns = [
    {
      title: '任务ID',
      dataIndex: 'execution_evidence_code',
    }, {
      title: '任务名称',
      dataIndex: 'weibo_type',
      width: 150,
    }, {
      title: '任务创建时间',
      dataIndex: 'submitter_at',
      width: 230,
    }, {
      title: '任务起止时间',
      dataIndex: 'submitter_at2',
      width: 230,
    }, {
      title: '创建人',
      dataIndex: 'subm',
      width: 230,
    }, {
      title: '客户名称',
      width: 150,
      dataIndex: 'company_name',
    }, {
      title: '任务类型',
      dataIndex: 'summary_name',
    }, {
      title: '任务状态',
      dataIndex: 'summary_status',
      width: 200
    }, {
      title: '领取数/申请数',
      dataIndex: 'requiremsent_name',
    }, {
      title: '已用预算/可用预算',
      dataIndex: 'brand_name',
      width: 190,
    }, {
      title: '操作',
      fixed: 'right',
      width: 70,
      dataIndex: 'actions',
    }
  ]

  const getList = (params = {}) => {
    /*const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.getSummaryListByOrder(search).finally(() => {
      this.setState({ listLoading: false })
    })*/
  }

  const pagination = {
    total:100,
    pageSize:10,
    current: 1,
    onChange: (current) => {
      getList({ pageNum: current })
    },
    showQuickJumper: true
  }

  return (
    <div className='task-pool-page-container tasks-page'>
      <Title level={4}>任务管理</Title>
      <Filters search={getList}/>
      <Table
        loading={false}
        dataSource={[]}
        scroll={{x: 1800}}
        pagination={pagination}
        columns={columns}
      />
    </div>
  );
};



const mapStateToProps = (state) => ({
  common: state.commonReducers,
  taskPoolData: state.taskPoolReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
