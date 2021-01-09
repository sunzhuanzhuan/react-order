import React, { Component } from 'react'
import { Table, Tooltip } from 'antd'
import KocOrderFilterForm from '../components/KocOrderFilterForm'
import { SH2 } from '../../base/SectionHeader'
import './SelectOrders.less'
import IconText from '../base/IconText'

const disabledReason = {
  '2': '订单尚未添加执行内容',
  '3': '已经被投放数据汇总单(单号: $投放数据汇总单号$)勾选',
  '4': '订单已执行终止',
  '5': '订单终止申请中',
  '6': '执行内容尚未审核通过'
}
const columns = [
  {
    title: '订单ID',
    dataIndex: 'koc_order_id',
    render: (id, record) => {
      return <div>
        <a target="_blank" href={record.order_info_path}>{id}</a>
        {record.flag > 1 ?
          <div>
            <Tooltip title={disabledReason[record.flag].replace('$投放数据汇总单号$', record.flag_summary_id)}>
              <span style={{ color: 'red', cursor: 'pointer' }}>不可选原因</span>
            </Tooltip>
          </div>
          : null}
      </div>
    }
  }, {
    title: 'PO单号',
    dataIndex: 'po_code',
    render: (po, record) => {
      return <div>
        {po ? <a target="_blank" href={record.po_path}>{po}</a> : '-'}
      </div>
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
    render: (type, record) => {
      return <IconText platform={type} text={record.weibo_name} />
    }
  }, {
    title: '项目/品牌',
    dataIndex: 'brand_name',
    render: (brand, record) => {
      return <div style={{ minWidth: 120 }}>
        <a target="_blank" href={record.project_path}>项目：{record.project_name || '-'}</a>
        <div>品牌：{brand || '-'}</div>
      </div>
    }
  }, {
    title: '状态',
    dataIndex: 'execustatustion_status_name',
    render: (name, record) => {
      return <div>{record.status_name == 1 ? '已确认' : '代执行'}</div>
    }
  }, {
    title: '执行人',
    dataIndex: 'executor_admin_name',
    align: 'center',
    render: (name) => {
      return <div style={{ minWidth: '60px' }}>
        {name || '-'}
      </div>
    }
  }]

export default class SelectKocOrders extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      search: {
        page: 1,
        pageSize: 50,
        company_id: props.companyId,
        execution_status: ['21', '22', '26', '27', '28', '32', '33', '34', '35']
      }
    }
    const { actions } = props
    actions.getExecutor()
    actions.getCompanyBrands({ company_id: props.companyId })
    actions.getCompanyProjects({ company_id: props.companyId })
  }

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.getKocOrders(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }

  componentDidMount() {
    this.getList()
  }

  componentWillUnmount() {
    this.props.actions.clearAllOrderList()
  }

  render() {
    const { closingReport } = this.props
    const { selectKocOrderList: { list, source, total, page, pageSize } } = closingReport
    const rowSelection = {
      onChange: this.props.onSelectChangeKoc,
      selectedRowKeys: this.props.selectedRowKeysKoc,
      getCheckboxProps: record => {
        return {
          disabled: record.flag > 1
        }
      }
    }
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
      <SH2 title='koc订单列表' />
      <div style={{ padding: '20px 0' }} className='closing-report-filter-container'>
        <KocOrderFilterForm
          loading={this.state.listLoading}
          source={{ ...closingReport.publicSource, ...closingReport.companySource }}
          search={this.state.search}
          getList={this.getList}
          onSelectChangeKoc={this.props.onSelectChangeKoc}
        />
      </div>
      <Table
        loading={this.state.listLoading}
        dataSource={list.map(key => source[key])}
        rowSelection={rowSelection}
        pagination={pagination}
        columns={columns}
      />
    </div>
  }
}
