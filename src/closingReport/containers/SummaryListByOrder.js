import React, { Component } from 'react'
import { Modal, Table, message, Icon, Popconfirm } from 'antd'
import { SH2 } from '@/base/SectionHeader'
import './SelectOrders.less'
import IconText from '../base/IconText'
import SummaryOrderFilterForm from '../components/SummaryOrderFilterForm'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { connect } from 'react-redux'
import OrderSummaryStatus from '../base/OrderSummaryStatus'
import { datetimeValidate, judgeSPStatus } from '../util'
import ScrollTable from '../../components/Scolltable'

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
export default class SummaryListByOrder extends Component {
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
        title: 'ID',
        dataIndex: 'execution_evidence_code',
        render: (po, record) => {
          return <div>
            <div>订单：{record.order_id}</div>
            {po && <a target="_blank" href={record.po_path}>PO：{po}</a>}
          </div>
        }
      }, {
        title: '审核状态',
        dataIndex: 'summary_status',
        width: 200,
        render: (status, record) => {
          return <OrderSummaryStatus status={status} reason={record.externa_reason} />
        }
      }, {
        title: '投放数据汇总单名称',
        dataIndex: 'summary_name',
        render: (name, record) => {
          return <a target='_blank' href={'/order/closing-report/detail/summary?summary_id=' + record.summary_id}>{name}</a>
        }
      }, {
        title: '需求名称',
        dataIndex: 'requirement_name',
        render: (name, record) => {
          return <div>
            <a target="_blank" href={record.requirement_path}>{name}</a>
          </div>
        }
      }, {
        title: '主平台信息',
        dataIndex: 'weibo_type',
        width: 150,
        render: (type, record) => {
          return <IconText platform={type} text={record.weibo_name} />
        }
      }, {
        title: '项目/品牌',
        dataIndex: 'brand_name',
        width: 190,
        render: (brand, record) => {
          return <div>
            <a target="_blank" href={record.project_path}>项目：{record.project_name || '-'}</a>
            <div>品牌：{brand || '-'}</div>
          </div>
        }
      }, {
        title: '公司简称',
        width: 150,
        dataIndex: 'company_name',
        render: (name) => {
          return <div style={{ 'wordBreak': 'break-all' }}>
            {name || '-'}
          </div>
        }
      }, {
        title: '销售/执行人',
        dataIndex: 'real_name',
        width: 100,
        render: (name, record) => {
          return <div>
            {name || '-'} / {record.executor_admin_name || '-'}
          </div>
        }
      }, {
        title: '时间',
        dataIndex: 'submitter_at',
        width: 230,
        render: (date, record) => {
          return datetimeValidate(date) ? <div>
            <div>提交：{date}</div>
            {datetimeValidate(record.internal_check_at) &&
              <div>内审：{record.internal_check_at}</div>}
            {datetimeValidate(record.external_check_at) &&
              <div>品牌审核：{record.external_check_at}</div>}
          </div> : '-'
        }
      }, {
        title: '操作',
        fixed: 'right',
        width: 70,
        dataIndex: 'actions',
        render: (date, { summary_status, order_id, summary_id, order_type }) => {
          return <div>
            <div>
              {[1, 4, 6].includes(summary_status) ?
                <a target='_blank' href={`/order/closing-report/detail/order?summary_id=${summary_id}&order_id=${order_id}`}>修改</a> :
                <a target='_blank' href={`/order/closing-report/detail/order?summary_id=${summary_id}&order_id=${order_id}`}>查看</a>}
            </div>
            {[1].includes(summary_status) &&
              <div><a onClick={() => this.submitCheck(order_id, undefined, order_type)}>提交审核</a></div>}
            {/*{[1].includes(summary_status) && <div>
              <Popconfirm
                getPopupContainer={() => document.querySelector('.closing-report-container')}
                placement='left'
                title={<div>删除后，订单内数据将全部清空。<br />确认删除么?</div>}
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  this.removeOrder(order_id, summary_id)
                }}
              >
                <a>删除</a>
              </Popconfirm>
            </div>}*/}
            {[4, 6].includes(summary_status) &&
              <div><a onClick={() => this.submitCheck(order_id, true, order_type)}>提交审核</a>
              </div>}
          </div>
        }
      }]
    const { actions } = props
    actions.getBrands()
    actions.getProjects()
    actions.getSalesManagers()
    actions.getExecutor()
  }

  submitCheck = (order_id, isRecheck, order_type) => {
    const { actions } = this.props
    if (isRecheck) {
      // 重新检查
      Modal.confirm({
        title: '是否确认重新提交审核？',
        onOk: hide => {
          return actions.submitCheckSummaryByOrder({ order_id: [order_id] }).then(({ data }) => {
            let check = (data || {}).check
            if (check) {
              return judgeSPStatus(check)
            }
            message.success('提交审核成功!')
            this.getList({ order_type: order_type })
          }).finally(hide)
        }
      })
    } else {
      if (this.isChecking) return
      this.isChecking = true
      let hide = message.loading('处理中...', 0)
      actions.getOrderIsFinish({ order_id: [order_id] }).then(({ data }) => {
        if (data.flag === 2) {
          Modal.info({
            title: '请先将所有平台的数据都完善之后再提交'
          })
        } else if (data.flag === 1) {
          Modal.confirm({
            title: '是否确认将本订单的投放数据提交审核？',
            onOk: hide => {
              return actions.submitCheckSummaryByOrder({ order_id: [order_id] }).then(({ data }) => {
                let check = (data || {}).check
                if (check) {
                  return judgeSPStatus(check)
                }
                message.success('提交审核成功!')
                this.getList({ order_type: order_type })
              }).finally(hide)
            }
          })
        }
      }).finally(() => {
        this.isChecking = false
        hide()
      })
    }
  }

  removeOrder = (order_id, summary_id) => {
    if (this.orderDel) return
    this.orderDel = true
    const hide = message.loading('删除中...', 0)
    this.props.actions.deleteSummaryOrder({
      order_id: [order_id], summary_id
    }).then(() => {
      this.getList()
    }).finally(() => {
      this.orderDel = false
      hide()
    })
  }
  getList = (params = { order_type: 1 }) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.getSummaryListByOrder(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }

  linkTo = (url) => {
    this.props.history.push(url)
  }

  componentDidMount() {
    this.getList()
  }

  render() {
    const { closingReport, actions } = this.props
    const { summaryListByOrder: { list, source, total, page, pageSize } } = closingReport
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
      <SH2 title='订单投放数据汇总列表' />
      <div style={{ padding: '20px 0' }} className='closing-report-filter-container'>
        <SummaryOrderFilterForm
          loading={this.state.listLoading}
          source={{ ...closingReport.publicSource }}
          actions={actions}
          search={this.state.search}
          getList={this.getList}
        />
      </div>
      <ScrollTable scrollClassName='.ant-table-body' widthScroll={1800}>
        <Table
          loading={this.state.listLoading}
          dataSource={list.map(key => source[key])}
          scroll={{ x: 1800 }}
          pagination={pagination}
          columns={this.columns}
        />
      </ScrollTable>
    </div>
  }
}
