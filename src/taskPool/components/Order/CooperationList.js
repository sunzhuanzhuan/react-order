import React, { useState } from 'react'
import { Table, Modal, Button, message, Icon } from 'antd'
import { otherOrderStateMap, PARTNER_AWAIT, PENDING, OVER, MEDIUM_AWAIT, MEDIUM_REJECT, PARTNER_REJECT } from '../../constants/orderConfig'
import api from '@/api'
import Scolltable from '@/components/Scolltable/Scolltable.js'
import CooperationModel, { RejectForm } from './CooperationModel'
import MessageIcon from '../../base/MessageIcon'
const { confirm } = Modal;
function CooperationList(props) {
  const [selectedRow, setSelectedRow] = useState([])
  const { platformOrderList = {}, setModalProps, changePage, actions } = props
  const { list = [] } = platformOrderList
  //合作方确认
  function orderOK(title, adOrderId, okText) {
    confirm({
      title: title,
      okText: okText,
      onOk() {
        updatePlatformOrderAsync({ operationFlag: 1, adOrderId: adOrderId })
      },
    });
  }
  //驳回、同意
  async function updatePlatformOrderAsync(params) {
    await actions.TPUpdatePlatformOrder(params)
    changePage()
    message.success('操作成功')
  }

  //上传执行单、上传结案报告）
  async function updatePlatformFileAsync(params) {
    await actions.TPUpdatePlatformFile(params)
    changePage()
    message.success('操作成功')
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
      render: (text, record) => <div>
        {otherOrderStateMap[text]}
        {text == MEDIUM_REJECT || text == PARTNER_REJECT ? <MessageIcon title={record.reason} /> : null}
      </div>
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
          okFn: updatePlatformFileAsync,
          adOrderId: record.orderId,
          cancelFn: () => setModalProps({ visible: false }),
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
          }><IconType value={record.execOrderUrl} />  上传执行单</a> : null}

          {pending ? <a type='primary' onClick={
            () => setModalProps({
              title: '请上传结案报告',
              visible: true,
              content: <CooperationModel
                {...commProps} />
            })
          }><IconType value={record.finalReportUrl} />  上传结案报告</a> : null
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
        const { orderId, execOrderUrl, finalReportUrl } = record
        return <div className='children-mr'>
          {medium_await ? <Button type='primary' onClick={() => orderOK('确认订单递交给合作平台', [orderId])}>确认</Button> : null}
          {partner_await ? <Button type='primary' disabled={!execOrderUrl} onClick={() => orderOK('确认后执行单和结算金额不可撤回', [orderId])}>确认</Button> : null}
          {pending ? <Button disabled={!finalReportUrl} type='primary' onClick={() => orderOK('确认后结案报告不可撤回', [orderId])}>确定</Button> : null}
          {medium_await || partner_await ? <Button type='primary'
            onClick={() => setModalProps({
              title: '驳回',
              visible: true,
              content: <RejectForm
                adOrderId={[orderId]}
                okFn={updatePlatformOrderAsync}
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
        <Table dataSource={list}
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
              changePage({ page: { currentPage: current, pageSize: size } })
            },

            onChange: (page, pageSize) => {
              changePage({ page: { currentPage: page, pageSize: pageSize } })
            }
          }} />
      </Scolltable>


      <Button onClick={() => orderOK('确定批量执行', selectedRow, '确认执行')} disabled={selectedRow.length == 0}>批量确认</Button>
      <Button onClick={() => setModalProps({
        title: '批量驳回',
        visible: true,
        content: <RejectForm
          adOrderId={selectedRow}
          okFn={updatePlatformOrderAsync}
          cancelFn={() => setModalProps({ visible: false })} />
      })} style={{ marginLeft: 20 }} disabled={selectedRow.length == 0}>批量驳回</Button>
    </>
  )
}

export default CooperationList



const IconType = (value) => {
  return value ? <Icon type="check-circle" theme="filled" style={{ color: '#5ccd5c' }} /> : <Icon type="exclamation-circle" theme="filled" style={{ color: '#fd3d11' }} />
}
