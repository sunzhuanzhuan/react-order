import React, { Component } from 'react'
import {
  Modal,
  Table,
  Badge,
  Icon,
  Typography,
  Button,
  Divider,
  Tag
} from 'antd'
import { SH2 } from '@/base/SectionHeader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as commonActions from '@/actions'
import * as actions from '../actions'
import { IconInfoBlock } from "@/base/DataGroup";
import {
  KolInfo, StatisticsData
} from "@/taskPool/base/ColumnsDataGroup";
import Yuan from "@/base/Yuan";
import { ReviewPass, ReviewReject } from '../components/ReviewModal'


const { Title } = Typography;

class TaskReviewList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      search: {
        page: {
          currentPage: 1,
          pageSize: 20
        }
      },
      listLoading: false,
      taskId: '',
      actionType: '',
      platform: ''
    }
    this.columns = [
      {
        title: '任务信息',
        dataIndex: 'orderName',
        render: (name, record) => {
          return <div>
            <Tag>{record.qualityInspectionCount}</Tag>
            <a>{name}</a>
          </div>
        }
      },
      {
        title: '领取时间',
        dataIndex: 'createdAt',
        align: "center",
        render: (date, record) => {
          return <div>
            {date}
          </div>
        }
      },
      {
        title: '博主信息',
        dataIndex: 'snsName',
        align: "center",
        render: (name, record) => {
          return <KolInfo title={name} avatar={record.avatarUrl} />
        }
      },
      {
        title: '结算价格',
        dataIndex: 'maxAmount',
        align: "center",
        render: (maxAmount, record) => {
          return <Yuan value={maxAmount} />
        }
      },
      {
        title: '最低/实际',
        dataIndex: 'expectActionNum',
        align: "center",
        render: (expectActionNum, record) => {
          let iconType = record.platformId === 1 ? "icon-zhuanfa" : "icon-yuedu"
          return <StatisticsData format={"0,0"} value={[expectActionNum, record.realActionNum]} iconType={iconType}/>
        }
      },
      {
        title: '预览',
        dataIndex: 'contentUrl',
        align: "center",
        render: (contentUrl, record) => {
          return <a href={contentUrl}>查看文章</a>
        }
      },
      {
        title: '操作',
        dataIndex: 'isApprove',
        align: "center",
        render: (isApprove, record) => {
          return isApprove === 1 ? <div>
            <Button type="primary" size="small" onClick={() => this.review('pass', record.id, record.platformId)}>通过</Button>
            <Button type="danger" ghost size="small" style={{ marginLeft: "10px" }} onClick={() => this.review('reject', record.id)}>不通过</Button>
          </div> : <div>
            {isApprove === 2 && "质检通过"}
            {isApprove === 3 && "质检不通过"}
          </div>
        }
      },
      {
        title: '备注',
        dataIndex: 'remark',
        align: "center",
        render: (remark, record) => {
          return <div style={{ maxWidth: 200, wordBreak: "break-all" }}>
            {remark}
          </div>
        }
      }
    ]
  }

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.TPGetMcnReviewOrderList(search).finally(() => {
      this.setState({ listLoading: false })
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
    const { actions, taskPoolData } = this.props
    const { actionType, taskId, platform, listLoading, search } = this.state
    const { mcnReviewOrderList: { keys, source, total, pageNum, pageSize } } = taskPoolData
    const dataSource = keys.map(key => source[key])

    const pagination = {
      total,
      pageSize,
      current: pageNum,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: (currentPage) => {
        this.getList({
          page: { ...search.page, currentPage }
        })
      },
      onShowSizeChange: (currentPage, pageSize) => {
        this.getList({
          page: { ...search.page, pageSize }
        })
      }
    }
    return <div className='task-pool-page-container review-page'>
      <Title level={4}>异常任务审核</Title>
      <Table
        loading={listLoading}
        dataSource={dataSource}
        pagination={pagination}
        columns={this.columns}
      />
      {actionType === "pass" &&
      <ReviewPass id={taskId} platform={platform} actions={actions} cancel={this.cancel} reload={this.getList} />}
      {actionType === "reject" &&
      <ReviewReject id={taskId} actions={actions} cancel={this.cancel} reload={this.getList} />}
    </div>
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskReviewList)
