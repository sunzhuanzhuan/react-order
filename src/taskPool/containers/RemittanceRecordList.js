import React, { Component } from 'react'
import { Table, message, Typography, Button } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as commonAction from "@/actions";
import * as action from "@/taskPool/actions";
import Yuan from "@/base/Yuan";


const { Title } = Typography;

class TaskReviewList extends Component {
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
        title: '打款批次号',
        dataIndex: 'real_name_1',
        align: "center",
        render: (name, record) => {
          return "12345"
        }
      },
      {
        title: '主账号数',
        dataIndex: 'real_name_2',
        align: "center",
        render: (name, record) => {
          return "10"
        }
      },
      {
        title: '打款总金额',
        dataIndex: 'real_name_3',
        align: "center",
        render: (name, record) => {
          return <Yuan value={20000} />
        }
      },
      {
        title: '生成时间',
        dataIndex: 'real_name_4',
        align: "center",
        render: (name, record) => {
          return "2016-06-07 11:12:00"
        }
      },
      {
        title: '操作',
        dataIndex: 'real_name_61',
        align: "center",
        render: (name, record) => {
          return <Button onClick={() => this.download(name)} type="primary" ghost>下载</Button>
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

  // 下载
  download = (url) => {
    // 判断是否有一个下线请求处理中
    this.props.actions.downloadDealResult({ downLoadUrl: url }).then((res) => {
      if (res.code === 1000) {
        window.location.href = res.data
      } else {
        message.error("下载地址获取失败")
      }
    }).catch(() => {
      message.error("下载地址获取失败")
    })
  }

  componentDidMount() {
    this.getList()
  }

  render() {
    const data = [
      {}
    ]
    const pagination = {
      total: 10,
      pageSize: 20,
      current: 1,
      onChange: (current) => {
        this.getList({ page: current })
      },
      showQuickJumper: true
    }
    return <div className='task-pool-page-container review-page'>
      <Title level={4}>任务大厅打款列表</Title>
      <Table
        loading={this.state.listLoading}
        dataSource={data}
        pagination={pagination}
        columns={this.columns}
      />
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
