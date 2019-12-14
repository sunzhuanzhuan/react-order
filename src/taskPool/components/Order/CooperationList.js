import React, { useState } from 'react'
import { Table, Input, Button } from 'antd'
import { otherOrderStateMap } from '../../constants/orderConfig'
function CooperationList(props) {
  const [selectedRow, setSelectedRow] = useState([])
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
      title: '任务名称',
      dataIndex: 'adOrderName',
      key: 'adOrderName',
      render: (text, record) => {
        //adOrderId
        return <a>dd</a>
      }
    },
    {
      title: '所属公司',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: '合作平台名称',
      dataIndex: 'platformName',
      key: 'platformName',
    },
    {
      title: '预计阅读数',
      dataIndex: 'actionNum',
      key: 'actionNum',
    },
    {
      title: '任务创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '投放开始~结束时间',
      dataIndex: 'orderStartEndDate',
      key: 'orderStartEndDate',
    },
    {
      title: '创建销售',
      dataIndex: 'salesman',
      key: 'salesman',
    },
    {
      title: '订单状态',
      dataIndex: '订单状态orderId',
      key: '订单状态orderId',
      render: text => otherOrderStateMap[text]
    },
    {
      title: '上传订单文件',
      dataIndex: 'fileUrl',
      key: 'fileUrl',
      render: (text, record) => {
        return <>
          上传结案报告
        </>
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      width: '230px',
      render: text => <div className='children-mr'>
        <Button type='primary'>确认</Button>
        <Button type='primary'>驳回</Button>
        <Button>查看详情</Button>
      </div>,
    },
  ];
  const rowSelection = {
    rowSelection: selectedRow,
    onChange: (selectedRowKeys) => setSelectedRow(selectedRowKeys)
  }
  return (
    <>
      <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} />
      <Button>批量确认</Button>
      <Button style={{ marginLeft: 20 }}>批量驳回</Button>
    </>
  )
}

export default CooperationList



