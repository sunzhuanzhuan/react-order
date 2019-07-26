import React, { Component } from 'react'
import { Modal, Table, message, Icon, Typography, Button, Divider } from 'antd'
import { SH2 } from '@/base/SectionHeader'
import { bindActionCreators } from 'redux'
import * as commonActions from '@/actions'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { IconInfoBlock } from "@/base/DataGroup";
import {
  TaskBudgetConsumptions,
  TaskInfo,
  TaskStatus
} from "@/taskPool/base/ColumnsDataGroup";
import { NavLink } from "react-router-dom";

const { Title } = Typography;

class TaskManageList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      search: {
        currentPage: 1,
        pageSize: 10
      }
    }
    this.columns = [
      {
        title: '任务信息',
        dataIndex: 'orderName',
        width: 220,
        render: (name, record) => {
          return <TaskInfo platformId={record.platformId} name={name} id={record.id} />
        }
      },
      {
        title: '客户名称',
        dataIndex: 'companyName',
        render: (name, record) => {
          return <div>
            {name}
          </div>
        }
      },
      {
        title: '创建人',
        dataIndex: 'createdName',
        render: (name, record) => {
          return <div>
            {name}
          </div>
        }
      },
      {
        title: '已领博主数',
        dataIndex: 'mcnCount',
        render: (mcnCount, record) => {
          return <div>
            {mcnCount || 0} 个
          </div>
        }
      },
      {
        title: '任务状态',
        dataIndex: 'orderState',
        render: (state, record) => {
          return <TaskStatus status={state} date={record.orderEndDate} />
        }
      },
      {
        title: '预算消耗',
        dataIndex: 'totalAmount',
        width: 220,
        align: "right",
        render: (totalAmount, record) => {
          return <TaskBudgetConsumptions total={totalAmount} used={record.usedAmount} state={record.orderStatus} />
        }
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (id, record) => {
          return <div>
            <NavLink to={'/order/task/detail/' + id}>查看</NavLink>
            {record.orderState === 1 && <span>
              <Divider type="vertical" />
              <a onClick={() => this.offline(id)}>下线</a>
            </span>}
          </div>
        }
      }
    ]
    this.isOfflineRequest = false
  }

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.TPTaskManageList(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }

  // 下线
  offline = (id) => {
    // 判断是否有一个下线请求处理中
    /*if (this.isOfflineRequest) return
    this.isOfflineRequest = true*/
    const { actions } = this.props
    Modal.confirm({
      title: '确认要下线此任务吗?',
      content: "任务下线后，不可重新上线。已领取任务的博主，可执行。未消耗的余额，会在之后返还到您的任务账户余额中。",
      onOk: () => {
        return actions.TPOffline({ id }).then(() => {
          message.success('下线成功')
          this.getList()
        })
      }
    })
  }

  componentDidMount() {
    this.getList()
  }

  render() {
    const { actions, history, taskPoolReducers } = this.props
    // const { search: { currentPage } } = this.state
    const { taskManageList: { keys, source, total, pageNum, pageSize } } = taskPoolReducers

    const dataSource = keys.map(key => source[key])
    const pagination = {
      total,
      pageSize,
      current: pageNum,
      onChange: (current) => {
        this.getList({ currentPage: current })
      },
      showQuickJumper: true,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        this.getList({ pageSize })
      }
    }
    return <div className='task-pool-page-container manage-page'>
      <Title level={4}>任务管理</Title>
      <div style={{ padding: '0 0 16px 0' }}>
        <Button type="primary" onClick={() => {
          history.push('/order/task/create')
        }}>
          <Icon type="plus" />新建任务
        </Button>
      </div>
      <Table
        loading={this.state.listLoading}
        dataSource={dataSource}
        pagination={pagination}
        columns={this.columns}
      />
    </div>
  }
}


const mapStateToProps = (state) => ({
  common: state.commonReducers,
  taskPoolReducers: state.taskPoolReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskManageList)
