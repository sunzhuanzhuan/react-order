import React, { Component } from 'react';
import { Table, Tooltip } from 'antd';
import { SH2 } from '../../base/SectionHeader';
import './SelectOrders.less';
import IconText from '../base/IconText';
import SummaryReviewFilterForm from '../components/SummaryReviewFilterForm';

const disabledReason = {
  '2': '订单尚未添加执行内容',
  '3': '订单被其他的投放数据汇总单选择'
};
const columns = [
  {
    title: '数据单号',
    dataIndex: 'order_id',
    width: 100,
    render: (id, record) => {
      return <div>
        <a target="_blank" href={record.order_info_path}>{id}</a>
        <a target="_blank" href={record.po_path}>{record.execution_evidence_code}</a>
      </div>;
    }
  }, {
    title: '名称',
    dataIndex: 'execution_evidence_code2',
    render: (po, record) => {
      return <div>
      </div>;
    }
  }, {
    title: '公司简称',
    dataIndex: 'execution_evidence_code',
    render: (po, record) => {
      return <div>
      </div>;
    }
  }, {
    title: '含待内审订单',
    dataIndex: 'requirement_name',
    width: 180,
    render: (name, record) => {
      return <div>
        <a target="_blank" href={record.requirement_path}>{name}</a>
      </div>;
    }
  }, {
    title: '创建人',
    dataIndex: 'weibo_type',
    render: (type, record) => {
      return <IconText platform={type} text={record.weibo_name} />;
    }
  }, {
    title: '时间',
    dataIndex: 'brand_name',
    render: (brand, record) => {
      return <div>
        <a target="_blank" href={record.project_path}>项目：{record.project_name || '-'}</a>
        <div>品牌：{brand || '-'}</div>
      </div>;
    }
  },{
    title: '操作',
    dataIndex: 'real_name33',
    align: 'center'
  }];

export default class SummaryReviewList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      search: {
        page: 1,
        pageSize: 50,
        execution_status: ['21', '22', '26', '27', '28', '32', '35']
      }
    };
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
    return <div className='select-orders flex-form-layout'>
      <SH2 title='投放数据汇总单审核列表' />
      <div style={{ padding: '20px 0' }}>
        <SummaryReviewFilterForm
          loading={this.state.listLoading}
          source={{}}
          search={this.state.search}
          getList={this.getList}
          onSelectChange={this.props.onSelectChange}
        />
      </div>
      <Table
        loading={this.state.listLoading}
        dataSource={[]}
        pagination={pagination}
        columns={columns}
      />
    </div>;
  }
}
