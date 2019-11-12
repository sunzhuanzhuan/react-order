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
import {
  KolInfo,
  QAStatus,
  TaskStatus
} from "@/taskPool/base/ColumnsDataGroup";
import Yuan from "@/base/Yuan";
import { WBYPlatformIcon } from "wbyui";
import {
  dateDisplayByLen,
  getCountDownTimeText,
  openNewWindowPreviewForWeibo, openNewWindowPreviewForWeixin
} from "@/taskPool/constants/utils";
import { mcnOrderList, taskDetail } from "@/taskPool/reducers";
import { convertRawToHTML } from 'braft-convert'
import {
  AD_ORDER_STATE_OFFLINE,
  MCN_ORDER_STATE_CANCEL,
  MCN_ORDER_STATE_UNQUALIFIED
} from "@/taskPool/constants/config";

const columns = [
  {
    title: '博主',
    dataIndex: 'snsName',
    render: (name, record) => {
      return <KolInfo title={name} avatar={record.avatarUrl} />
    }
  },
  {
    title: 'Account_ID',
    dataIndex: 'accountId',
    render: (data, record) => {
      return data
    }
  },
  {
    title: '领取时间',
    align: "center",
    dataIndex: 'createdAt',
    render: (date, record) => {
      return dateDisplayByLen(date, "m")
    }
  },
  {
    title: '执行状态',
    align: "center",
    dataIndex: 'executionState',
    render: (executionState, record) => {
      return executionState === 1 ? "已执行" : "未执行"
    }
  },
  {
    title: '质检状态',
    align: "center",
    dataIndex: 'orderState',
    render: (status, record) => {
      return <QAStatus status={status} />
    }
  },
  {
    title: 'KPI阅读/实际阅读',
    align: "center",
    dataIndex: 'KPI阅读/实际阅读',
    render: (data, record) => {
      const { expectActionNum, realActionNum } = record;
      return `${expectActionNum || 0}/${realActionNum || 0}`
    }
  },
  // {
  //   title: '达成数',
  //   align: "center",
  //   dataIndex: 'realActionNum',
  //   render: (realActionNum, record) => {
  //     return <div>{record.orderState === MCN_ORDER_STATE_UNQUALIFIED ? "-" : realActionNum || '-'}</div>
  //   }
  // },
  {
    title: '结算价格',
    align: "center",
    dataIndex: 'adRealAmount',
    render: (amount, record) => {
      return <Yuan value={record.orderState === MCN_ORDER_STATE_UNQUALIFIED ? 0 : amount} format={"0,0.00"} style={{ color: "#333" }} />
    }
  },
  {
    title: '成本价格',
    align: "center",
    dataIndex: 'realAmount',
    render: (amount, record) => {
      return <Yuan value={record.orderState === MCN_ORDER_STATE_UNQUALIFIED ? 0 : amount} format={"0,0.00"} style={{ color: "#333" }} />
    }
  },
  {
    title: '操作',
    dataIndex: 'contentUrl',
    align: "center",
    render: (url, record) => {
      return record.orderState === MCN_ORDER_STATE_CANCEL ? null : <div>
        {url && <a target="_blank" href={url}>查看文章</a>}
        {record.snapshotUrl && <span>
          <Divider type="vertical" />
          <a target="_blank" href={record.snapshotUrl}>查看快照</a>
        </span>}
      </div>
    }
  }
]

const target = {
  "11": "阅读数", "12": "阅读数", "21": "粉丝覆盖", "22": "粉丝传播"
}
const contentStyle = {
  "11": "多图文第一条", "12": "不限", "21": "直发", "22": "转发"
}

const WXContentStyle = {
  "w1": "多图文第一条", "w2": "多图文第二条", "w3": "多图文第三-N条"
}

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        page: {
          currentPage: 1,
          pageSize: 20
        },
        form: {
          adOrderId: Number(props.match.params.id)
        }
      },
      listLoading: false,
      detailLoading: false
    }
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.TPTaskDetailClear()
  }

  // 下线
  offline = (id) => {
    const { actions } = this.props
    Modal.confirm({
      title: '确认要下线此蜂窝派任务吗?',
      content: "蜂窝派任务下线后，不可重新上线。已领取蜂窝派任务的博主，可执行。未消耗的余额，会在之后返还到您的蜂窝派任务账户余额中。",
      onOk: () => {
        return actions.TPOffline({ id }).then(() => {
          message.success('下线成功')
          this.getDetail()
        })
      }
    })
  }

  preview = () => {
    const { taskDetail } = this.props.taskPoolData
    // 微博
    if (taskDetail.platformId === 1) {
      const content = taskDetail.adOrderWeiboContent
      const videoObj = content.attachmentList[0] || {}
      return openNewWindowPreviewForWeibo({
        content: content.content,
        video: videoObj.attachmentUrl,
        images: content.attachmentList.map(item => item.attachmentUrl),
        mediaType: content.mediaType
      })
    }
    // 微信
    if (taskDetail.platformId === 9) {
      const content = taskDetail.adOrderWeixinContent
      let richContent;
      try {
        richContent = convertRawToHTML(JSON.parse(content.content))
      } catch (e) {
        richContent = content.content
      }
      return openNewWindowPreviewForWeixin({
        title: content.title,
        content: richContent,
        remark: content.remark,
        author: content.author,
        articleUrl: content.articleUrl
      })
    }
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

  getLocationLimited = (budget) => {
    const { locationInfo } = budget;
    return <div className='locationLimited'>{ locationInfo || '-' }</div>;
  }

  render() {
    const { actions, history, taskPoolData } = this.props
    const { listLoading, search } = this.state
    const { mcnOrderList: { keys, source, total, pageNum, pageSize }, taskDetail } = taskPoolData
    const isWeixin = taskDetail.platformId === 9
    const isWeibo = taskDetail.platformId === 1

    const dataSource = keys.map(key => source[key]);
    return <div className='task-pool-page-container detail-page'>
      <PageHeader
        onBack={() => this.props.history.go(-1)}
        title="蜂窝派任务详情"
        extra={
          taskDetail.orderState === 1 ?
            <Button type="primary" ghost onClick={() => this.offline(taskDetail.id)}>
              下线
            </Button> : <TaskStatus status={taskDetail.orderState} />
        }
      />
      <Section>
        <Section.Header title="基本信息" level={5} />
        <Section.Content>
          <Descriptions title="">
            <Descriptions.Item label="任务ID">{taskDetail.id}</Descriptions.Item>
            <Descriptions.Item label="任务名称">{taskDetail.orderName}</Descriptions.Item>
            <Descriptions.Item label="发布平台">
              <div style={{ userSelect: "none" }}>
                <WBYPlatformIcon weibo_type={taskDetail.platformId} widthSize={22} />
                &nbsp;
                {isWeixin &&
                <span style={{ verticalAlign: "text-bottom" }}>微信公众号</span>}
                {isWeibo &&
                <span style={{ verticalAlign: "text-bottom" }}>新浪微博</span>}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="行业分类">{taskDetail.industryName}</Descriptions.Item>
            <Descriptions.Item label="任务目标">{target[taskDetail.taskTarget]}</Descriptions.Item>
            {isWeixin &&
            <Descriptions.Item label="发布位置">{this.getLocationLimited(taskDetail.adOrderWeixinContent)}</Descriptions.Item>}
            {isWeibo &&
            <Descriptions.Item label="内容形式">{contentStyle[taskDetail.taskContentStyle]}</Descriptions.Item>}
            <Descriptions.Item label="任务开始时间">
              {dateDisplayByLen(taskDetail.createdAt, 'm')}
            </Descriptions.Item>
            <Descriptions.Item label="任务结束时间">
              {dateDisplayByLen(taskDetail.orderEndDate, 'm')}
            </Descriptions.Item>
            <Descriptions.Item label="任务剩余时间">
              {getCountDownTimeText(taskDetail.orderEndDate)}
            </Descriptions.Item>
            <Descriptions.Item label="发布后保留时长">{taskDetail.retainTime}小时</Descriptions.Item>
            {isWeixin && <Descriptions.Item label="推广文章">
              <div className="content-wrap">
                <div className='image-wrap'>
                  <img src={(taskDetail.adOrderWeixinContent || {}).coverImageUrl} alt="" />
                </div>
                <a onClick={this.preview}>查看文章</a>
              </div>
            </Descriptions.Item>}
            {isWeibo && <Descriptions.Item label="推广文章">
              <a onClick={this.preview}>查看</a>
            </Descriptions.Item>}
          </Descriptions>
        </Section.Content>
      </Section>
      <Section>
        <Section.Header title="执行进度" level={5} />
        <Section.Content>
          <Descriptions title="">
            <Descriptions.Item label="任务状态">
              <TaskStatus status={taskDetail.orderState} />
            </Descriptions.Item>
            <Descriptions.Item label="有效执行博主数">{taskDetail.mcnCount || 0} 位</Descriptions.Item>
            <Descriptions.Item label="可用/预算">
              <Yuan value={taskDetail.availableAmount} className="text-red text-bold" />
              &nbsp;/&nbsp;
              <Yuan value={taskDetail.totalAmount} className="text-black text-bold" />
            </Descriptions.Item>
            <Descriptions.Item label={`预估最低${isWeixin ? "阅读数" : "转发数"}`}>{taskDetail.actionNum || '-'}</Descriptions.Item>
            <Descriptions.Item label={`已达成${isWeixin ? "阅读数" : "转发数"}`}>{taskDetail.realActionNum || '-'}</Descriptions.Item>
          </Descriptions>
        </Section.Content>
      </Section>
      <Section>
        <Section.Header title={<span>已领取博主 {
          <span className='text-red'>{total}</span>} 位</span>} level={5} />
        <Section.Content>
          <Table
            loading={listLoading}
            dataSource={dataSource}
            columns={columns}
            pagination={{
              size: 'small',
              total,
              pageSize,
              current: pageNum,
              onChange: (currentPage) => {
                this.getList({
                  page: { ...search.page, currentPage }
                })
              }
            }}
            size="default"
          />
        </Section.Content>
      </Section>
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
)(TaskDetail)
