import React, { useState } from 'react'
import { Table, Button, Modal } from 'antd'
import { KpiTable } from './AccountList'
function AccountReceiveList(props) {
  const [selectedRow, setSelectedRow] = useState([])
  const { claimAccountList, claimAccountAsync, changePage } = props
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
          <Button type='primary' onClick={() => claimAccountAsync([record.accountId])}>领取账号</Button>
        </div>
      }
    },

  ];
  const rowSelection = {
    rowSelection: selectedRow,
    onChange: (selectedRowKeys) => setSelectedRow(selectedRowKeys)
  }

  return (<>
    <Table dataSource={claimAccountList.list} columns={columns} rowKey='accountId'
      rowSelection={rowSelection}
      pagination={{
        pageSize: claimAccountList.pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        total: claimAccountList.total,
        current: claimAccountList.pages,
        onShowSizeChange: (current, size) => {
          changePage({ page: { currentPage: current, pageSize: size } })
        },

        onChange: (page, pageSize) => {
          changePage({ page: { currentPage: page, pageSize: pageSize } })
        }
      }} />
    <Button disabled={selectedRow.length == 0} onClick={() => claimAccountAsync(selectedRow, 'batch')}>批量领取账号</Button>
  </>)
}

export default AccountReceiveList

