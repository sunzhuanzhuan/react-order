import React, { Component } from 'react';
import { Badge, Table } from 'antd';
import { SH2 } from '../../base/SectionHeader';
import './SelectOrders.less';
import IconText from '../base/IconText';
import SummaryOrderFilterForm from '../components/SummaryOrderFilterForm';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { connect } from 'react-redux';
import OrderSummaryStatus from "@/closingReport/base/OrderSummaryStatus";

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  closingReport: state.closingReportReducers
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SummaryListByOrder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: {
        page: 1,
        pageSize: 50
      }
    };
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'execution_evidence_code',
        width: 120,
        render: (po, record) => {
          return <div>
            <div>订单：{record.order_id}</div>
            {po && <a target="_blank" href={record.po_path}>PO：{po}</a>}
          </div>;
        }
      }, {
        title: '状态',
        dataIndex: 'summary_status',
        width: 140,
        render: (status, record) => {
          return <OrderSummaryStatus status={status} reason={record.externa_reason} />;
        }
      }, {
        title: '结案数据单名称',
        dataIndex: 'summary_name',
        width: 120,
        render: (name, record) => {
          return <a onClick={() => this.linkTo('/order/closing-report/detail/summary?summary_id=' + record.summary_id)}>{name}</a>;
        }
      }, {
        title: '需求名称',
        dataIndex: 'requirement_name',
        render: (name, record) => {
          return <div>
            <a target="_blank" href={record.requirement_path}>{name}</a>
          </div>;
        }
      }, {
        title: '主平台信息',
        dataIndex: 'weibo_type',
        width: 150,
        render: (type, record) => {
          return <IconText platform={type} text={record.weibo_name} />;
        }
      }, {
        title: '项目/品牌',
        dataIndex: 'brand_name',
        width: 190,
        render: (brand, record) => {
          return <div>
            <a target="_blank" href={record.project_path}>项目：{record.project_name || '-'}</a>
            <div>品牌：{brand || '-'}</div>
          </div>;
        }
      }, {
        title: '公司简称',
        width: 150,
        dataIndex: 'company_name'
      }, {
        title: '销售/执行人',
        dataIndex: 'real_name',
        width: 100,
        render: (name, record) => {
          return <div>
            {name || '-'} / {record.executor_name || '-'}
          </div>;
        }
      }, {
        title: '时间',
        dataIndex: 'submitter_at',
        width: 230,
        render: (date, record) => {
          return date ? <div>
            <div>提交：{date || '-'}</div>
            {record.internal_check_at && <div>内审：{record.internal_check_at}</div>}
            {record.external_check_at && <div>品牌审核：{record.external_check_at}</div>}
          </div> : '-';
        }
      }, {
        title: '操作',
        fixed: 'right',
        width: 70,
        dataIndex: 'actions',
        render: (date, { summary_status, order_id }) => {
          return <div>
            {[1, 4, 6].includes(summary_status) ?
              <div><a onClick={() => this.linkTo('/order/closing-report/detail/order?order_id=' + order_id)}>修改</a></div>
              : <div><a onClick={() => this.linkTo('/order/closing-report/detail/order?order_id=' + order_id)}>查看</a></div>}
            {[1].includes(summary_status) && <div><a>提交审核</a></div>}
            {[4, 6].includes(summary_status) && <div><a>重新审核</a></div>}
          </div>;
        }
      }];
    const { actions } = props;
    actions.getBrands();
    actions.getProjects();
    actions.getSalesManagers();
  }

  getList = (params = {}) => {
    const { actions } = this.props;
    let search = { ...this.state.search, ...params };
    this.setState({ listLoading: true, search });
    actions.getSummaryListByOrder(search).finally(() => {
      this.setState({ listLoading: false });
    });
  };

  linkTo = (url) => {
    this.props.history.push(url);
  };

  componentDidMount() {
    this.getList();
  }

  render() {
    const { closingReport, actions } = this.props;
    const { summaryListByOrder: { list, source, total, page, pageSize } } = closingReport;
    const pagination = {
      total,
      pageSize,
      current: page,
      onChange: (current, size) => {
        this.getList({ page: current });
      },
      showQuickJumper: true
    };
    return <div className='select-orders flex-form-layout'>
      <SH2 title='订单投放数据汇总列表' />
      <div style={{ padding: '20px 0' }}>
        <SummaryOrderFilterForm
          loading={this.state.listLoading}
          source={{ ...closingReport.publicSource }}
          actions={actions}
          search={this.state.search}
          getList={this.getList}
        />
      </div>
      <Table
        loading={this.state.listLoading}
        dataSource={list.map(key => source[key])}
        scroll={{ x: 1500 }}
        pagination={pagination}
        columns={this.columns}
      />
    </div>;
  }
}
