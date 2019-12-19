import React, { useState } from 'react'
import { Table, Badge, Button, message, Modal } from 'antd'
import { StateInfo, KpiTable } from './AccountList'
const shelfState = {
  1: { name: '上架', state: 'success' },
  2: { name: '下架', state: 'error' }
}
const { confirm } = Modal;
function AccountReceiveList(props) {
  const [selectedRow, setSelectedRow] = useState([])
  const { claimAccountList, actions, changePage } = props
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
          <Button type='primary' onClick={() => claimAccountAsync(record.accountId)}>领取账号</Button>
        </div>
      }
    },

  ];
  const rowSelection = {
    rowSelection: selectedRow,
    onChange: (selectedRowKeys) => setSelectedRow(selectedRowKeys)
  }
  async function claimAccountAsync(id) {
    await actions.claimAccount({ accountId: [id] })
    message.success('领取成功')
  }
  async function batchClaim() {
    const { data } = await actions.claimAccount({ accountId: selectedRow })
    Modal.success({
      title: '成功领取/领取总数',
      content: `${data.claimSuccessNum}/${data.claimTotalNum}`,
    });
  }
  return (<>
    <Table dataSource={claimAccountList.list} columns={columns} rowKey='accountId'
      rowSelection={rowSelection}
      pagination={{
        pageSize: 2,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 20,
        current: 1,
        onShowSizeChange: (current, size) => {
          changePage({ page: { currentPage: current, pageSize: size } })
        },

        onChange: (page, pageSize) => {
          changePage({ page: { currentPage: page, pageSize: pageSize } })
        }
      }} />
    <Button disabled={selectedRow.length == 0} onClick={batchClaim}>批量领取账号</Button>
  </>)
}

export default AccountReceiveList

