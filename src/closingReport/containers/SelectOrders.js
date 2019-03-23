import React, { Component } from 'react';
import { Table, Tooltip } from 'antd';
import OrderFilterForm from '../components/OrderFilterForm';
import { SH2 } from '../../base/SectionHeader';
import './SelectOrders.less';
import IconText from '../base/IconText';

const disabledReason = {
  '2': '订单尚未添加执行内容',
  '3': '订单被其他的投放数据汇总单选择'
};
const columns = [
  {
    title: '订单ID',
    dataIndex: 'order_id',
    width: 100,
    render: (id, record) => {
      return <div>
        <a target="_blank" href={record.order_info_path}>{id}</a>
        {record.flag > 1 ?
          <Tooltip title={disabledReason[record.flag]}>
            <div style={{ color: 'red', cursor: 'pointer' }}>不可选原因</div>
          </Tooltip>
          : null}
      </div>;
    }
  }, {
    title: 'PO单号',
    dataIndex: 'execution_evidence_code',
    render: (po, record) => {
      return <div>
        {po ? <a target="_blank" href={record.po_path}>{po}</a> : '-'}
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
    title: '状态',
    dataIndex: 'execution_status_name',
    render: (name, record) => {
      return <div>
        <div>订单状态：{record.status_name || '-'}</div>
        <div>执行状态：{name || '-'}</div>
      </div>;
    }
  }, {
    title: '执行人',
    dataIndex: 'executor_admin_name',
    align: 'center',
    render: (name) => {
      return name || '-'
    }
  }];

export default class SelectOrders extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: {
        page: 1,
        pageSize: 50,
        company_id: props.companyId,
        execution_status: ['21', '22', '26', '27', '28', '32', '35']
      }
    };
    const { actions } = props;
    actions.getExecutor();
    actions.getCompanyBrands({ company_id: props.companyId });
    actions.getCompanyProjects({ company_id: props.companyId });
  }

  getList = (params = {}) => {
    const { actions } = this.props;
    let search = { ...this.state.search, ...params };
    if (params['order_id'] || params['requirement_id'] || params['execution_evidence_code']) {
      search['order_id'] = params['order_id'];
      search['requirement_id'] = params['requirement_id'];
      search['execution_evidence_code'] = params['execution_evidence_code'];
    }
    this.setState({ listLoading: true, search });
    actions.getOrders(search).finally(() => {
      this.setState({ listLoading: false });
    });
  };

  componentDidMount() {
    this.getList();
  }
  componentWillUnmount() {
    this.props.actions.clearAllOrderList()
  }

  render() {
    const { closingReport } = this.props;
    const { selectOrderList: { list, source, total, page, pageSize } } = closingReport;
    const rowSelection = {
      onChange: this.props.onSelectChange,
      selectedRowKeys: this.props.selectedRowKeys,
      getCheckboxProps: record => {
        return {
          disabled: record.flag > 1
        };
      }
    };
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
      <SH2 title='订单列表' />
      <div style={{ padding: '20px 0' }}>
        <OrderFilterForm
          loading={this.state.listLoading}
          source={{ ...closingReport.publicSource, ...closingReport.companySource }}
          search={this.state.search}
          getList={this.getList}
          onSelectChange={this.props.onSelectChange}
        />
      </div>
      <Table
        loading={this.state.listLoading}
        dataSource={list.map(key => source[key])}
        rowSelection={rowSelection}
        pagination={pagination}
        columns={columns}
      />
    </div>;
  }
}
