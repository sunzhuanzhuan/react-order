import React, { Component } from 'react'
import { Table, Input } from 'antd'

function CooperationList(props) {
  const { platformOrderList } = props
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '订单ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: '合作平台',
      dataIndex: '合作平台name',
      key: '合作平台name',
    },
    {
      title: '联系人',
      dataIndex: '联系人name',
      key: '联系人name',
    },
    {
      title: '手机号',
      dataIndex: '手机号name',
      key: '手机号name',
    },
    {
      title: '广告主名称',
      dataIndex: '广告主名称name',
      key: '广告主名称name',
    },
    {
      title: '任务标题',
      dataIndex: '任务标题name',
      key: '任务标题name',
    },
    {
      title: '总阅读量',
      dataIndex: '总阅读量name',
      key: '总阅读量name',
    },
    {
      title: '订单时间',
      dataIndex: '订单时间name',
      key: '订单时间name',
    },
    {
      title: '执行时间',
      dataIndex: '执行时间name',
      key: '执行时间name',
    },
    {
      title: '订单状态',
      dataIndex: '订单状态name',
      key: '订单状态name',
      render: text => <div>

      </div>,
    },
    {
      title: '负责销售',
      dataIndex: '负责销售name',
      key: '负责销售name',
    },
    {
      title: '操作',
      dataIndex: '操作name',
      key: '操作name',
      render: text => <div>

      </div>,
    },
  ];

  return (
    <Table dataSource={dataSource} columns={columns} />
  )
}

export default CooperationList


