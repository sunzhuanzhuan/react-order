import React from 'react'
import { Table } from 'antd'
import { QUALIFIED_STATU, ABNORMAL_STATU, PENDING_STATU, NO_QUALIFIED_STATU } from './config'
import HocModal from './HocModal'
import { EditReceipt, AbnormalForm } from './ModalContent'
import Scolltable from '@/components/Scolltable/Scolltable.js'
export default function WachatList() {
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '任务名称/平台',
      dataIndex: '任务名称/平台name',
      key: '任务名称/平台name',
    },
    {
      title: '任务ID',
      dataIndex: '任务IDname',
      key: '任务IDname',
    },
    {
      title: '任务状态',
      dataIndex: '任务状态name',
      key: '任务状态name',
    },
    {
      title: '任务类型',
      dataIndex: '任务类型name',
      key: '任务类型name',
    },
    {
      title: '账号名称',
      dataIndex: '账号名称name',
      key: '账号名称name',
    },
    {
      title: 'Account_ID',
      dataIndex: 'Account_IDname',
      key: 'Account_IDname',
    },
    {
      title: '领取时间',
      dataIndex: '领取时间name',
      key: '领取时间name',
    },
    {
      title: '预计推送时间',
      dataIndex: '预计推送时间name',
      key: '预计推送时间name',
    },
    {
      title: '实际阅读/KPI',
      dataIndex: '实际阅读/KPIname',
      key: '实际阅读/KPIname',
    },
    {
      title: '阅读单价',
      dataIndex: '阅读单价name',
      key: '阅读单价name',
    },
    {
      title: '消耗预算',
      dataIndex: '消耗预算name',
      key: '消耗预算name',
    },
    {
      title: '实际结算价格',
      dataIndex: '实际结算价格name',
      key: '实际结算价格name',
    },
    {
      title: '订单状态',
      dataIndex: '订单状态name',
      key: '订单状态name',
    },
    {
      title: '质检操作',
      dataIndex: '质检操作name',
      key: '质检操作name',
      align: 'center',
      fixed: 'right',
      width: '180px',
      render: text => {
        return <div>
          {text == QUALIFIED_STATU ? <>
            <a>确认结算</a>/
            <a>取消结算</a>
          </>
            : null}
          <>
            <HocModal
              title='质检异常审核通过'
              clickCmp={(props) => <a onClick={props.onClick}>通过</a>}
              contentCmp={AbnormalForm}
            /> /
            <a>不通过</a>
          </>
          {/* {text == ABNORMAL_STATU ? : null} */}
        </div>
      },
    },
    {
      title: '订单操作',
      dataIndex: '订单操作name',
      key: '订单操作name',
      align: 'center',
      fixed: 'right',
      width: '180px',
      render: text => {
        return <div>
          <HocModal
            title='添加回执'
            clickCmp={(props) => <a onClick={props.onClick}>添加回执</a>}
            contentCmp={EditReceipt}
          />
          {/* {text == PENDING_STATU ? : null} */}
          {/* {text == PENDING_STATU ? <HocModal
            title='修改回执'
            clickCmp={(props) => <a onClick={props.onClick}>修改回执</a>}
            contentCmp={EditReceipt}
          />: null} */}
          / <a>详情</a>
        </div>
      }
    },
    {
      title: '备注',
      dataIndex: '备注name',
      key: '备注name',
      align: 'center',
      render: text => {
        { text == NO_QUALIFIED_STATU ? <a>查看</a> : null }
      }
    },

  ];

  return (
    <Scolltable scrollClassName='.ant-table-body' widthScroll={2600}>
      <Table dataSource={dataSource} columns={columns} scroll={{ x: 2400 }} />
    </Scolltable>
  )
}
