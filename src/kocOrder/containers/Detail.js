import React from 'react'
import { Breadcrumb, Table, Divider, Descriptions } from 'antd';
import * as actionKoc from "../actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

const columns = [{
  title: '公司名称',
  dataIndex: 'company_name',
  key: 'company_name',
  width: 100
}, {
  title: '需求ID',
  dataIndex: 'requirement_id',
  key: 'requirement_id',
  width: 100
}, {
  title: '需求名称',
  dataIndex: 'requirement_name',
  key: 'requirement_name',
  width: 100
}, {
  title: '所属品牌',
  dataIndex: 'brand_name',
  key: 'brand_name',
  width: 100
}, {
  title: '所属项目',
  dataIndex: 'project_name',
  key: 'project_name',
  width: 100
}, {
  title: 'WBY订单号',
  dataIndex: 'wby_order_id',
  key: 'wby_order_id',
  width: 100
}, {
  title: '外部订单号',
  dataIndex: 'koc_order_id',
  key: 'koc_order_id',
  width: 100
}, {
  title: '平台',
  dataIndex: 'platform_name',
  key: 'platform_name',
  width: 100
}, {
  title: 'PO',
  dataIndex: 'po_code',
  key: 'po_code',
  width: 100
}, {
  title: '所属销售',
  dataIndex: 'sale_name',
  key: 'sale_name',
  width: 100
}, {
  title: '执行人',
  dataIndex: 'executor_name',
  key: 'executor_name',
  width: 100
},]
class KocDetail extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentDidMount() {
    this.props.actionKoc.getKocOrderInfo()
  }
  render() {
    let { data } = this.props
    return <div>
      <Breadcrumb>
        <Breadcrumb.Item> <a href="/order/koc/list">订单列表</a></Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">订单详情</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left">订单列表</Divider>
      <Table
        pagination={false}
        rowKey={record => record.id}
        columns={columns} dataSource={[{ 'address111': '张大妈' }]} />
      <Descriptions title="账号信息" bordered style={{ marginTop: '50px' }}>
        <Descriptions.Item label="账号名称">{data.weibo_name}</Descriptions.Item>
        <Descriptions.Item label="账号ID">{data.weibo_id}</Descriptions.Item>
        <Descriptions.Item label="账号分类">Hangzhou, Zhejiang</Descriptions.Item>
      </Descriptions>
      <Descriptions title="价格信息" bordered style={{ marginTop: '50px' }}>
        <Descriptions.Item label="价格名称">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="PriceID">Prepaid</Descriptions.Item>
        <Descriptions.Item label="采购价">YES</Descriptions.Item>
        <Descriptions.Item label="采购价＋服务费">{data.cost_with_fee}</Descriptions.Item>
        <Descriptions.Item label="位置／直发or转发"></Descriptions.Item>
        <Descriptions.Item label="发文位置">{data.post_location}</Descriptions.Item>
        <Descriptions.Item label="发文时间">{data.post_time}</Descriptions.Item>
      </Descriptions>
    </div>
  }
}
const mapStateToProps = (state) => {
  return {
    commonReducers: state.commonReducers,
  }
}
const mapDispatchToProps = dispatch => ({
  actionKoc: bindActionCreators({ ...actionKoc }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(KocDetail)
