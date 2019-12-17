import React, { useState } from 'react'
import { Table, Badge, Button } from 'antd'
import { StateInfo, KpiTable } from './AccountList'
const shelfState = {
  1: { name: '上架', state: 'success' },
  2: { name: '下架', state: 'error' }
}
function AccountReceiveList(props) {
  const [selectedRow, setSelectedRow] = useState([])

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
      align: 'center',
      render: (text, record) => text ? <div>
        {text == 1 && '待审核'}
        {text == 2 && '未通过'}
        {text == 3 && '已通过'}
        <div>{record.auditTime}</div>
      </div> : '-'
    },
    {
      title: 'KPI / KPI上限',
      dataIndex: 'kpiTarget',
      key: 'kpiTarget',
      width: '330px',
      align: 'center',
      render: text => <KpiTable data={text} />
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      align: 'center',
      render: text => text
    },
    {
      title: '资源媒介经理',
      dataIndex: 'ownerAdminName',
      key: 'ownerAdminName',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'settting',
      key: 'settting',
      align: 'center',
      render: (text, record) => {
        return <div className='children-mr'>
          <Button type='primary'>领取账号</Button>
        </div>
      }
    },

  ];
  const rowSelection = {
    rowSelection: selectedRow,
    onChange: (selectedRowKeys) => setSelectedRow(selectedRowKeys)
  }

  return (<>
    <Table dataSource={dataSource} columns={columns} rowKey='accountId'
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
    <Button disabled={selectedRow.length == 0}>批量领取账号</Button>
  </>)
}

export default AccountReceiveList

