import React, { useState } from 'react'
import { Table, Modal, Button, message } from 'antd'
import { otherOrderStateMap, PARTNER_AWAIT, PENDING, OVER, MEDIUM_AWAIT } from '../../constants/orderConfig'
import api from '@/api'
import Scolltable from '@/components/Scolltable/Scolltable.js'
import CooperationModel, { RejectForm } from './CooperationModel'
const { confirm } = Modal;
function CooperationList(props) {
  const [selectedRow, setSelectedRow] = useState([])
  const { platformOrderList = {}, setModalProps } = props
  const { list = [] } = platformOrderList
  //合作方确认
  function orderOK(title, adOrderId, okText) {
    confirm({
      title: title,
      okText: okText,
      onOk() {
        updatePlatformOrder({ operationFlag: 1, adOrderId: adOrderId })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  //驳回、同意
  async function updatePlatformOrder(params) {
    try {
      await api.post('/operator-gateway/cooperationPlatform/v2/updatePlatformOrder', { ...params })
      message.error('操作成功')
    } catch (error) {
      message.error('操作失败')
    }
  }
  //上传执行单、上传结案报告）
  async function updatePlatformFile(params) {
    try {
      await api.post('/operator-gateway/cooperationPlatform/v2/updatePlatformFile', { ...params })
      message.error('操作成功')
    } catch (error) {
      message.error('操作失败')
    }
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
        const commProps = {
          okFn: updatePlatformFile,
          adOrderId: record.orderId,
          cancelFn: () => setModalProps({ visible: false })
        }
        return <>
          {partner_await ? <a type='primary' onClick={
            () => setModalProps({
              title: '请上传执行单并录入结算金额',
              visible: true,
              content: <CooperationModel isPrice={partner_await}
                {...commProps}
              />
            })
          }>上传执行单</a> : null}

          {pending ? <a type='primary' onClick={
            () => setModalProps({
              title: '请上传结案报告',
              visible: true,
              content: <CooperationModel
                {...commProps} />
            })
          }>上传结案报告</a> : null
          }

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
        const { orderId } = record
        return <div className='children-mr'>
          {medium_await ? <Button type='primary' onClick=''>确定</Button> : null}
          {partner_await ? <Button type='primary' onClick={() => orderOK('确认后执行单和结算金额不可撤回', [orderId])}>确定</Button> : null}
          {pending ? <Button type='primary' onClick={() => orderOK('确认后结案报告不可撤回', [orderId])}>确定</Button> : null}
          {medium_await || partner_await ? <Button type='primary'
            onClick={() => setModalProps({
              title: '驳回',
              visible: true,
              content: <RejectForm
                adOrderId={[orderId]}
                okFn={updatePlatformOrder}
                cancelFn={() => setModalProps({ visible: false })} />
            })}>驳回</Button> : null}
          {medium_await || partner_await || pending || over ? <Button onClick={() => window.open(`orders-coodetail?orderId=${orderId}`)}>查看详情</Button> : null}
        </div>
      },
    },
  ];
  const rowSelection = {
    rowSelection: selectedRow,
    onChange: (selectedRowKeys) => setSelectedRow(selectedRowKeys)
  }

  return (
    <>
      <Scolltable scrollClassName='.ant-table-body' widthScroll={2000}>
        <Table dataSource={list || []}
          columns={columns}
          rowSelection={rowSelection}
          scroll={{ x: 1800 }}
          rowKey='orderId'
          pagination={{
            pageSize: platformOrderList.pageSize || 1,
            showSizeChanger: true,
            showQuickJumper: true,
            total: 20,
            current: 1,
            onShowSizeChange: (current, size) => {
              props.getPlatformOrderList({ page: { currentPage: current, pageSize: size } })
            },

            onChange: (page, pageSize) => {
              props.getPlatformOrderList({ page: { currentPage: page, pageSize: pageSize } })
            }
          }} />
      </Scolltable>


      <Button onClick={() => orderOK('确定批量执行', selectedRow, '确认执行')} disabled={selectedRow.length == 0}>批量确认</Button>
      <Button onClick={() => setModalProps({
        title: '批量驳回',
        visible: true,
        content: <RejectForm
          adOrderId={selectedRow}
          okFn={updatePlatformOrder}
          cancelFn={() => setModalProps({ visible: false })} />
      })} style={{ marginLeft: 20 }} disabled={selectedRow.length == 0}>批量驳回</Button>
    </>
  )
}

export default CooperationList



