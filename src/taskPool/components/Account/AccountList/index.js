import React, { useState } from 'react'
import { Table, Badge, Button, Alert } from 'antd'
import Scolltable from '@/components/Scolltable/Scolltable.js'
import MessageIcon from '../../../base/MessageIcon'
import './index.less'
const mapState = {
  1: { name: '正常', state: 'success' },
  2: { name: '异常', state: 'error' }
}
const shelfState = {
  1: { name: '上架', state: 'success' },
  2: { name: '下架', state: 'error' }
}
function AccountList(props) {
  const [selectedRow, setSelectedRow] = useState([])
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
      title: '评估状态',
      dataIndex: 'estimateState',
      key: 'estimateState',
      align: 'center',
      render: (text, record) => text ? <div>
        {text == 1 && "待评估"}
        {text == 2 && "已评估"}
        {true && <span className='color-box'>{record.estimateGrade || 'C'}</span>}
        <div>{record.estimateTime}</div>
      </div> : '-'
    },
    {
      title: '上下架状态',
      dataIndex: 'shelfState',
      key: 'shelfState',
      align: 'center',
      render: text => {
        return text ? <Badge status={shelfState[text].state} text={shelfState[text].name} /> : null
      }
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
      title: '抢单接单状态',
      dataIndex: 'seckillState',
      key: 'seckillState',
      align: 'center',
      render: (text, record) => {
        return <StateInfo value={text} errorReson={record.seckillStateError} />
      }
    },
    {
      title: '竞标接单状态',
      dataIndex: 'biddingState',
      key: 'biddingState',
      align: 'center',
      render: (text, record) => {
        return <StateInfo value={text} errorReson={record.biddingStateError}
        />
      }
    },
    {
      title: '操作',
      dataIndex: 'settting',
      key: 'settting',
      width: '230px',
      fixed: 'right',
      align: 'center',
      render: (text, record) => {
        return <div className='children-mr'>
          <Button type='primary'>审核</Button>
          <Button type='primary'>查看详情</Button>
          <Button type='primary'>评估</Button>
          {record.shelfState ? <Button>{shelfState[record.shelfState].name}</Button> : null}
        </div>
      }
    },

  ];
  const rowSelection = {
    rowSelection: selectedRow,
    onChange: (selectedRowKeys) => setSelectedRow(selectedRowKeys)
  }

  return (<>
    <Alert message={<span>已选择 <a>{selectedRow.length}</a> 个账号    合计：{10} 个</span>} type="info" />
    <Scolltable scrollClassName='.ant-table-body' widthScroll={2000}>
      <Table dataSource={list} columns={columns} rowKey='accountId'
        rowSelection={rowSelection}
        scroll={{ x: 1800 }}
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
    </Scolltable>
    <Button disabled={selectedRow.length == 0}>批量审核通过</Button>
    <Button style={{ marginLeft: 20 }} disabled={selectedRow.length == 0}>批量审核不通过</Button>
  </>)
}

export default AccountList
export const KpiTable = ({ data }) => {
  const columnsKpi = [{
    title: '多图文第一条',
    dataIndex: 'mediaIndex1stReadKpiNum',
    key: 'mediaIndex1stReadKpiNum',
    align: 'center',
    render: (text, record) => <span>{text}/{record.mediaIndex1stReadKpiMaxNum}</span>
  }, {
    title: '多图文第二条',
    dataIndex: 'mediaIndex2stReadKpiNum',
    key: 'mediaIndex2stReadKpiNum',
    align: 'center',
    render: (text, record) => <span>{text}/{record.mediaIndex2stReadKpiMaxNum}</span>

  }, {
    title: '多图文第3-n条',
    dataIndex: 'mediaOtherReadKpiNum',
    key: 'mediaOtherReadKpiNum',
    align: 'center',
    render: (text, record) => <span>{text}/{record.mediaOtherReadKpiMaxNum}</span>
  },]
  return <Table pagination={false} columns={columnsKpi} dataSource={[data]} className='kpi-table' bordered />
}
export const StateInfo = ({ value, okText = '正常', errorText = '异常', errorReson }) => {
  return value ? <div>
    {value == 1 && <Badge status='success' text={okText}></Badge>}
    {value == 2 && <><Badge status='error' text={errorText}></Badge>
      <MessageIcon title={errorReson || '无'} />
    </>}
  </div> : '-'
}
