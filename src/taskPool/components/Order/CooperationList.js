import React, { useState } from 'react'
import { Table, Modal, Button } from 'antd'
import { otherOrderStateMap, PARTNER_AWAIT, PENDING, OVER, MEDIUM_AWAIT } from '../../constants/orderConfig'
console.log("TCL: otherOrderStateMap", otherOrderStateMap)
import Scolltable from '@/components/Scolltable/Scolltable.js'
import CooperationModel, { RejectForm } from './CooperationModel'
const { confirm } = Modal;
function CooperationList(props) {
  const [selectedRow, setSelectedRow] = useState([])
  const { platformOrderList, setModalProps } = props
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
      otherOrderState: '30'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      otherOrderState: '50'
    },
  ];
  //合作方确认
  function partnerOK() {
    confirm({
      title: '确认后执行单和结算金额不可撤回',
      onOk() {
        console.log('ok');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function pendingOk() {
    confirm({
      title: '确认后结案报告不可撤回',
      onOk() {
        console.log('ok');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  //确认批量执行
  function batchOk() {
    confirm({
      title: '确定批量执行',
      okText: '确认执行',
      onOk() {
        console.log('ok');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
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
      dataIndex: 'otherOrderState',
      key: 'otherOrderState',
      render: text => otherOrderStateMap[text]
    },
    {
      title: '上传订单文件',
      dataIndex: 'fileUrl',
      key: 'fileUrl',
      width: '130px',
      fixed: 'right',
      render: (text, record) => {
        //待合作方确定
        const partner_await = record.otherOrderState == PARTNER_AWAIT
        //待执行
        const pending = record.otherOrderState == PENDING
        return <>
          {partner_await ? <a type='primary' onClick={
            () => setModalProps({
              title: '请上传执行单并录入结算金额',
              visible: true,
              content: <CooperationModel isPrice={partner_await} />
            })
          }>上传结案报告</a> : null}

          {pending ? <a type='primary' onClick={
            () => setModalProps({
              title: '请上传结案报告',
              visible: true,
              content: <CooperationModel />
            })
          }>上传结案报告</a> : null}

        </>
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      width: '230px',
      fixed: 'right',
      render: (text, record) => {
        //待媒介处理
        const medium_await = record.otherOrderState == MEDIUM_AWAIT
        //待合作方确定
        const partner_await = record.otherOrderState == PARTNER_AWAIT
        //待执行
        const pending = record.otherOrderState == PENDING
        //已完成
        const over = record.otherOrderState == OVER
        return <div className='children-mr'>
          {medium_await ? <Button type='primary' onClick=''>确定</Button> : null}
          {partner_await ? <Button type='primary' onClick={partnerOK}>确定</Button> : null}
          {pending ? <Button type='primary' onClick={pendingOk}>确定</Button> : null}
          {medium_await || partner_await ? <Button type='primary'
            onClick={() => setModalProps({
              title: '驳回',
              visible: true,
              content: <RejectForm />
            })}>驳回</Button> : null}
          {medium_await || partner_await || pending || over ? <Button>查看详情</Button> : null}
        </div>
      },
    },
  ];
  const rowSelection = {
    rowSelection: selectedRow,
    onChange: (selectedRowKeys) => setSelectedRow(selectedRowKeys)
  }
  function onOk() {
    console.log("TCL: CooperationList -> selectedRow", selectedRow)
  }
  return (
    <>
      <Scolltable scrollClassName='.ant-table-body' widthScroll={2000}>
        <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} scroll={{ x: 1800 }} rowKey='orderId' />
      </Scolltable>
      <Button onClick={batchOk}>批量确认</Button>
      <Button onClick={onOk} style={{ marginLeft: 20 }}>批量驳回</Button>
    </>
  )
}

export default CooperationList



