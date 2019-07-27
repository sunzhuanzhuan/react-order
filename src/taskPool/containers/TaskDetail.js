import React, { Component } from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonActions from '@/actions'
import * as actions from '../actions'
import {
  PageHeader,
  Descriptions,
  Button,
  Divider,
  Table,
  Modal,
  Badge, message
} from 'antd'
import Section from "@/base/Section";
import { KolInfo, QAStatus } from "@/taskPool/base/ColumnsDataGroup";
import Yuan from "@/base/Yuan";
import { WBYPlatformIcon } from "wbyui";
import { getCountDownTimeText } from "@/taskPool/constants/utils";
import { mcnOrderList, taskDetail } from "@/taskPool/reducers";

const columns = [
  {
    title: '博主',
    align: "center",
    dataIndex: 'snsName',
    render: (name, record) => {
      return <KolInfo title={name} avatar={record.avatarUrl}/>
    }
  },
  {
    title: '领取时间',
    align: "center",
    dataIndex: 'real_name_2',
    render: (name, record) => {
      return "2019-11-11 11:00:00"
    }
  },
  {
    title: '执行状态',
    align: "center",
    dataIndex: 'orderState',
    render: (name, record) => {
      return "已执行"
    }
  },
  {
    title: '质检状态',
    align: "center",
    dataIndex: 'orderState1',
    render: (status, record) => {
      return <QAStatus status={status}/>
    }
  },
  {
    title: '阅读数',
    align: "center",
    dataIndex: 'realActionNum',
    render: (realActionNum, record) => {
      return <div>{realActionNum}</div>
    }
  },
  {
    title: '结算价格',
    align: "center",
    dataIndex: 'realAmount',
    render: (realAmount, record) => {
      return <Yuan value={realAmount} format={"0,0.00"} style={{ color: "#333" }} />
    }
  },
  {
    title: '操作',
    dataIndex: 'real_name_7',
    align: "center",
    render: (name, record) => {
      return <div>
        <a>查看文章</a>
        <span>
          <Divider type="vertical" />
          <a onClick={() => this.offline(name)}>查看快照</a>
        </span>
      </div>
    }
  }
]

const statusKeyToProps = {
  '1': {
    status: 'processing',
    text: '进行中'
  },
  '2': {
    status: 'success',
    text: '已结束'
  },
  '3': {
    status: 'default',
    text: '已下线'
  },
  '4': {
    status: 'error',
    text: '已过期'
  }
}

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        page: {
          currentPage: 1,
          pageSize: 9999
        }
      },
      listLoading: false,
      detailLoading: false
    }
  }

  // 下线
  offline = (id) => {
    const { actions } = this.props
    Modal.confirm({
      title: '确认要下线此任务吗?',
      content: "任务下线后，不可重新上线。已领取任务的博主，可执行。未消耗的余额，会在之后返还到您的任务账户余额中。",
      onOk: () => {
        return actions.TPOffline({ id }).then(() => {
          message.success('下线成功')
          this.getDetail()
        })
      }
    })
  }

  getDetail = () => {
    const { actions, match } = this.props
    const { id } = match.params
    this.setState({ detailLoading: true });
    actions.TPTaskDetail({ id }).finally(() => {
      this.setState({ detailLoading: false })
    })
  }

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.TPMcnOrderList(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }

  componentDidMount() {
    this.getDetail()
    this.getList()
  }

  render() {
    const { actions, history, taskPoolReducers } = this.props
    const { listLoading, search } = this.state
    const { mcnOrderList: { keys, source }, taskDetail } = taskPoolReducers

    const dataSource = keys.map(key => source[key])
    return <div className='task-pool-page-container detail-page'>
      <PageHeader
        onBack={() => this.props.history.push('/order/task/manage')}
        title="任务详情"
        extra={
          taskDetail.orderState === 1 ? <Button type="primary" ghost onClick={() => this.offline()}>
            下线
          </Button> : '已下线'
        }
      />
      <Section>
        <Section.Header title="基本信息" level={5} />
        <Section.Content>
          <Descriptions title="">
            <Descriptions.Item label="任务ID">{taskDetail.id}</Descriptions.Item>
            <Descriptions.Item label="任务名称">{taskDetail.orderName}</Descriptions.Item>
            <Descriptions.Item label="发布平台">
              <div style={{
                top: "-5px",
                position: "relative",
                userSelect: "none"
              }}>
                <WBYPlatformIcon weibo_type={taskDetail.platformId} widthSize={22} />
                &nbsp;
                <span>新浪微博</span>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="行业分类">{taskDetail.industry}</Descriptions.Item>
            <Descriptions.Item label="任务目标">阅读数</Descriptions.Item>
            <Descriptions.Item label="发布位置">多图文第一条</Descriptions.Item>
            <Descriptions.Item label="内容形式">直发</Descriptions.Item>
            <Descriptions.Item label="任务开始时间">
              {taskDetail.createdAt}
            </Descriptions.Item>
            <Descriptions.Item label="任务结束时间">
              {taskDetail.orderEndDate}
            </Descriptions.Item>
            <Descriptions.Item label="任务剩余时间">
              {getCountDownTimeText(taskDetail.orderEndDate)}
            </Descriptions.Item>
            <Descriptions.Item label="发布后保留时长">{taskDetail.retainTime}小时</Descriptions.Item>
            <Descriptions.Item label="推广文章">
              <div className="content-wrap">
                <div className='image-wrap'>
                  <img src={(taskDetail.adOrderWeixinContent || {}).coverImageUrl} alt="" />
                </div>
                <a>查看文章</a>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </Section.Content>
      </Section>
      <Section>
        <Section.Header title="执行进度" level={5} />
        <Section.Content>
          <Descriptions title="">
            <Descriptions.Item label="任务状态">
              <Badge {...statusKeyToProps[taskDetail.orderState]} />
            </Descriptions.Item>
            <Descriptions.Item label="已领取博主数">{taskDetail.mcnCount} 位</Descriptions.Item>
            <Descriptions.Item label="消耗/预算">
              <Yuan value={taskDetail.usedAmount} />
              /
              <Yuan value={taskDetail.totalAmount} />
            </Descriptions.Item>
            <Descriptions.Item label="预估最低阅读数">{taskDetail.actionNum}</Descriptions.Item>
            <Descriptions.Item label="已达成阅读数">{taskDetail.actionNum}</Descriptions.Item>
          </Descriptions>
        </Section.Content>
      </Section>
      <Section>
        <Section.Header title={<span>已领取博主 {
          <span className='text-red'>33</span>} 位</span>} level={5} />
        <Section.Content>
          <Table
            loading={listLoading}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            size="default"
          />
        </Section.Content>
      </Section>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail)
