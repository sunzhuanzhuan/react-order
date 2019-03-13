import React, { Component } from 'react';
import { Table } from 'antd';
import OrderFilterForm from '../components/OrderFilterForm';
import { SH2 } from '../../base/SectionHeader';
import './SelectOrders.less'

const columns = [
  {
  title: '订单ID',
  dataIndex: 'order_id'
}, {
  title: 'PO单号',
  dataIndex: 'execution_evidence_code'
}, {
  title: '需求名称',
  dataIndex: 'requirement_name'
}, {
  title: '主平台信息',
  dataIndex: 'weibo_type'
}, {
  title: '项目/品牌',
  dataIndex: 'brand_name'
}, {
  title: '状态',
  dataIndex: 'status'
}, {
  title: '执行人',
  dataIndex: 'sale_manager_id'
}];
const data = [
  {
    "order_id": "1", //订单id
    "requirement_id": 1,
    "requirement_name": "熊猛测试预约流程财务1", //需求名称
    "brand_name": null, //品牌名称
    "project_name": null, //项目名称
    "weibo_name": "wangyi", //账号名称
    "weibo_type": 4, //平台id
    "real_name": "周金伟", //销售经理
    "execution_status": 25, //执行状态
    "execution_status_name": "已完成", //执行状态名称
    "status": "25", //订单状态
    "status_name": "已完成", //订单状态名称
    "flag": 1, //勾选条件：1可勾选，2状态不符合不可勾选，3已被勾选
    "execution_evidence_code": "", //po单号
    "execution_evidence_id": "",
    "po_path": "http://test//sale/executionevidence/detail?id=", //po链接
    "order_info_path": "http://test//pack/order/info/order_id/1", //订单链接
    "requirement_path": "http://test//pack/reservationrequirement/infoforsale?reservation_requirement_id=1" //需求链接
  },
  {
    "order_id": "2", //订单id
    "requirement_id": 1,
    "requirement_name": "熊猛测试预约流程财务1", //需求名称
    "brand_name": null, //品牌名称
    "project_name": null, //项目名称
    "weibo_name": "wangyi", //账号名称
    "weibo_type": 4, //平台id
    "real_name": "周金伟", //销售经理
    "execution_status": 25, //执行状态
    "execution_status_name": "已完成", //执行状态名称
    "status": "25", //订单状态
    "status_name": "已完成", //订单状态名称
    "flag": 1, //勾选条件：1可勾选，2状态不符合不可勾选，3已被勾选
    "execution_evidence_code": "", //po单号
    "execution_evidence_id": "",
    "po_path": "http://test//sale/executionevidence/detail?id=", //po链接
    "order_info_path": "http://test//pack/order/info/order_id/1", //订单链接
    "requirement_path": "http://test//pack/reservationrequirement/infoforsale?reservation_requirement_id=1" //需求链接
  },
];

export default class SelectOrders extends Component {
  constructor(props, context) {
    super(props, context);
    const { actions } = props
    actions.getSalesManager()
    actions.getCompanyBrand()
    actions.getCompanyProject()
  }


  render() {
    const { closingReport } = this.props
    const rowSelection = {
      onChange: this.props.onSelectChange,
      selectedRowKeys: this.props.selectedRowKeys,
      getCheckboxProps: record => {
        return {
          disabled: false
        };
      }
    };
    const pagination = {
      total: 50,
      onChange: (current, size) => {},
      onShowSizeChange: (current, size) => {},
      showSizeChanger: true,
      showQuickJumper: true
    };
    return <div className='select-orders flex-form-layout'>
      <SH2 title='订单列表' />
      <div style={{padding: '20px 0'}}>
        <OrderFilterForm source={closingReport.filterSource}/>
      </div>
      <Table dataSource={data} rowSelection={rowSelection} pagination={pagination} columns={columns} />
    </div>;
  }
}
