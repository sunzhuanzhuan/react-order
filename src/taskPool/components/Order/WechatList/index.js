import React, { useMemo } from 'react'
import { Table, Input } from 'antd'
import { QUALIFIED_STATU, ABNORMAL_STATU, PENDING_STATU, NO_QUALIFIED_STATU } from '../config'
import CancelPaymentForm from './CancelPaymentForm'
import AbnormalForm from './AbnormalForm'
import QualityFailedForm from './QualityFailedForm'
import Scolltable from '@/components/Scolltable/Scolltable.js'
export default function WachatList(props) {
  const { setModalProps, allMcnOrderList = {} } = props
  const { list = [] } = allMcnOrderList
  const columns = [
    {
      title: '订单ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '任务名称/平台',
      dataIndex: 'orderName',
      key: 'orderName',
    },
    {
      title: '任务ID',
      dataIndex: 'adOrderId',
      key: 'adOrderId',
    },
    {
      title: '任务状态',
      dataIndex: 'orderStateDesc',
      key: 'orderStateDesc',
    },
    {
      title: '任务类型',
      dataIndex: 'taskPatternDesc',
      key: 'taskPatternDesc',
    },
    {
      title: '账号名称',
      dataIndex: 'snsName',
      key: 'snsName',
    },
    {
      title: 'Account_ID',
      dataIndex: 'accountId',
      key: 'accountId',
    },
    {
      title: '领取时间',
      dataIndex: 'receiveAt',
      key: 'receiveAt',
    },
    {
      title: '预计推送时间',
      dataIndex: 'expectedPublishedTime',
      key: 'expectedPublishedTime',
    },
    {
      title: '实际阅读/KPI',
      dataIndex: '实际阅读/KPIname',
      key: '实际阅读/KPIname',
      render: (text, record) => {
        return <div>
          {record.realActionNum}/{record.expectActionNum}
        </div>
      }
    },
    {
      title: '阅读单价',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
    {
      title: '消耗预算',
      dataIndex: 'adRealAmount',
      key: 'adRealAmount',
    },
    {
      title: '实际结算价格',
      dataIndex: 'realAmount',
      key: 'realAmount',
    },
    {
      title: '订单状态',
      dataIndex: 'adOrderStateDesc',
      key: 'adOrderStateDesc',
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
    {
      title: '质检操作',
      dataIndex: '质检操作name',
      key: '质检操作name',
      align: 'center',
      fixed: 'right',
      width: '180px',
      render: text => {
        return <div>{text == QUALIFIED_STATU ? <>
          <a>确认结算</a>/
        <a>取消结算</a>
        </>
          : null}
          {/*第二次质检 isShowRead=true*/}
          <a onClick={() => setModalProps({
            visible: true,
            title: '质检异常审核通过',
            content: <AbnormalForm />
          })}>通过</a>
          /
          <a onClick={() => setModalProps({
            visible: true,
            title: '第一次质检异常审核不通过',
            content: <div>确定该订单不通过么？</div>
          })}>不通过</a>
          <a onClick={() => setModalProps({
            visible: true,
            title: '第二次质检异常审核不通过',
            content: <QualityFailedForm />
          })}>不通过</a>
          <a onClick={() => setModalProps({
            visible: true,
            title: '确认结算',
            content: <div>本次任务执行将成功生成1,234.00元的结算单，是否确定？</div>
          })}>确认结算</a>
          <a onClick={() => setModalProps({
            visible: true,
            title: '取消结算',
            content: <CancelPaymentForm />
          })}>取消结算</a>
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
          <a onClick={() => setModalProps({
            visible: true,
            title: '添加回执',
            content: <EditReceipt />
          })}>添加回执</a>
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


  ];
  return (
    <Scolltable scrollClassName='.ant-table-body' widthScroll={2100}>
      <Table
        dataSource={list}
        columns={columns}
        scroll={{ x: 2000 }}
      />
    </Scolltable>
  )
}

export function EditReceipt(props) {
  return (
    <div>
      回执链接:<Input onClick={props.onClick} />
    </div>
  )
}
