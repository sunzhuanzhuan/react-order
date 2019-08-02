import React, { Component } from 'react'
import { Table, message, Typography, Button } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as commonActions from '@/actions'
import * as actions from '../actions'
import Yuan from "@/base/Yuan";


const { Title } = Typography;

class RemittanceRecordList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      search: {
        page: {
          currentPage: 1,
          pageSize: 20
        }
      },
      listLoading: false
    }
    this.columns = [
      {
        title: '打款批次号',
        dataIndex: 'serialNo',
        align: "center",
        render: (serialNo, record) => {
          return serialNo
        }
      },
      {
        title: '主账号数',
        dataIndex: 'mcnCount',
        align: "center",
        render: (count, record) => {
          return count
        }
      },
      {
        title: '打款总金额',
        dataIndex: 'settlementAmount',
        align: "center",
        render: (amount, record) => {
          return <Yuan value={amount} format={"0,0.00"} />
        }
      },
      {
        title: '生成时间',
        dataIndex: 'createdAt',
        align: "center",
        render: (createdAt, record) => {
          return createdAt
        }
      },
      {
        title: '操作',
        dataIndex: 'settlementFilePath',
        align: "center",
        render: (url, record) => {
          return <Button onClick={() => this.download(url, record)} type="primary" ghost>下载</Button>
        }
      }
    ]
  }

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.TPQueryMcnFinancePaymentPage(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }

  // 下载
  download = (url, record) => {
    const { actions } = this.props
    // 判断是否有一个下线请求处理中
    actions.getFileRealPath({ downLoadUrl: url }).then((res) => {
      if (res.code === "1000") {
        record.settlementState === 1 && actions.TPPayMcnFinancePayment({ id: record.id })
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
    const { actions, history, taskPoolData } = this.props
    const { listLoading, search } = this.state
    const { financeTradeRecord: { keys, source, total, pageNum, pageSize } } = taskPoolData

    const dataSource = keys.map(key => source[key])
    const pagination = {
      total,
      pageSize,
      current: pageNum,
      onChange: (currentPage) => {
        this.getList({
          page: { ...search.page, currentPage }
        })
      }
    }
    return <div className='task-pool-page-container review-page'>
      <Title level={4}>任务大厅打款列表</Title>
      <Table
        loading={listLoading}
        dataSource={dataSource}
        pagination={pagination}
        columns={this.columns}
      />
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
)(RemittanceRecordList)
