import React, { Component } from 'react'
import { Modal, Table, Badge, Icon, Typography, Button, Divider } from 'antd'
import { SH2 } from '@/base/SectionHeader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as commonAction from "@/actions";
import * as action from "@/taskPool/actions";
import { IconInfoBlock } from "@/base/DataGroup";
import {
  KolInfo, StatisticsData,
} from "@/taskPool/base/ColumnsDataGroup";
import Yuan from "@/base/Yuan";
import { ReviewPass, ReviewReject } from '../components/ReviewModal'


const { Title } = Typography;

class TaskReviewList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      search: {
        page: 1,
        pageSize: 50
      },
      taskId: '',
      actionType: 'reject',
      platform: '',
    }
    this.columns = [
      {
        title: '任务信息',
        dataIndex: 'real_name_1',
        align: "center",
        render: (name, record) => {
          return <div>
            <span>1.</span>
            <a>这里显示的是好…</a>
          </div>
        }
      },
      {
        title: '领取时间',
        dataIndex: 'real_name_2',
        align: "center",
        render: (name, record) => {
          return <div>
            2019-06-18 20:30
          </div>
        }
      },
      {
        title: '博主信息',
        dataIndex: 'real_name_3',
        align: "center",
        render: (name, record) => {
          return <KolInfo />
        }
      },
      {
        title: '结算价格',
        dataIndex: 'real_name_4',
        align: "center",
        render: (name, record) => {
          return <Yuan value={40000} />
        }
      },
      {
        title: '最低/实际',
        dataIndex: 'real_name_5',
        align: "center",
        render: (name, record) => {
          return <StatisticsData format={"0,0"} value={[]} />
        }
      },
      {
        title: '预览',
        dataIndex: 'real_name_6',
        align: "center",
        render: (name, record) => {
          return <a href="">查看文章</a>
        }
      },
      {
        title: '操作',
        dataIndex: 'real_name_7',
        align: "center",
        render: (name, record) => {
          return <div>
            <Button type="primary" size="small" onClick={() => this.review('pass', name, 1)}>通过</Button>
            <Button type="danger" ghost size="small" style={{ marginLeft: "10px" }} onClick={() => this.review('reject', name)}>不通过</Button>
          </div>
        }
      },
      {
        title: '备注',
        dataIndex: 'real_name_61',
        align: "center",
        render: (name, record) => {
          return <div style={{ maxWidth: 200, wordBreak: "break-all" }}>
            安师大收到sssssssssssssssssssssssssssssssssssssssssssssssss
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

  cancel = () => {
    this.review()
  }

  review = (type, id, platform) => {
    this.setState({
      taskId: id,
      actionType: type,
      platform: platform
    })
  }

  componentDidMount() {
    this.getList()
  }

  render() {
    const { actions, history } = this.props
    const { actionType, taskId, platform } = this.state
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
    return <div className='task-pool-page-container review-page'>
      <Title level={4}>异常任务审核</Title>
      <Table
        loading={this.state.listLoading}
        dataSource={data}
        pagination={pagination}
        columns={this.columns}
      />
      {actionType === "pass" && <ReviewPass id={taskId} platform={platform} actions={actions} cancel={this.cancel}/>}
      {actionType === "reject" && <ReviewReject id={taskId} actions={actions} cancel={this.cancel}/>}
    </div>
  }
}
const mapStateToProps = (state) => {
  return {
    // accountManage: state.accountManageReducer,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...commonAction, ...action }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskReviewList)
