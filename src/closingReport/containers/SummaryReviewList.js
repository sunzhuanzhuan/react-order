import React, { Component } from 'react'
import { Table, Tabs } from 'antd'
import { SH2 } from '../../base/SectionHeader'
import './SelectOrders.less'
import SummaryReviewFilterForm from '../components/SummaryReviewFilterForm'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { connect } from 'react-redux'

const TabPane = Tabs.TabPane

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  closingReport: state.closingReportReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class SummaryReviewList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: {
        page: 1,
        pageSize: 50,
        summary_data_status: '1'
      }
    }
    this.columns = [
      {
        title: '数据单号',
        dataIndex: 'summary_id'
      }, {
        title: '名称',
        dataIndex: 'summary_name'
      }, {
        title: '公司简称',
        dataIndex: 'company_name',
        render: (name, record) => {
          return <a target="_blank" href={record.company_path}>{name || '-'}</a>
        }
      }, {
        title: '含待内审订单',
        dataIndex: 'ids',
        render: (ids) => {
          return <div>
            <b>{ids}</b>个
          </div>
        }
      }, {
        title: '创建人',
        dataIndex: 'real_name'
      }, {
        title: '时间',
        dataIndex: 'created_at'
      }, {
        title: '操作',
        dataIndex: 'actions',
        align: 'center',
        render: (date, record) => {
          return <a target='_blank' href={'/order/closing-report/detail/review-summary?summary_id=' + record.summary_id}>查看</a>
        }
      }]
    const { actions } = props
    actions.getExecutor()
  }

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.getSummaryList(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }


  render() {
    const { closingReport, actions } = this.props
    const { summaryList: { list, source, total, page, pageSize } } = closingReport
    const pagination = {
      total,
      pageSize,
      current: page,
      onChange: (current) => {
        this.getList({ page: current })
      },
      showQuickJumper: true
    }
    return <div className='select-orders flex-form-layout'>
      <SH2 title='投放数据汇总单审核列表' />
      <div style={{ padding: '20px 0' }} className='closing-report-filter-container'>
        <SummaryReviewFilterForm
          loading={this.state.listLoading}
          source={{ ...closingReport.publicSource }}
          actions={actions}
          search={this.state.search}
          getList={this.getList}
        />
      </div>
      <Tabs
        animated={{ tabPane: false }}
        activeKey={this.state.search.summary_data_status}
        onChange={tableActive => {
          this.getList({ summary_data_status: tableActive, page: 1 })
        }}
      >
        <TabPane tab={`含待内审订单`} key="1" />
        <TabPane tab={`全部`} key="0" />
      </Tabs>
      <Table
        loading={this.state.listLoading}
        dataSource={list.map(key => source[key])}
        pagination={pagination}
        columns={this.columns}
      />
    </div>
  }
}
