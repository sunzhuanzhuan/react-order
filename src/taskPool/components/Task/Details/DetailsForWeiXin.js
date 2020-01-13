/**
 * Created by lzb on 2020-01-07.
 */
import React, { Component } from "react"
import {
  PageHeader,
  Descriptions,
  Button,
  Divider,
  Table,
  Modal,
  Badge, message, Rate
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
  openNewWindowPreviewForWeixin
} from "@/taskPool/constants/utils";
import { convertRawToHTML } from 'braft-convert'
import {
  AD_ORDER_STATE_OFFLINE, AD_ORDER_STATE_PROCESSING, AD_ORDER_STATE_WAIT_RELEASED,
  MCN_ORDER_STATE_CANCEL,
  MCN_ORDER_STATE_UNQUALIFIED, MEDIA_TASK_PATTERN_BIDDING, MEDIA_TASK_PATTERN_RUSH
} from "@/taskPool/constants/config";
import numeral from '@/util/numeralExpand';
import { Link } from 'react-router-dom'
import OrderMcnStatus from '@/taskPool/base/OrderMcnStatus';
import { TaskRemainingTime } from '@/taskPool/base/ColumnsDataGroup/TaskStatus';


class RaterModal extends React.Component {
  state = {
    value: 0,
    loading: false
  };

  handleChange = value => {
    this.setState({ value });
  };

  submit = () => {
    this.setState({ loading: true });
    this.props.action({
      mcnOrderId: this.props.id,
      orderScore: this.state.value
    }).then(() => {
      this.setState({ loading: false });
      this.props.cancel()
    }).catch(() => {
      this.setState({ loading: false });
    })
  }

  render() {
    const { value, loading } = this.state;
    const desc = [ '1星', '2星', '3星', '4星', '5星' ];
    return (
      <Modal visible width={300} footer={null} centered onCancel={this.props.cancel}>
        <div style={{ textAlign: 'center', paddingTop: 20 }}>
          总体
          <Rate style={{ margin: "0 10px" }} tooltips={desc} onChange={this.handleChange}
                value={value} />
          {/*{value ? <span>{desc[value - 1]}</span> : ""}*/}
          <br />
          <Button loading={loading} onClick={this.submit} disabled={!value}
                  style={{ marginTop: 20, width: 120 }} type="primary">确定</Button>
        </div>
      </Modal>
    );
  }
}

export default class DetailsForWeiXin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        page: {
          currentPage: 1,
          pageSize: 20
        },
        form: {
          adOrderId: props.id
        }
      },
      searchByTemp: {
        page: {
          currentPage: 1,
          pageSize: 20
        },
        form: {
          adOrderId: props.id,
          isReceive: 1
        }
      },
      listLoading: false,
      listLoadingByTemp: false,
      raterOrderId: 0
    }

    this.columns = [
      {
        title: '博主名称',
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
        dataIndex: 'receiveAt',
        render: (date, record) => {
          return dateDisplayByLen(date, "m")
        }
      },
      {
        title: '预计推送时间',
        align: "center",
        dataIndex: 'expectedPublishedTime',
        render: (date, record) => {
          return dateDisplayByLen(date, "m")
        }
      },
      {
        title: '图文发布位置',
        align: "center",
        dataIndex: 'locationLimitedInfo',
        render: (locationLimitedInfo, record) => {
          return locationLimitedInfo
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
      {
        title: '预算消耗',
        align: "center",
        dataIndex: 'adAmount',
        render: (amount, record) => {
          return <Yuan value={record.orderState === MCN_ORDER_STATE_UNQUALIFIED ? 0 : amount}
                       format={"0,0.00"} style={{ color: "#333" }} />
        }
      },
      {
        title: '服务费消耗',
        align: "center",
        dataIndex: 'serviceAmount',
        render: (amount, record) => {
          return <Yuan value={record.orderState === MCN_ORDER_STATE_UNQUALIFIED ? 0 : amount}
                       format={"0,0.00"} style={{ color: "#333" }} />
        }
      },
      {
        title: '订单状态',
        align: "center",
        dataIndex: 'orderState',
        render: (state, record) => {
          return <OrderMcnStatus value={state} />
        }
      },
      {
        title: '操作',
        dataIndex: 'contentUrl',
        align: "center",
        render: (url, record) => {
          return record.orderState === MCN_ORDER_STATE_CANCEL ? null : <div>
            {url && <a target="_blank" href={url}>查看文章</a>}
            {record.snapshotUrl && <>
              <Divider type="vertical" />
              <a target="_blank" href={record.snapshotUrl}>查看快照</a>
            </>}
            <>
              <Divider type="vertical" />
              <Link to={`/order/task/orders-coodetail?orderId=${record.orderId}`}
                    target="_blank">查看数据统计</Link>
            </>
            <>
              <Divider type="vertical" />
              <a>评价</a>
            </>
          </div>
        }
      }
    ]
    this.columnsByTemp = [
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
          return <Yuan value={record.orderState === MCN_ORDER_STATE_UNQUALIFIED ? 0 : amount}
                       format={"0,0.00"} style={{ color: "#333" }} />
        }
      },
      {
        title: '成本价格',
        align: "center",
        dataIndex: 'realAmount',
        render: (amount, record) => {
          return <Yuan value={record.orderState === MCN_ORDER_STATE_UNQUALIFIED ? 0 : amount}
                       format={"0,0.00"} style={{ color: "#333" }} />
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
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.TPTaskDetailClear()
  }

  handleRater = (raterOrderId) => {
    this.setState({ raterOrderId });
  }

  // 下线任务
  offline = (id, record) => {
    const { actions, reload } = this.props
    Modal.confirm({
      title: '下线任务',
      content: `确认下线 ${record.companyName} —— “${record.orderName}” 的任务么？`,
      onOk: () => {
        return actions.TPOfflineTask({ id }).then(() => {
          message.success('下线成功')
          reload()
        })
      }
    })
  }
  // 上线任务
  online = (id, record) => {
    const { actions , reload } = this.props
    Modal.confirm({
      title: '上线任务',
      content: `任务还未到上线时间，确定要立即上线该任务么？？`,
      onOk: () => {
        return actions.TPOnlineTask({ id }).then(() => {
          message.success('上线成功')
          reload()
        })
      }
    })
  }
  // 终止任务
  stop = (id, record) => {
    const { actions, reload  } = this.props
    Modal.confirm({
      title: '终止任务',
      content: `确认终止 ${record.companyName} —— “${record.orderName}” 的任务么？`,
      onOk: () => {
        return actions.TPOfflineTask({ id }).then(() => {
          message.success('任务已终止')
          reload()
        })
      }
    })
  }

  preview = () => {
    const { details } = this.props

    const content = details.adOrderWeixinContent
    let richContent;
    try {
      richContent = convertRawToHTML(JSON.parse(content.content))
    }
    catch (e) {
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

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.TPMcnOrderList(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }
  getListByTemp = (params = {}) => {
    const { actions } = this.props
    let searchByTemp = { ...this.state.searchByTemp, ...params }
    this.setState({ listLoading: true, searchByTemp })
    actions.TPMcnOrderListByTemp(searchByTemp).finally(() => {
      this.setState({ listLoadingByTemp: false })
    })
  }


  // 预览博主限制
  getLimit = (features) => {
    let list = [
      {
        text: "粉丝量大于",
        val: features.followerCountLimit > 0 ? features.followerCountLimit : 0
      },
      {
        text: "近28天内有发文",
        val: features.mediaCountLimit ? "" : 0
      },
      {
        text: "28天内第一条平均阅读高于",
        val: features.mediaAvgReadNumLimit > 0 ? features.mediaAvgReadNumLimit : 0
      },
      {
        text: "性别比例",
        val: features.followerGenderRatioLimit > 0 ? (features.followerGenderRatioLimit === 1 ? "男性多" : "女性多") : 0
      },
      {
        text: "博主最低领取阅读数不低于",
        val: features.minNumOfReadLimit > 0 ? features.minNumOfReadLimit : 0
      },
      {
        text: "只允许认证号接单",
        val: features.onlyVerified ? "" : 0
      },
    ]

    const result = list.filter(({ val }) => val !== 0).map((item, n) => {
      return <div key={n}>{item.text + item.val}</div>
    })
    if (result.length === 0) {
      return "无限制"
    }
    return result
  }

  // 预览阅读单价
  getUnitPrice = (budget) => {
    const list = budget.quoteList || []
    return list.map(o => {
      return <div key={o.location}>{o.location} {numeral(o.price).format("0,0")}元/阅读</div>
    })
  }

  // 预览阅读数
  getReadNumber = (budget) => {
    const list = budget.quoteList || []
    return list.map(o => {
      return <div key={o.location}>{o.location} {numeral(o.price).format("0,0")}阅读</div>
    })
  }

  componentDidMount() {
    this.getList()
    this.getListByTemp()
  }

  render() {
    const { mcnOrderListByTemp, mcnOrderList: { keys, source, total, pageNum, pageSize }, details, actions } = this.props
    const { listLoading, search, listLoadingByTemp, searchByTemp, raterOrderId } = this.state

    const dataSource = keys.map(key => source[key]);
    const dataSourceByTemp = mcnOrderListByTemp.keys.map(key => mcnOrderListByTemp.source[key]);

    const features = details.adOrderWeixinContent

    return <>
      {raterOrderId > 0 && <RaterModal action={actions.TPMcnOrderEvaluate} cancel={() => this.handleRater(0)} id={raterOrderId} />}
      <PageHeader
        onBack={() => this.props.history.go(-1)}
        title="任务详情"
        extra={
          <>
            {
              details.orderState === AD_ORDER_STATE_WAIT_RELEASED &&
              <Button type="primary" ghost onClick={() => this.online(details.id, details)}>
                上线
              </Button>
            }
            {
              details.orderState === AD_ORDER_STATE_WAIT_RELEASED &&
              <Button type="primary" ghost onClick={() => this.stop(details.id, details)}>
                终止
              </Button>
            }
            {
              details.orderState === AD_ORDER_STATE_PROCESSING &&
              <Button type="primary" ghost onClick={() => this.offline(details.id, details)}>
                下线
              </Button>
            }
          </>
        }
      />
      <Section>
        <Section.Header title="基本信息" level={5} />
        <Section.Content>
          <Descriptions title="">
            <Descriptions.Item label="任务ID">{details.adOrderNumber}</Descriptions.Item>
            <Descriptions.Item label="任务模式">
              <div className='text-red'>
                {features.taskPattern === MEDIA_TASK_PATTERN_RUSH && "抢单模式"}
                {features.taskPattern === MEDIA_TASK_PATTERN_BIDDING && "竞标模式"}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="图文发布位置">
              <div className='text-red'>
                {features.locationInfo || '-'}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="任务开始时间">
              {dateDisplayByLen(details.orderStartDate, 'm')}
            </Descriptions.Item>
            <Descriptions.Item label="任务预算">
              {details.totalAmount}元
            </Descriptions.Item>
            <Descriptions.Item label="所属公司">{details.companyName}</Descriptions.Item>
            <Descriptions.Item label="任务结束时间">
              {dateDisplayByLen(details.orderEndDate, 'm')}
            </Descriptions.Item>
            <Descriptions.Item label="冻结服务费">
              {details.serviceFee}元
            </Descriptions.Item>
            <Descriptions.Item label="发布后保留时长">
              {features.retainTime}小时
            </Descriptions.Item>
            <Descriptions.Item label="任务持续时间">
              {getCountDownTimeText(details.orderEndDate, 0, 5, details.orderStartDate)}
            </Descriptions.Item>
            <Descriptions.Item label="实际扣款">
              {details.actualPayment}元
            </Descriptions.Item>
            <Descriptions.Item label="行业分类">
              {
                [details.taskIndustryInfo.parentName, details.taskIndustryInfo.industryName].filter(Boolean).join('/')
              }
            </Descriptions.Item>
            <Descriptions.Item label="博主限制">
              {this.getLimit(features)}
            </Descriptions.Item>
            {features.taskPattern === MEDIA_TASK_PATTERN_RUSH && <Descriptions.Item label="阅读单价">
              {this.getUnitPrice(features)}
            </Descriptions.Item>}
            {features.taskPattern === MEDIA_TASK_PATTERN_BIDDING && <Descriptions.Item label="阅读数">
              {this.getReadNumber(features)}
            </Descriptions.Item>}
            <Descriptions.Item label="推广文章">
              <div className="content-wrap">
                <div className='image-wrap'>
                  <img src={(details.adOrderWeixinContent || {}).coverImageUrl} alt="" />
                </div>
                <a onClick={this.preview}>查看文章</a>
              </div>
            </Descriptions.Item>
            {features.taskPattern === MEDIA_TASK_PATTERN_RUSH && <Descriptions.Item label="预计阅读数">
              {details.unifiedNumber}
            </Descriptions.Item>}
            {features.taskPattern === MEDIA_TASK_PATTERN_BIDDING && <Descriptions.Item label="预计平均阅读单价">
              {details.unifiedNumber}
            </Descriptions.Item>}
          </Descriptions>
        </Section.Content>
      </Section>
      <Section>
        <Section.Header title="执行进度" level={5} />
        <Section.Content>
          <Descriptions title="">
            <Descriptions.Item label="任务状态">
              <TaskStatus status={details.orderState} />
            </Descriptions.Item>
            <Descriptions.Item label="任务剩余时间">
              <TaskRemainingTime status={details.orderState} startDate={details.orderStartDate} endDate={details.orderEndDate}/>
            </Descriptions.Item>
            <Descriptions.Item label="已用预算/可用预算">
              <Yuan value={details.usedAmount} className="text-red" />
              &nbsp;/&nbsp;
              <Yuan value={details.availableAmount} className="text-black" />
            </Descriptions.Item>
            <Descriptions.Item label="有效执行博主数">{details.mcnCount || 0} 位</Descriptions.Item>
            <Descriptions.Item label="已达成阅读数">{details.realActionNum || '-'}</Descriptions.Item>

            <Descriptions.Item label="已用服务费/可用服务费">
              <Yuan value={details.usedServiceFee} className="text-red" />
              &nbsp;/&nbsp;
              <Yuan value={details.availableServiceFee} className="text-black" />
            </Descriptions.Item>
          </Descriptions>
        </Section.Content>
      </Section>
      {features.taskPattern === MEDIA_TASK_PATTERN_BIDDING && <Section>
        <Section.Header title={<span>已申请博主 {
          <span className='text-red'>{total}</span>} 位</span>} level={5} />
        <Section.Content>
          <Table
            loading={listLoadingByTemp}
            dataSource={dataSourceByTemp}
            columns={this.columnsByTemp}
            pagination={{
              size: 'small',
              total: mcnOrderListByTemp.total,
              pageSize: mcnOrderListByTemp.pageSize,
              current: mcnOrderListByTemp.pageNum,
              onChange: (currentPage) => {
                this.getList({
                  page: { ...searchByTemp.page, currentPage }
                })
              }
            }}
            locale={{
              emptyText: "暂无博主申请"
            }}
            size="default"
          />
        </Section.Content>
      </Section>}
      <Section>
        <Section.Header title={<span>已领取博主 {
          <span className='text-red'>{total}</span>} 位</span>} level={5} />
        <Section.Content>
          <Table
            loading={listLoading}
            dataSource={dataSource}
            columns={this.columns}
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
            locale={{
              emptyText: "暂无博主领取"
            }}
            size="default"
          />
        </Section.Content>
      </Section>
    </>
  }
}
