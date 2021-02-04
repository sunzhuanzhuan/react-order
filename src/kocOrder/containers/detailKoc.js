import React, { useEffect } from 'react'
import { Breadcrumb, Table, Divider, Descriptions } from 'antd';
import * as actionKoc from "../actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import qs from 'qs'
import { useParams, useHistory } from 'react-router-dom'
// const getColum = (company_name, requirement_id, requirement_name, brand_name, project_name, wby_order_id, koc_order_id, platform_name, po_code, sale_name, executor_name) => {
//   return [

// }
const columns = [
  {
    title: '公司名称',
    dataIndex: 'company_name',
    key: 'company_name',
    render: (text) => {
      return text || '-'
    }
  },
  {
    title: '需求ID',
    dataIndex: 'requirement_id',
    key: 'requirement_id',
    render: (text) => {
      return text || '-'
    }
  },
  {
    title: '需求名称',
    dataIndex: 'requirement_name',
    key: 'requirement_name',
    render: (text) => {
      return text || '-'
    }
  }, {
    title: '所属品牌',
    dataIndex: 'brand_name',
    key: 'brand_name',
    render: (text) => {
      return text || '-'
    }
  },
  {
    title: '所属项目',
    dataIndex: 'project_name',
    key: 'project_name',
    render: (text) => {
      return text || '-'
    }
  },
  {
    title: 'WBY订单号',
    dataIndex: 'wby_order_id',
    key: 'wby_order_id',
    render: (text) => {
      return text || '-'
    }
  }, {
    title: 'KOC订单号',
    dataIndex: 'koc_order_id',
    key: 'koc_order_id',
    render: (text) => {
      return text || '-'
    }
  },
  {
    title: '平台',
    dataIndex: 'platform_name',
    key: 'platform_name',
    render: (text) => {
      return text || '-'
    }
  },
  {
    title: 'PO',
    dataIndex: 'po_code',
    key: 'po_code',
    render: (text) => {
      return text || '-'
    }
  }, {
    title: '所属销售',
    dataIndex: 'sale_name',
    key: 'sale_name',
    render: (text) => {
      return text || '-'
    }
  },
  {
    title: '执行人',
    dataIndex: 'executor_name',
    key: 'executor_name',
    render: (text) => {
      return text || '-'
    }
  },
]
const Detail = (props) => {
  const { id } = useParams()

  useEffect(() => {
    getDetail()
  }, [])

  const getDetail = () => {

    props.actionKoc.getKocOrderInfo({ id })
  }

  let { kocOrderInfo: data = {} } = props

  return <div>
    <Breadcrumb>
      <Breadcrumb.Item> <a href="/order/koc/list">订单列表</a></Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">订单详情</a>
      </Breadcrumb.Item>
    </Breadcrumb>
    <Divider orientation="left">订单列表</Divider>
    <Table columns={columns} dataSource={[data]} pagination={false} />
    <Descriptions title="账号信息" bordered style={{ marginTop: '50px' }}>
      <Descriptions.Item label="账号名称">{data.weibo_name || '-'}</Descriptions.Item>
      <Descriptions.Item label="账号ID">{data.weibo_id || '-'}</Descriptions.Item>
      <Descriptions.Item label="账号分类">{data.category_name || '-'}</Descriptions.Item>
    </Descriptions>
    <Descriptions title="价格信息" bordered style={{ marginTop: '50px' }}>
      <Descriptions.Item label="价格名称">{data.price_name || '-'}</Descriptions.Item>
      <Descriptions.Item label="PriceID">{data.price_id || '-'}</Descriptions.Item>
      <Descriptions.Item label="采购价">{data.cost || '-'}</Descriptions.Item>
      <Descriptions.Item label="采购价＋服务费">{data.cost_with_fee || '-'}</Descriptions.Item>
      <Descriptions.Item label="位置／直发or转发">{data.position || '-'}</Descriptions.Item>
      <Descriptions.Item label="发文位置">{data.post_location || '-'}</Descriptions.Item>
      <Descriptions.Item label="发文时间">{data.post_time || '-'}</Descriptions.Item>
    </Descriptions>
  </div>
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
