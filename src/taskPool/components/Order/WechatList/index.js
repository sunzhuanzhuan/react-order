import React, { useMemo } from 'react'
import { Table, Input, Badge, Divider, Button } from 'antd'
import { orderStateMap } from '../config'
import CancelPaymentForm from './CancelPaymentForm'
import AbnormalForm from './AbnormalForm'
import QualityFailedForm from './QualityFailedForm'
import Scolltable from '@/components/Scolltable/Scolltable.js'


export default function WachatList(props) {
  const { setModalProps, allMcnOrderList = {}, actions, } = props
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
      dataIndex: 'adOrderStateDesc',
      key: 'adOrderStateDesc',
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
      dataIndex: 'orderStateDesc',
      key: 'orderStateDesc',
      render: text => <div>
        <Badge status={orderStateMap[text]} />{text}
      </div>
    },
    {
      title: '质检操作',
      dataIndex: '质检操作name',
      key: '质检操作name',
      align: 'center',
      fixed: 'right',
      width: '180px',
      render: (text, record) => {
        return <div>
          {record.orderStateDesc == '一检异常待处理' ? <>
            <a onClick={() => setModalProps({
              visible: true,
              title: '第一次质检异常审核通过',
              content: <AbnormalForm />
            })}>通过</a><Divider type="vertical" />
            <Divider type="vertical" />
            <a onClick=''>不通过</a>
          </> : null}
          {record.orderStateDesc == '二检异常待处理' ?
            <>
              <a onClick={() => setModalProps({
                visible: true,
                title: '第二次质检异常审核通过',
                content: <AbnormalForm isShowRead={true} />
              })}>通过</a><Divider type="vertical" />
              <a onClick={() => setModalProps({
                visible: true,
                title: '第二次质检异常审核不通过',
                content: <QualityFailedForm />
              })}>不通过</a>
            </> : null}
          {record.orderStateDesc == '合格' ? <> <a onClick={() => setModalProps({
            visible: true,
            title: '确认结算',
            content: <PaymentOK />
          })}>确认结算</a><Divider type="vertical" />
            <a onClick={() => setModalProps({
              visible: true,
              title: '取消结算',
              content: <CancelPaymentForm />
            })}>取消结算</a>
          </> : null}
        </div>
      },
    },
    {
      title: '订单操作',
      dataIndex: 'orderOperation',
      key: 'orderOperation',
      align: 'center',
      fixed: 'right',
      width: '180px',
      render: (text, record) => {
        return <div>
          {record.orderStateDesc == '待执行' ? <> <a onClick={() => setModalProps({
            visible: true,
            title: '添加回执',
            content: <EditReceipt />
          })}>添加回执 </a> <Divider type="vertical" /></> : null}
          {record.orderStateDesc == '待修改' ? <><a onClick={() => setModalProps({
            visible: true,
            title: '修改回执',
            content: <EditReceipt />
          })}>修改回执 </a><Divider type="vertical" /></> : null}
          <a>详情</a>
        </div>
      }
    },
    {
      title: '备注',
      dataIndex: '备注name',
      key: '备注name',
      align: 'center',
      fixed: 'right',
      width: '80px',
      render: text => {
        <a>查看</a>
      }
    },
  ];
  return (
    <Scolltable scrollClassName='.ant-table-body' widthScroll={2100}>
      <Table
        dataSource={list}
        columns={columns}
        scroll={{ x: 2000 }}
        rowKey='id'
      />
    </Scolltable>
  )
}

export function EditReceipt(props) {
  return (
    <div>
      回执链接:<Input onClick={props.onClick} />
      <div className='button-footer'>
        <Button>取消</Button>
        <Button type='primary'>确定</Button>
      </div>
    </div>
  )
}
export function PaymentOK(props) {
  return (
    <div>
      <div>本次任务执行将成功生成1,234.00元的结算单，是否确定？</div>
      <div className='button-footer'>
        <Button>取消</Button>
        <Button type='primary'>确定</Button>
      </div>
    </div>
  )
}
