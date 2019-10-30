import React from "react";
import {
    TaskInfo,
    TaskStatus
  } from "@/taskPool/base/ColumnsDataGroup";
export const operateKeyMap = {
    addReceipt: '添加回执',
    editReceipt: '修改回执',
    settlement: '执行结果确认',
    unSettlement: '执行结果取消',
}
export const getTaskCol = (offline, handleOperate) => {
    return [
        {
            title: '蜂窝任务信息',
            dataIndex: 'orderName',
            key: 'orderName',
            width: 220,
            render: (_, record) => {
                const { id, platformId, orderName } = record;
                return <TaskInfo src={'/order/task/detail/' + id} platformId={platformId} name={orderName} id={id} />
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
            dataIndex: 'companyName',
            key: 'companyName',
            width: 120,
            render: (name, record) => {
              return <div>
                {name}
              </div>
            }
        },
        {
            title: 'Account_ID',
            dataIndex: 'Account_ID',
            key: 'Account_ID',
            width: 120,
            render: (name, record) => {
              return <div>
                {name}
              </div>
            }
        },
        {
            title: '领取时间',
            dataIndex: '领取时间',
            key: '领取时间',
            width: 120,
            render: (name, record) => {
              return <div>
                {name}
              </div>
            }
        },
        {
            title: '执行状态',
            dataIndex: '执行状态',
            key: '执行状态',
            width: 120,
            render: (name, record) => {
              return <div>
                {name}
              </div>
            }
        },
        {
            title: 'KPI阅读/实际阅读数',
            dataIndex: 'KPI阅读/实际阅读数',
            key: 'KPI阅读/实际阅读数',
            width: 140,
            render: (name, record) => {
              return <div>
                {name}
              </div>
            }
        },
        {
            title: '结算价格',
            dataIndex: '结算价格',
            key: '结算价格',
            width: 120,
            render: (name, record) => {
              return <div>
                {name}
              </div>
            }
        },
        {
            title: '成本价格',
            dataIndex: '成本价格',
            key: '成本价格',
            width: 120,
            render: (name, record) => {
              return <div>
                {name}
              </div>
            }
        },
        {
            title: '文章预览',
            dataIndex: '文章预览',
            key: '文章预览',
            width: 120,
            render: (name, record) => {
              return <div>
                {name}
              </div>
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
            dataIndex: 'id',
            align: 'center',
            key: 'id',
            width: 140,
            render: (id, record) => {
              return <div>
                {/* <NavLink to={'/order/task/detail/' + id}>查看</NavLink>
                {record.orderState === 1 && <span>
                  <Divider type="vertical" />
                  <a onClick={() => offline(id)}>下线</a>
                </span>} */}
                  <a onClick={() => handleOperate('addReceipt')}>添加回执</a>
                  <a onClick={() => handleOperate('editReceipt')}>修改回执</a>
                  <div className='taskOperateWrapper'>
                    <a onClick={() => handleOperate(id)}>通过</a>
                    <a onClick={() => handleOperate(id)}>不通过</a>
                  </div>
                  <div className='taskOperateWrapper'>
                    <a onClick={() => handleOperate(id)}>合格</a>
                    <a onClick={() => handleOperate(id)}>不合格</a>
                  </div>
                  <div className='taskOperateWrapper'>
                    <a onClick={() => handleOperate('settlement')}>确认结算</a>
                    <a onClick={() => handleOperate('unSettlement')}>取消结算</a>
                  </div>
              </div>
            }
        },
        {
            title: '备注',
            dataIndex: '备注',
            key: '备注',
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
        {label: '任务名称', key: '任务名称', compType: 'input'},
        {label: '任务ID', key: '任务ID', compType: 'input'},
        {label: '博主名称', key: '博主名称', compType: 'input'},
        {label: 'Account_ID', key: 'Account_ID', compType: 'input'},
        {label: '任务状态', key: '任务状态', compType: 'select', optionKey: 'taskStatus', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {label: '执行状态', key: '执行状态', compType: 'select', optionKey: 'excuteStatus', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {label: '质检状态', key: '质检状态', compType: 'select', optionKey: 'qualityStatus', idKey: 'user_id', labelKey: 'real_name', showSearch: true},
        {compType: 'operate', key: 'operate'}
    ]
}

export const taskStatus = [

]

export const excuteStatus = [
    
]

export const qualityStatus = [
    
]