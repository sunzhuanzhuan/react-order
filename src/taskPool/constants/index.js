import React from "react";
import {
    TaskInfo,
    TaskStatus
  } from "@/taskPool/base/ColumnsDataGroup";
export const operateKeyMap = {
    addReceipt: '添加回执',
    TPFristFailureUpdateContentUrl: '修改回执',
    TPApprovedFirstSuccess: '第一次质检异常审核通过',
    TPApprovedFristFailure: '不通过',
    TPApprovedSecondSuccess: '审核通过',
    TPApprovedSecondFailure: '审核不通过',
    TPMcnOrderConfirmFinish: '执行结果确认',
    TPMcnOrderConfirmCancel: '执行结果取消',
}
export const getTaskCol = (offline, handleOperate) => {
    return [
        {
            title: '蜂窝任务信息',
            dataIndex: 'orderName',
            key: 'orderName',
            width: 220,
            render: (_, record) => {
                const { adOrderId, platformId, orderName } = record;
                return <TaskInfo src={'/order/task/detail/' + adOrderId} platformId={platformId} name={orderName} id={adOrderId} />
            }
        },
        {
            title: '任务状态',
            dataIndex: 'orderState',
            key: 'orderState',
            width: 220,
            render: (state, record) => {
                return <TaskStatus status={state} date={record.orderEndDate} />
            }
        },
        {
            title: '博主名称',
            dataIndex: 'snsName',
            key: 'snsName',
            width: 120,
            render: (data, record) => {
              return <div>
                {data}
              </div>
            }
        },
        {
            title: 'Account_ID',
            dataIndex: 'accountId',
            key: 'accountId',
            width: 120,
            render: (data, record) => {
              return <div>
                {data}
              </div>
            }
        },
        {
            title: '领取时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (data, record) => {
              return <div>
                {data}
              </div>
            }
        },
        {
            title: '执行状态',
            dataIndex: 'exeConfirmState',
            key: 'exeConfirmState',
            width: 120,
            render: (data, record) => {
              return <div>
                {data}
              </div>
            }
        },
        {
            title: 'KPI阅读/实际阅读数',
            dataIndex: 'KPI阅读/实际阅读数',
            key: 'KPI阅读/实际阅读数',
            width: 140,
            render: (_, record) => {
              const { expectActionNum, realActionNum } = record;
              return <div>
                {`${expectActionNum}/${realActionNum}`}
              </div>
            }
        },
        {
            title: '结算价格',
            dataIndex: 'adRealAmount',
            key: 'adRealAmount',
            width: 120,
            render: (data, record) => {
              return <div>
                {data}
              </div>
            }
        },
        {
            title: '成本价格',
            dataIndex: 'realAmount',
            key: 'realAmount',
            width: 120,
            render: (data, record) => {
              return <div>
                {data}
              </div>
            }
        },
        {
            title: '文章预览',
            dataIndex: 'contentUrl',
            key: 'contentUrl',
            width: 120,
            render: (data, record) => {
              return <a href={data} tarket='_blank'>
                {data}
              </a>
            }
        },
        {
            title: '质检状态',
            dataIndex: '质检状态',
            key: '质检状态',
            width: 120,
            render: (name, record) => {
              return <div>
                {name}
              </div>
            }
        },
        {
            title: '操作',
            dataIndex: 'adOrderId',
            align: 'center',
            key: 'adOrderId',
            width: 140,
            render: (id, record) => {
              return <div>
                {/* <NavLink to={'/order/task/detail/' + id}>查看</NavLink>
                {record.orderState === 1 && <span>
                  <Divider type="vertical" />
                  <a onClick={() => offline(id)}>下线</a>
                </span>} */}
                  <a onClick={() => handleOperate('addReceipt', {id})}>添加回执</a>
                  <a onClick={() => handleOperate('TPFristFailureUpdateContentUrl', {id})}>修改回执</a>
                  <div className='taskOperateWrapper'>
                    <a onClick={() => handleOperate('TPApprovedFirstSuccess', {id})}>通过</a>
                    <a onClick={() => handleOperate('TPApprovedFristFailure', {id})}>不通过</a>
                  </div>
                  <div className='taskOperateWrapper'>
                    <a onClick={() => handleOperate('TPApprovedSecondSuccess', {id})}>合格</a>
                    <a onClick={() => handleOperate('TPApprovedSecondFailure', {id})}>不合格</a>
                  </div>
                  <div className='taskOperateWrapper'>
                    <a onClick={() => handleOperate('TPMcnOrderConfirmFinish', {mcnOrderId: id})}>确认</a>
                    <a onClick={() => handleOperate('TPMcnOrderConfirmCancel', {mcnOrderId: id})}>取消</a>
                  </div>
              </div>
            }
        },
        {
            title: '备注',
            dataIndex: 'orderRemark',
            key: 'orderRemark',
            width: 120,
            render: (name, record) => {
              return <div>
                {name}
              </div>
            }
        }
      ]
}

export const getTaskQueryItems = () => {
    return [
        {label: '任务名称', key: 'orderName', compType: 'input'},
        {label: '任务ID', key: 'adOrderId', compType: 'input'},
        {label: '博主名称', key: '博主名称', compType: 'input'},
        {label: 'Account_ID', key: 'accountId', compType: 'input'},
        {label: '执行状态', key: 'confirmExeState', compType: 'select', optionKey: 'excuteStatus', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {label: '质检状态', key: 'orderState', compType: 'select', optionKey: 'qualityStatus', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {compType: 'operate', key: 'operate'}
    ]
}

export const taskStatus = [

]

export const excuteStatus = [
    
]

export const qualityStatus = [
    
]