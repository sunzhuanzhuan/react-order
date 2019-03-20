import React, { Component } from 'react';
import { Table } from 'antd';
import { SH2 } from '../../base/SectionHeader';
import './SelectOrders.less';
import IconText from '../base/IconText';
import SummaryOrderFilterForm from '../components/SummaryOrderFilterForm';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { connect } from 'react-redux';

const columns = [
  {
    title: 'ID',
    dataIndex: 'order_id',
    width: 100,
    render: (id, record) => {
      return <div>
        <a target="_blank" href={record.order_info_path}>{id}</a>
        <a target="_blank" href={record.po_path}>{record.execution_evidence_code}</a>
      </div>;
    }
  }, {
    title: '状态',
    dataIndex: 'execution_evidence_code',
    render: (po, record) => {
      return <div>
      </div>;
    }
  }, {
    title: '结案数据单名称',
    dataIndex: 'execution_evidence_code',
    render: (po, record) => {
      return <div>
      </div>;
    }
  }, {
    title: '需求名称',
    dataIndex: 'requirement_name',
    width: 180,
    render: (name, record) => {
      return <div>
        <a target="_blank" href={record.requirement_path}>{name}</a>
      </div>;
    }
  }, {
    title: '主平台信息',
    dataIndex: 'weibo_type',
    render: (type, record) => {
      return <IconText platform={type} text={record.weibo_name} />;
    }
  }, {
    title: '项目/品牌',
    dataIndex: 'brand_name',
    render: (brand, record) => {
      return <div>
        <a target="_blank" href={record.project_path}>项目：{record.project_name || '-'}</a>
        <div>品牌：{brand || '-'}</div>
      </div>;
    }
  }, {
    title: '公司简称',
    dataIndex: 'real_name',
    align: 'center'
  }, {
    title: '销售/执行人',
    dataIndex: 'execution_status_name',
    align: 'center',
    render: (name, record) => {
      return <div>
        <div>订单状态：{record.status_name || '-'}</div>
        <div>执行状态：{name || '-'}</div>
      </div>;
    }
  }, {
    title: '时间',
    dataIndex: 'real_name22',
    align: 'center'
  }, {
    title: '操作',
    fixed: 'right',
    width: 60,
    dataIndex: 'real_name',
    align: 'center'
  }];

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
        pageSize: 50,
        execution_status: ['21', '22', '26', '27', '28', '32', '35']
      }
    };
    const { actions } = props;
    actions.getBrands();
    actions.getProjects();
    actions.getSalesManagers()
  }

  render() {
    const pagination = {
      total: 50,
      pageSize: 50,
      current: 0,
      onChange: (current, size) => {
        this.getList({ page: current });
      },
      showQuickJumper: true
    };
    const { closingReport, actions } = this.props;
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
        dataSource={[]}
        scroll={{ x: 1500 }}
        pagination={pagination}
        columns={columns}
      />
    </div>;
  }
}
