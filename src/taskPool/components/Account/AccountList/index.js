import React, { useState } from 'react'
import { Table, Badge, Button } from 'antd'
const mapState = {
  1: { name: '正常', state: 'success' },
  2: { name: '异常', state: 'error' }
}
function AccountList(props) {
  const [selectedRow, setSelectedRow] = useState([])
  const { accountList = {} } = props
  const { list = [] } = props.accountList
  const dataSource = [
    {
      accountId: '1',
      snsName: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
      kpiTarget: { mediaIndex1stReadKpiNum: 1 }
    },
    {
      accountId: '2',
      snsName: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      kpiTarget: { mediaIndex1stReadKpiNum: 1 }
    },
  ];
  const columnsKpi = [{
    title: '多图文第一条',
    dataIndex: 'mediaIndex1stReadKpiNum',
    key: 'mediaIndex1stReadKpiNum',
    render: (text, record) => <span>{text}/{record.mediaIndex1stReadKpiMaxNum}</span>
  }, {
    title: '多图文第二条',
    dataIndex: 'mediaIndex2stReadKpiNum',
    key: 'mediaIndex2stReadKpiNum',
    render: (text, record) => <span>{text}/{record.mediaIndex2stReadKpiMaxNum}</span>

  }, {
    title: '多图文第3-n条',
    dataIndex: 'mediaOtherReadKpiNum',
    key: 'mediaOtherReadKpiNum',
    render: (text, record) => <span>{text}/{record.mediaOtherReadKpiMaxNum}</span>
  },]
  const columns = [
    {
      title: 'account ID',
      dataIndex: 'accountId',
      key: 'accountId',
    },
    {
      title: '平台ID',
      dataIndex: 'platformId',
      key: 'platformId',
    },
    {
      title: '账号名称',
      dataIndex: 'snsName',
      key: 'snsName',
    },
    {
      title: '主账号名称',
      dataIndex: 'identityName',
      key: 'identityName',
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      key: 'auditState',
    },
    {
      title: '评估状态',
      dataIndex: 'estimateState',
      key: 'estimateState',
    },
    {
      title: '上下架状态',
      dataIndex: 'shelfState',
      key: 'shelfState',
    },
    {
      title: 'KPI / KPI上限',
      dataIndex: 'kpiTarget',
      key: 'kpiTarget',
      render: text => <Table columns={columnsKpi} dataSource={[text]} pagination={false} />
    },
    {
      title: '抢单接单状态',
      dataIndex: 'seckillState',
      key: 'seckillState',
      render: text => {
        return text ? <Badge status={mapState[text].state} text={mapState[text].name} /> : null
      }
    },
    {
      title: '竞标接单状态',
      dataIndex: 'biddingState',
      key: 'biddingState',
      render: text => {
        return text ? <Badge status={mapState[text].state} text={mapState[text].name} /> : null
      }
    },
    {
      title: '操作',
      dataIndex: 'settting',
      key: 'settting',
    },

  ];
  const rowSelection = {
    rowSelection: selectedRow,
    onChange: (selectedRowKeys) => setSelectedRow(selectedRowKeys)
  }

  return (<><Table dataSource={list} columns={columns} rowKey='accountId'
    rowSelection={rowSelection}
    pagination={{
      pageSize: 2,
      showSizeChanger: true,
      showQuickJumper: true,
      total: 20,
      current: 1,
      onShowSizeChange: (current, size) => {
        //props.getPlatformOrderList({ page: { currentPage: current, pageSize: size } })
      },

      onChange: (page, pageSize) => {
        //props.getPlatformOrderList({ page: { currentPage: page, pageSize: pageSize } })
      }
    }} />
    <Button disabled={selectedRow.length == 0}>批量审核通过</Button>
    <Button style={{ marginLeft: 20 }} disabled={selectedRow.length == 0}>批量审核不通过</Button>
  </>)
}

export default AccountList
