import React, { useState } from 'react'
import { Table, Badge, Button, Alert, Modal, Input, Form, message } from 'antd'
import Scolltable from '@/components/Scolltable/Scolltable.js'
import MessageIcon from '../../../base/MessageIcon'
import './index.less'
import { WBYPlatformIcon } from "wbyui"
import TextArea from 'antd/lib/input/TextArea'
import { auditStateMap, estimateStateMap, Wait_Audit, No_Pass, OK_PASS, WAIT_ESTIMATE, OK_ESTIMATE, getValueByFormat } from '../../../constants/accountConfig'
const { confirm } = Modal;

function AccountList(props) {
  const [selectedRow, setSelectedRow] = useState([])
  const { setModalProps, batchUpdateAccountStateAsync, accountList, updateAccountStateMsgAsync } = props
  const { list = [] } = accountList
  function getValue(value) {
    return value > 0 || value == 0 ? value : '-'
  }
  const columns = [
    {
      title: 'account ID',
      dataIndex: 'accountId',
      key: 'accountId',
    },
    {
      title: '账号ID',
      dataIndex: 'snsId',
      key: 'snsId',
    },
    {
      title: '账号名称',
      dataIndex: 'snsName',
      key: 'snsName',
      render: (text) => {
        return <span className="tab-icon-style"><WBYPlatformIcon
          weibo_type={text || '9'}
          icon_type={"default"}
          widthSize={15}
        />{text}</span>
      }
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
        {auditStateMap[text]}
        <div>{record.auditTime}</div>
      </div> : '-'
    },
    {
      title: '评估状态',
      dataIndex: 'estimateState',
      key: 'estimateState',
      width: '80px',
      align: 'center',
      render: (text, record) => text ? <div>
        {estimateStateMap[text]}
        {true && <span className='color-box'>{record.estimateGrade || 'C'}</span>}
        <div>{record.estimateTime}</div>
      </div> : '-'
    },
    {
      title: '粉丝数',
      dataIndex: 'followerCount',
      key: 'followerCount',
      align: 'center',
    },
    {
      title: '内容分类',
      dataIndex: 'followerCount1',
      key: 'followerCount1',
      align: 'center',
    },
    {
      title: '受众',
      dataIndex: 'acceptCrowd',
      key: 'acceptCrowd',
      align: 'center',
      width: '200px',
      render: (text, record) => {
        const { acceptCrowd = {} } = record
        const { sex = {}, age = [], area = [] } = acceptCrowd
        const { manRate, womanRate } = sex
        return text ? <div className='accept-crowd'>
          <div>性别：男{getValueByFormat(manRate)} | 女{getValueByFormat(womanRate)}</div>
          <div>年龄：{getStringByList(age)} </div>
          <div>地域：{getStringByList(area)}</div>
        </div> : null
      }
    },
    {
      title: '上下架状态',
      dataIndex: 'shelfState',
      key: 'shelfState',
      align: 'center',
      render: (text, record) => <StateInfo value={text} okText='上架' errorText='下架' errorReson={record.remark} />
    },
    {
      title: 'KPI / KPI上限',
      dataIndex: 'kpiTarget',
      key: 'kpiTarget',
      width: '380px',
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
        const { accountId, auditState, estimateState, shelfState } = record
        const url = `/order/task/account-details?accountId=${accountId}`
        return <div className='children-mr'>
          {auditState == Wait_Audit ? <Button type='primary' onClick={() => window.open(url, "_self")}>审核</Button> : null}
          {auditState == No_Pass || estimateState == OK_ESTIMATE ? <Button type='primary' onClick={() => window.open(url, "_self")}>查看详情</Button> : null}
          {estimateState == WAIT_ESTIMATE ? <Button type='primary' onClick={() => window.open(url, "_self")}>评估</Button> : null}
          {shelfState == 1 ? <Button onClick={() => offTake(accountId)}>下架</Button> : null}
          {shelfState == 2 ? <Button onClick={() => onTake(accountId)}>上架</Button> : null}
        </div>
      }
    },

  ];
  const rowSelection = {
    rowSelection: selectedRow,
    onChange: (selectedRowKeys) => setSelectedRow(selectedRowKeys),
    getCheckboxProps: record => ({
      disabled: record.auditState !== Wait_Audit,
    }),
  }
  function batchPast() {
    confirm({
      title: '确认批量通过?',
      onOk() {
        batchUpdateAccountStateAsync({ operationFlag: 1, accountIds: selectedRow })
        setSelectedRow([])
      },
      onCancel() {
      },
    });
  }
  function batchNOPast() {
    setModalProps({
      title: '填写批量不通过原因（50字以内）',
      content: (props) => <ReasonForm onOk={(value) => batchUpdateAccountStateAsync(
        { remark: value, accountIds: selectedRow, operationFlag: 2 }
      )} setSelectedRow={setSelectedRow} {...props} />,
      visible: true,
    })
  }

  function offTake(accountId) {
    setModalProps({
      title: '填写下架原因（50字以内）',
      content: (props) => <ReasonForm okText='确认下架'
        onOk={(value) => updateAccountStateMsgAsync(
          { remark: value, accountId: accountId, shelfState: 2 }
        )} {...props} />,
      visible: true,
    })
  }
  function onTake(accountId) {
    confirm({
      title: '确认上架吗?',
      onOk() {
        updateAccountStateMsgAsync({ accountId: accountId, shelfState: 1 })
      },
      onCancel() { },
    });
  }
  const isShowCheacked = selectedRow.length == 0
  return (<>
    <Alert message={<span>已选择 <a>{selectedRow.length}</a> 个账号    合计：{accountList.total} 个</span>} type="info" />
    <br />
    <Scolltable scrollClassName='.ant-table-body' widthScroll={2600}>
      <Table dataSource={list} columns={columns} rowKey='accountId'
        rowSelection={rowSelection}
        scroll={{ x: 2400 }}
        pagination={{
          pageSize: accountList.pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          total: accountList.total,
          current: accountList.pageNum,
          onShowSizeChange: (current, size) => {
            props.changePage({ page: { currentPage: current, pageSize: size } })
          },

          onChange: (page, pageSize) => {
            props.changePage({ page: { currentPage: page, pageSize: pageSize } })
          }
        }} />
    </Scolltable>
    <Button disabled={isShowCheacked} onClick={batchPast}>批量审核通过</Button>
    <Button style={{ marginLeft: 20 }} disabled={isShowCheacked} onClick={batchNOPast}>批量审核不通过</Button>
  </>)
}

export default AccountList
export const KpiTable = ({ data = {} }) => {
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
  return <Table pagination={false} rowKey='mediaIndex1stReadKpiNum' columns={columnsKpi} dataSource={[data]} className='kpi-table' bordered />
}
//受众展示处理
function getStringByList(list = []) {
  const length = list.length
  return length ? list.map((one, index) => `${one.description}${index + 1 == length ? '' : ' | '}`) : '-'
}
//状态处理
export const StateInfo = ({ value, okText = '正常', errorText = '异常', errorReson }) => {
  return value ? <div>
    {value == 1 && <Badge status='success' text={okText}></Badge>}
    {value == 2 && <><Badge status='error' text={errorText}></Badge>
      <MessageIcon title={errorReson || ''} />
    </>}
  </div> : ''
}
//原因Form
function Reason(props) {
  const { setModalProps, form, okText = '确认不通过' } = props
  const { getFieldDecorator, validateFields } = form
  function onOk() {
    validateFields((err, values) => {
      if (!err) {
        props.setSelectedRow && props.setSelectedRow([])
        props.onOk && props.onOk(values)
      }
    })
  }
  return <Form>
    <Form.Item>
      {getFieldDecorator(`reason`, {
        rules: [{ required: true, message: '请填写原因!' }],
      })(
        <TextArea rows={4} placeholder='请填写原因（50字以内）' />
      )}
    </Form.Item>
    <div className='button-footer'>
      <Button type='primary' onClick={onOk}>{okText}</Button>
      <Button onClick={() => setModalProps({ visible: false })}>取消</Button>
    </div>

  </Form>
}
const ReasonForm = Form.create()(Reason)
