import React, { Component } from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonAction from '@/actions/index'
import * as action from '../actions/index'
import { PageHeader, Steps, Descriptions, Button, Divider, Table } from 'antd'
import { parseUrlQuery } from "@/util/parseUrl";
import Section from "@/base/Section";
import {
  KolInfo,
  TaskBudgetConsumptions,
  TaskInfo,
  TaskStatus
} from "@/taskPool/base/ColumnsDataGroup";

const columns = [
  {
    title: '博主',
    align: "center",
    dataIndex: 'real_name_1',
    render: (name, record) => {
      return <KolInfo/>
    }
  },
  {
    title: '领取时间',
    align: "center",
    dataIndex: 'real_name_1',
    render: (name, record) => {
      return "xx"
    }
  },
  {
    title: '执行状态',
    align: "center",
    dataIndex: 'real_name_1',
    render: (name, record) => {
      return "xx"
    }
  },
  {
    title: '质检状态',
    align: "center",
    dataIndex: 'real_name_1',
    render: (name, record) => {
      return "xx"
    }
  },
  {
    title: '阅读数',
    align: "center",
    dataIndex: 'real_name_1',
    render: (name, record) => {
      return "xx"
    }
  },
  {
    title: '结算价格',
    align: "center",
    dataIndex: 'real_name_1',
    render: (name, record) => {
      return "xx"
    }
  },
  {
    title: '操作',
    dataIndex: 'real_name_1',
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

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { actions } = this.props
    // 获取上传图片token
    actions.getNewToken().then(({ data: authToken }) => {
      this.setState({ authToken })
    })
  }

  next = () => {
    this.setState({
      current: this.state.current + 1
    });
  }

  prev = () => {
    this.setState({
      current: this.state.current - 1
    });
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
          <Button type="primary" ghost>
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
            <Descriptions.Item label="发布平台">新东方鞋业</Descriptions.Item>
            <Descriptions.Item label="行业分类">12345</Descriptions.Item>
            <Descriptions.Item label="任务目标">新东方鞋业</Descriptions.Item>
            <Descriptions.Item label="发布位置">新东方鞋业</Descriptions.Item>
            <Descriptions.Item label="任务开始时间">新东方鞋业</Descriptions.Item>
            <Descriptions.Item label="任务结束时间">新东方鞋业</Descriptions.Item>
            <Descriptions.Item label="任务剩余时间">新东方鞋业</Descriptions.Item>
            <Descriptions.Item label="发布后保留时长">新东方鞋业</Descriptions.Item>
            <Descriptions.Item label="推广文章">新东方鞋业</Descriptions.Item>
          </Descriptions>
        </Section.Content>
      </Section>
      <Section>
        <Section.Header title="执行进度" level={5} />
        <Section.Content>
          <Descriptions title="">
            <Descriptions.Item label="任务状态：">12345</Descriptions.Item>
            <Descriptions.Item label="已领取博主数：">新东方鞋业</Descriptions.Item>
            <Descriptions.Item label="消耗/预算：">新东方鞋业</Descriptions.Item>
            <Descriptions.Item label="预估最低阅读数：">12345</Descriptions.Item>
            <Descriptions.Item label="已达成阅读数：">新东方鞋业</Descriptions.Item>
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
