import React from 'react'
import { Breadcrumb, Table, Divider, Descriptions } from 'antd';
import * as actionKoc from "../actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

const columns = [{
  title: '公司名称',
  dataIndex: 'address111',
  key: 'address111',
  width: 100
}, {
  title: '需求ID',
  dataIndex: 'address112',
  key: 'address112',
  width: 100
}, {
  title: '需求名称',
  dataIndex: 'address113',
  key: 'address113',
  width: 100
}, {
  title: '所属品牌',
  dataIndex: 'address1111',
  key: 'address1111',
  width: 100
}, {
  title: '所属项目',
  dataIndex: 'address1122',
  key: 'address1122',
  width: 100
}, {
  title: 'WBY订单号',
  dataIndex: 'address1133',
  key: 'address1133',
  width: 100
}, {
  title: '外部订单号',
  dataIndex: 'address1114',
  key: 'address1114',
  width: 100
}, {
  title: '平台',
  dataIndex: 'address1125',
  key: 'address1125',
  width: 100
}, {
  title: 'PO',
  dataIndex: 'address1136',
  key: 'address1136',
  width: 100
}, {
  title: '所属销售',
  dataIndex: 'address1117',
  key: 'address1117',
  width: 100
}, {
  title: '执行人',
  dataIndex: 'address11266',
  key: 'address11266',
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
        <Descriptions.Item label="账号名称">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="账号ID">1810000000</Descriptions.Item>
        <Descriptions.Item label="账号分类">Hangzhou, Zhejiang</Descriptions.Item>
      </Descriptions>
      <Descriptions title="价格信息" bordered style={{ marginTop: '50px' }}>
        <Descriptions.Item label="价格名称">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="PriceID">Prepaid</Descriptions.Item>
        <Descriptions.Item label="采购价">YES</Descriptions.Item>
        <Descriptions.Item label="采购价＋服务费">2018-04-24</Descriptions.Item>
        <Descriptions.Item label="位置／直发or转发"></Descriptions.Item>
        <Descriptions.Item label="发文位置">2018-04-24</Descriptions.Item>
        <Descriptions.Item label="发文时间">2018-04-24</Descriptions.Item>
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
