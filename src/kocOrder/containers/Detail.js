import React from 'react'
import { Breadcrumb, Table, Divider, Descriptions } from 'antd';
import * as actionKoc from "../actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentDidMount() {
    this.props.actionKoc.getKocOrderInfo()
  }
  render() {
    let { kocOrderInfo: data } = this.props
    // console.log(kocOrderInfo)
    return <div>
      <Breadcrumb>
        <Breadcrumb.Item> <a href="/order/koc/list">订单列表</a></Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">订单详情</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left">订单列表</Divider>
      <Descriptions title="订单列表" layout="vertical" bordered style={{ marginTop: '50px' }}>
        <Descriptions.Item label="公司名称" labelStyle={{ width: '50px' }}>{data.company_name}</Descriptions.Item>
        <Descriptions.Item label="需求ID" labelStyle={{ width: '50px' }}>{data.requirement_id}</Descriptions.Item>
        <Descriptions.Item label="需求名称" labelStyle={{ width: '50px' }}>{data.requirement_name}</Descriptions.Item>
        <Descriptions.Item label="所属品牌" labelStyle={{ width: '50px' }}>{data.weibo_name}</Descriptions.Item>
        <Descriptions.Item label="所属项目" labelStyle={{ width: '50px' }}>{data.project_name}</Descriptions.Item>
        <Descriptions.Item label="WBY订单号" labelStyle={{ width: '50px' }}>{data.wby_order_id}</Descriptions.Item>
        <Descriptions.Item label="外部订单号" labelStyle={{ width: '50px' }}>{data.koc_order_id}</Descriptions.Item>
        <Descriptions.Item label="平台" labelStyle={{ width: '50px' }}>{data.platform_name}</Descriptions.Item>
        <Descriptions.Item label="PO" labelStyle={{ width: '50px' }}>{data.po_code}</Descriptions.Item>
        <Descriptions.Item label="所属销售" labelStyle={{ width: '50px' }}>{data.sale_name}</Descriptions.Item>
        <Descriptions.Item label="执行人" labelStyle={{ width: '50px' }}>{data.executor_name}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="账号信息" bordered style={{ marginTop: '50px' }}>
        <Descriptions.Item label="账号名称">{data.weibo_name}</Descriptions.Item>
        <Descriptions.Item label="账号ID">{data.weibo_id}</Descriptions.Item>
        <Descriptions.Item label="账号分类">{data.category_name}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="价格信息" bordered style={{ marginTop: '50px' }}>
        <Descriptions.Item label="价格名称">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="PriceID">{data.price_id}</Descriptions.Item>
        <Descriptions.Item label="采购价">{data.cost}</Descriptions.Item>
        <Descriptions.Item label="采购价＋服务费">{data.cost_with_fee}</Descriptions.Item>
        <Descriptions.Item label="位置／直发or转发">{data.position}</Descriptions.Item>
        <Descriptions.Item label="发文位置">{data.post_location}</Descriptions.Item>
        <Descriptions.Item label="发文时间">{data.post_time}</Descriptions.Item>
      </Descriptions>
    </div>
  }
}
const mapStateToProps = (state) => {
  return {
    commonReducers: state.commonReducers,
    kocOrderInfo: state.kocReducers.kocOrderInfo
  }
}
const mapDispatchToProps = dispatch => ({
  actionKoc: bindActionCreators({ ...actionKoc }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail)
