import React from "react";
import {
    TaskInfo,
    TaskStatus,
    QAStatus
  } from "@/taskPool/base/ColumnsDataGroup";
import Yuan from "@/base/Yuan";
import { statusKeyToProps, confirmExeState } from "./config";
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

const render = data => {
  return data || data == 0 ? data : '-';
}


export const getTaskCol = (handleOperate) => {
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
            dataIndex: 'adOrderStateDesc',
            key: 'adOrderStateDesc',
            width: 220,
            render
        },
        {
            title: '博主名称',
            dataIndex: 'snsName',
            key: 'snsName',
            width: 120,
            render
        },
        {
            title: 'Account_ID',
            dataIndex: 'accountId',
            key: 'accountId',
            width: 120,
            render
        },
        {
            title: '领取时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render
        },
        {
            title: '执行状态',
            dataIndex: 'exeConfirmState',
            key: 'exeConfirmState',
            width: 120,
            render: (state) => {
              return <div {...confirmExeState[state]} />
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
                {`${expectActionNum || 0}/${realActionNum || 0}`}
              </div>
            }
        },
        {
            title: '结算价格',
            dataIndex: 'adRealAmount',
            key: 'adRealAmount',
            width: 120,
            render: (data) => {
              return <Yuan value={data} format={"0,0.00"} className="text-black"/>
            }
        },
        {
            title: '成本价格',
            dataIndex: 'realAmount',
            key: 'realAmount',
            width: 120,
            render: (data) => {
              return <Yuan value={data} format={"0,0.00"} className="text-black"/>
            }
        },
        {
            title: '文章预览',
            dataIndex: 'contentUrl',
            key: 'contentUrl',
            width: 120,
            render: (data) => {
              return data ? <a target='_blank' href={data}>查看</a> : '-';
            }
        },
        {
            title: '质检状态',
            dataIndex: 'orderState',
            key: 'orderState',
            width: 120,
            render: (status) => {
              return <QAStatus status={status} />
            }
        },
        {
            title: '操作',
            dataIndex: 'adOrderId',
            align: 'center',
            key: 'adOrderId',
            width: 140,
            render: (_, record) => {
              const { adOrderId, orderState, confirmExeState: exeState } = record;
              const { confirmExeState } = statusKeyToProps;
              if(!(statusKeyToProps[orderState]) || !(statusKeyToProps[orderState]['actionArr']))
                return '-';
              if(confirmExeState) {
                const exeItem = confirmExeState[exeState] || {};
                if(exeItem['actionArr'])
                  return confirmExeState[exeState]['actionArr'].map(item => {
                    const { title, actionKey } = item;
                    return <a key={actionKey} onClick={() => handleOperate(actionKey, {mcnOrderId: adOrderId})}>{title}</a>
                  })
              }
              
              return statusKeyToProps[orderState]['actionArr'].map(item => {
                const { title, actionKey } = item;
                return <a key={actionKey} onClick={() => handleOperate(actionKey, {id: adOrderId})}>{title}</a>
              })
            }
        },
        {
            title: '备注',
            dataIndex: 'orderRemark',
            key: 'orderRemark',
            width: 120,
            render
        }
      ]
}

export const getTaskQueryItems = () => {
    return [
        {label: '任务名称', key: 'orderName', compType: 'input'},
        {label: '任务ID', key: 'adOrderId', compType: 'input'},
        {label: '博主名称', key: '博主名称', compType: 'input'},
        {label: 'Account_ID', key: 'accountId', compType: 'input'},
        {label: '执行状态', key: 'confirmExeState', compType: 'select', optionKey: 'excuteStatus', idKey: 'label', labelKey: 'value', showSearch: true},
        {label: '质检状态', key: 'orderState', compType: 'select', optionKey: 'taskStatus', idKey: 'label', labelKey: 'value', showSearch: true},
        {compType: 'operate', key: 'operate'}
    ]
}