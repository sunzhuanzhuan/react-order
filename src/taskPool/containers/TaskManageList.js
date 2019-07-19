import React, { Component } from 'react'
import { Modal, Table, message, Icon, Typography, Button, Divider } from 'antd'
import { SH2 } from '@/base/SectionHeader'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { IconInfoBlock } from "@/base/DataGroup";
import {
  TaskBudgetConsumptions,
  TaskInfo,
  TaskStatus
} from "@/taskPool/base/ColumnsDataGroup";

const { Title } = Typography;

class TaskManageList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      search: {
        page: 1,
        pageSize: 50
      }
    }
    this.columns = [
      {
        title: '任务信息',
        dataIndex: 'real_name_1',
        render: (name, record) => {
          return <TaskInfo platformId={9} name="任务消息任务消息任务消息任务消息任务消息任务消息" id={3333} />
        }
      },
      {
        title: '客户名称',
        dataIndex: 'real_name_2',
        render: (name, record) => {
          return <div>
            小南瓜爸爸001
          </div>
        }
      },
      {
        title: '创建人',
        dataIndex: 'real_name_3',
        render: (name, record) => {
          return <div>
            小南瓜爸爸001
          </div>
        }
      },
      {
        title: '已领博主数',
        dataIndex: 'real_name_4',
        render: (name, record) => {
          return <div>
            38个
          </div>
        }
      },
      {
        title: '任务状态',
        dataIndex: 'real_name_5',
        render: (name, record) => {
          return <TaskStatus status={4} />
        }
      },
      {
        title: '预算消耗',
        dataIndex: 'real_name_6',
        width: 220,
        align: "right",
        render: (name, record) => {
          return <TaskBudgetConsumptions/>
        }
      },
      {
        title: '操作',
        dataIndex: 'real_name_7',
        render: (name, record) => {
          return <div>
            <a>查看</a>
            <span>
              <Divider type="vertical" />
              <a onClick={() => this.offline(name)}>下线</a>
            </span>
          </div>
        }
      }
    ]
  }

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    // this.setState({ listLoading: true, search })
    /*actions.getSummaryListByOrder(search).finally(() => {
      this.setState({ listLoading: false })
    })*/
  }

  // 下线
  offline = (id) => {
    // 判断是否有一个下线请求处理中
    Modal.confirm({
      title: '确认要下线此任务吗?',
      content: "任务下线后，不可重新上线。已领取任务的博主，可执行。未消耗的余额，会在之后返还到您的任务账户余额中。"
    })
  }

  componentDidMount() {
    this.getList()
  }

  render() {
    const { actions, history } = this.props
    const data = [
      {}
    ]
    const pagination = {
      total: 10,
      pageSize: 10,
      current: 1,
      onChange: (current) => {
        this.getList({ page: current })
      },
      showQuickJumper: true
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
        dataSource={data}
        pagination={pagination}
        columns={this.columns}
      />
    </div>
  }
}


const mapStateToProps = (state) => ({
  common: state.commonReducers,
  closingReport: state.closingReportReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskManageList)
