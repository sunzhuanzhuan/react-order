import React, { Component } from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonAction from '@/actions/index'
import * as action from '../actions/index'
import {
  PageHeader,
  Descriptions,
  Button,
  Divider,
  Table,
  Modal,
  Badge
} from 'antd'
import Section from "@/base/Section";
import { KolInfo, QAStatus } from "@/taskPool/base/ColumnsDataGroup";
import Yuan from "@/base/Yuan";
import { WBYPlatformIcon } from "wbyui";
import { getCountDownTimeText } from "@/taskPool/constants/utils";

const columns = [
  {
    title: '博主',
    align: "center",
    dataIndex: 'real_name_1',
    render: (name, record) => {
      return <KolInfo />
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
    dataIndex: 'real_name_3',
    render: (name, record) => {
      return "已执行"
    }
  },
  {
    title: '质检状态',
    align: "center",
    dataIndex: 'real_name_4',
    render: (name, record) => {
      return <QAStatus />
    }
  },
  {
    title: '阅读数',
    align: "center",
    dataIndex: 'real_name_5',
    render: (name, record) => {
      return "1986"
    }
  },
  {
    title: '结算价格',
    align: "center",
    dataIndex: 'real_name_6',
    render: (name, record) => {
      return <Yuan value={22222} format={"0,0.00"} style={{ color: "#333" }} />
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
    this.state = {}
  }

  // 下线
  offline = (id) => {
    Modal.confirm({
      title: '确认要下线此任务吗?',
      content: "任务下线后，不可重新上线。已领取任务的博主，可执行。未消耗的余额，会在之后返还到您的任务账户余额中。"
    })
  }

  componentDidMount() {
    const { actions } = this.props
  }

  render() {
    const { current } = this.state
    const data = [
      {}
    ]
    return <div className='task-pool-page-container detail-page'>
      <PageHeader
        onBack={() => this.props.history.push('/order/task/manage')}
        title="任务详情"
        extra={
          <Button type="primary" ghost onClick={() => this.offline()}>
            下线
          </Button>
        }
      />
      <Section>
        <Section.Header title="基本信息" level={5} />
        <Section.Content>
          <Descriptions title="">
            <Descriptions.Item label="任务ID">12345</Descriptions.Item>
            <Descriptions.Item label="任务名称">新东方鞋业</Descriptions.Item>
            <Descriptions.Item label="发布平台">
              <div style={{ top: "-5px", position: "relative", userSelect: "none"}}>
                <WBYPlatformIcon weibo_type={1} widthSize={22} />
                &nbsp;
                <span>新浪微博</span>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="行业分类">美容美妆</Descriptions.Item>
            <Descriptions.Item label="任务目标">阅读数</Descriptions.Item>
            <Descriptions.Item label="发布位置">多图文第一条</Descriptions.Item>
            <Descriptions.Item label="内容形式">直发</Descriptions.Item>
            <Descriptions.Item label="任务开始时间">
              2019-12-12 12:00:00
            </Descriptions.Item>
            <Descriptions.Item label="任务结束时间">
              2019-12-22 12:00:00
            </Descriptions.Item>
            <Descriptions.Item label="任务剩余时间">
              {getCountDownTimeText("2019-08-08 12:00:00")}
            </Descriptions.Item>
            <Descriptions.Item label="发布后保留时长">24小时</Descriptions.Item>
            <Descriptions.Item label="推广文章">
              <div className="content-wrap">
                <div className='image-wrap' >
                  <img src="https://mmbiz.qpic.cn/mmbiz_png/5r2fdOVlScpTy1TGoAmCIW6cvw8YGRygsBB4vwBgX1uv7zOEKZswEEcoNfiaufdPQ9R4YwA1amvPcw2fTMcxEHA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="" />
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
              <Badge {...statusKeyToProps[1]}/>
            </Descriptions.Item>
            <Descriptions.Item label="已领取博主数">22 位</Descriptions.Item>
            <Descriptions.Item label="消耗/预算">
              <Yuan value={200000}/>
              /
              <Yuan value={200000}/>
            </Descriptions.Item>
            <Descriptions.Item label="预估最低阅读数">12345</Descriptions.Item>
            <Descriptions.Item label="已达成阅读数">200000</Descriptions.Item>
          </Descriptions>
        </Section.Content>
      </Section>
      <Section>
        <Section.Header title={<span>已领取博主 {
          <span className='text-red'>33</span>} 位</span>} level={5} />
        <Section.Content>
          <Table
            loading={this.state.listLoading}
            dataSource={data}
            columns={columns}
            pagination={false}
            size="default"
          />
        </Section.Content>
      </Section>
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
)(TaskDetail)
