import React, { useMemo } from 'react'
import { Table, Input, Badge, Divider, Button, message } from 'antd'
import { orderStateMap } from '../config'
import CancelPaymentForm from './CancelPaymentForm'
import AbnormalForm from './AbnormalForm'
import QualityFailedForm from './QualityFailedForm'
import Scolltable from '@/components/Scolltable/Scolltable.js'
import EditReceiptForm from './EditReceiptForm'

export default function WachatList(props) {
  const { setModalProps, allMcnOrderList = {}, actions, changeWechatPage } = props
  const { list = [] } = allMcnOrderList
  async function noPass(id) {
    await actions.TPApprovedFirstFailure(id)
    message.success('操作成功')
    setModalProps({ visible: false })
    changeWechatPage()
  }
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
      dataIndex: 'expectActionNum',
      key: 'expectActionNum',
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
        const { id } = record
        return <div>
          {record.orderStateDesc == '一检异常待处理' ? <>
            <a onClick={() => setModalProps({
              visible: true,
              title: '第一次质检异常审核通过',
              content: (props) => <AbnormalForm {...props} id={id} />
            })}>通过</a><Divider type="vertical" />
            <a onClick={() => noPass(id)}>不通过</a>
          </> : null}
          {record.orderStateDesc == '二检异常待处理' ?
            <>
              <a onClick={() => setModalProps({
                visible: true,
                title: '第二次质检异常审核通过',
                content: (props) => <AbnormalForm isShowRead={true} id={id} {...props} />
              })}>通过</a><Divider type="vertical" />
              <a onClick={() => setModalProps({
                visible: true,
                title: '第二次质检异常审核不通过',
                content: (props) => <QualityFailedForm  {...props} id={id} />
              })}>不通过</a>
            </> : null}
          {record.orderStateDesc == '合格' ? <> <a onClick={() => setModalProps({
            visible: true,
            title: '确认结算',
            content: (props) => <PaymentOK  {...props} id={id} />
          })}>确认结算</a><Divider type="vertical" />
            <a onClick={() => setModalProps({
              visible: true,
              title: '取消结算',
              content: (props) => <CancelPaymentForm  {...props} id={id} />
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
        const { id, orderState } = record
        return <div>
          {record.orderStateDesc == '待执行' ? <> <a onClick={() => setModalProps({
            visible: true,
            title: '添加回执',
            content: (props) => <EditReceiptForm orderState={orderState} {...props} id={id} />
          })}>添加回执 </a> <Divider type="vertical" /></> : null}
          {record.orderStateDesc == '待修改' ? <><a onClick={() => setModalProps({
            visible: true,
            title: '修改回执',
            content: (props) => <EditReceiptForm orderState={orderState}  {...props} id={id} />
          })}>修改回执 </a><Divider type="vertical" /></> : null}
          <a href={`/order/task/orders-wechatdetail?id=${id}`}>详情</a>
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
      render: (text, record) => {
        <a >查看</a>
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

export function PaymentOK(props) {
  const { id, changeWechatPage, setModalProps, actions } = props
  async function onOK() {
    await actions.TPMcnOrderConfirmFinish({ mcnOrderId: id })
    setModalProps({ visible: false })
    message.success('操作成功')
    changeWechatPage()
  }
  return (
    <div>
      <div>本次任务执行将成功生成1,234.00元的结算单，是否确定？</div>
      <div className='button-footer'>
        <Button onClick={() => setModalProps({ visible: false })}>取消</Button>
        <Button type='primary' onClick={onOK}>确定</Button>
      </div>
    </div>
  )
}
