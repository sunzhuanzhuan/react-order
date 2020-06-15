import React from "react";
import qs from 'qs';
import { Popconfirm, Radio } from 'antd';
import { getExcutePrice } from "../../../publicOrderList/contants/config";

export const exportOrderListFunc = (agentInfo) => {
  return [
    {
      title: '订单号',
      dataIndex: 'wby_order_id',
      key: 'wby_order_id',
      align: 'center',
      width: 100,
      fixed: 'left'
    },
    {
      title: agentInfo.length > 0 ? agentInfo[0].cooperationPlatformName : '',
      dataIndex: 'public_cost_price',
      key: 'public_cost_price',
      align: 'center',
      width: 100,
    },
    {
      title: '需求名称',
      dataIndex: 'requirement_name',
      key: 'requirement_name',
      align: 'center',
      width: 100,
    },
    {
      title: '账号名称',
      dataIndex: 'weibo_name',
      key: 'weibo_name',
      align: 'center',
      width: 100,
    },
    {
      title: '执行价格名称',
      dataIndex: 'accept_reservation_chosen_price',
      key: 'accept_reservation_chosen_price',
      align: 'center',
      width: 200,
      render: (data = {}) => {
        const { price_item = {} } = data;
        return getExcutePrice(price_item)
      }
    },
    {
      title: '下单时间',
      dataIndex: 'ttp_place_order_at',
      key: 'ttp_place_order_at',
      align: 'center',
      width: 120,
    },
    {
      title: '公司简称',
      dataIndex: 'company_name',
      key: 'company_name',
      align: 'center',
      width: 100,
    },
    {
      title: '资源媒介',
      dataIndex: 'media_user_name',
      key: 'media_user_name',
      align: 'center',
      width: 100,
    },
    {
      title: '销售',
      dataIndex: 'sale_name',
      key: 'sale_name',
      align: 'center',
      width: 100,
    },
    {
      title: '执行人',
      dataIndex: 'executor_name',
      key: 'executor_name',
      align: 'center',
      width: 100,
    },
    {
      title: '创建人',
      dataIndex: 'creater_name',
      key: 'creater_name',
      align: 'center',
      width: 100,
    },
    {
      title: '三方订单号',
      dataIndex: 'ttp_order_id',
      key: 'ttp_order_id',
      align: 'center',
      width: 100,
    },
    {
      title: '可对账金额',
      dataIndex: 'can_statement_amount',
      key: 'can_statement_amount',
      width: 100,
      align: 'center',
      render: (text) => {
        return parseFloat(text).toFixed(2)
      }
    },
    {
      title: '对账状态',
      dataIndex: 'statement_status',
      key: 'statement_status',
      align: 'center',
      width: 100,
    },
    {
      title: '是否可扣减',
      dataIndex: 'is_can_deduction',
      key: 'is_can_deduction',
      align: 'center',
      width: 100,
      render: (text) => {
        return text == 1 ? '是' : "否"
      }
    }


  ];
}


export const paymentListFunc = (handleSelectDetail, summary_sheet_id) => {
  return [
    {
      title: '请选择',
      dataIndex: '',
      key: '',
      align: 'center',
      width: 55,
      render: (text, record) => {
        return <Radio checked={summary_sheet_id == record.summary_sheet_id} onClick={() => { handleSelectDetail(record) }}></Radio>
      }
    },
    {
      title: '汇总单名称',
      dataIndex: 'summary_sheet_name',
      key: 'summary_sheet_name',
      align: 'center',
      width: 100,
    }, {
      title: '汇总单ID',
      dataIndex: 'summary_sheet_id',
      key: 'summary_sheet_id',
      align: 'center',
      width: 100,
    },
    {
      title: '订单数量',
      dataIndex: 'total_order_count',
      key: 'total_order_count',
      align: 'center',
      width: 100,
    },
    {
      title: '应实付金额',
      dataIndex: 'total_pay_amount',
      key: 'total_pay_amount',
      align: 'center',
      width: 100,
    },
    {
      title: '待付订单',
      dataIndex: 'wait_pay_order_count',
      key: 'wait_pay_order_count',
      align: 'center',
      width: 100,
    },
    {
      title: '待付金额',
      dataIndex: 'wait_pay_amount',
      key: 'wait_pay_amount',
      align: 'center',
      width: 100,
    },
    {
      title: '扣减订单',
      dataIndex: ' deduction_order_count',
      key: ' deduction_order_count',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return record.deduction_order_count
      }
    },
    {
      title: '扣减金额',
      dataIndex: 'deduction_amount',
      key: 'deduction_amount',
      align: 'center',
      width: 100,
    },
    {
      title: '调账订单',
      dataIndex: ' adjustment_order_count ',
      key: ' adjustment_order_count ',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return record.adjustment_order_count
      }
    },
    {
      title: '调账金额',
      dataIndex: 'adjustment_amount',
      key: 'adjustment_amount',
      align: 'center',
      width: 100
    },
    {
      title: '生成时间',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      width: 100
    },
    {
      title: '汇总单状态',
      dataIndex: 'summary_status',
      key: 'summary_status',
      align: 'center',
      width: 100,
      render: (text) => {
        return summaryStatus[text] || '-'
      }
    },
    {
      title: '关联三方对账单',
      dataIndex: 'statement_name',
      key: 'statement_name',
      align: 'center',
      width: 100,
      render: (text) => {
        return text || '-'
      }
    },
    {
      title: '打款状态',
      dataIndex: 'payment_status',
      key: 'payment_status',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return paymentStatus[record.payment_status]
      }
    }
  ];
}

const summaryStatus = {
  3: '对账完成',
  5: '已释放',
}
const paymentStatus = {
  0: '-',
  1: '未打款',
  2: '打款成功',
  3: '打款失败',
  4: '打款撤销',
  5: '打款中'
}
const statementStatus = {
  1: '未对账',
  3: "对账完成",
  4: "部分对账"
}

// 汇总单列表
export const summaryListFunc = (handleSelectDetail, handleOut) => {
  return [
    {
      title: '汇总单名称',
      dataIndex: 'summary_sheet_name',
      key: 'summary_sheet_name',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return <a href='javascript:;' className='left-gap' onClick={() => {
          handleSelectDetail(record)
        }}>{record.summary_sheet_name}</a>
      }
    }, {
      title: '生成日期',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      width: 100,
    },
    {
      title: '汇总单状态',
      dataIndex: 'summary_status',
      key: 'summary_status',
      align: 'center',
      width: 100,
      render: (text) => {
        return summaryStatus[text]
      }
    }, {
      title: '汇总单ID',
      dataIndex: 'summary_sheet_id',
      key: 'summary_sheet_id',
      align: 'center',
      width: 100,
    },
    {
      title: '订单数量',
      dataIndex: 'total_order_count',
      key: 'total_order_count',
      align: 'center',
      width: 100,
    },
    {
      title: '应实付金额(元)',
      dataIndex: 'total_pay_amount',
      key: 'total_pay_amount',
      align: 'center',
      width: 100,
      render: (text) => {
        return parseFloat(text).toFixed(2)
      }
    },
    {
      title: '待付订单',
      dataIndex: 'wait_pay_order_count',
      key: 'wait_pay_order_count',
      align: 'center',
      width: 100,
    },
    {
      title: '待付金额(元)',
      dataIndex: 'wait_pay_amount',
      key: 'wait_pay_amount',
      align: 'center',
      width: 100,
      render: (text) => {
        return parseFloat(text).toFixed(2)
      }
    },
    {
      title: '调账订单',
      dataIndex: ' adjustment_order_count ',
      key: ' adjustment_order_count ',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return record.adjustment_order_count
      }
    },
    {
      title: '调账总金额(元)',
      dataIndex: 'adjustment_amount',
      key: 'adjustment_amount',
      align: 'center',
      width: 100,
      render: (text) => {
        return parseFloat(text).toFixed(2)
      }
    },
    {
      title: '扣减订单',
      dataIndex: ' deduction_order_count',
      key: ' deduction_order_count',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return record.deduction_order_count
      }
    },
    {
      title: '扣减金额(元)',
      dataIndex: 'deduction_amount',
      key: 'deduction_amount',
      align: 'center',
      width: 100,
      render: (text) => {
        return parseFloat(text).toFixed(2)
      }
    },
    {
      title: '打款状态',
      dataIndex: 'payment_status',
      key: 'payment_status',
      align: 'center',
      width: 100,
      render: (text, record) => {
        console.log(record.payment_status)
        return paymentStatus[record.payment_status]
      }
    },
    {
      title: '操作',
      dataIndex: 'ops',
      key: 'ops',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return <span>{(record.summary_status == 3 && record.payment_status == 3) || (record.summary_status == 3 && record.payment_status == 4) || (record.summary_status == 3 && record.payment_status == 0) ?
          <a href='javascript:;' className='left-gap' onClick={() => {
            handleOut(record)
          }}>释放汇总单</a> : null
        }</span>
      }
    }

  ];
}


export const summaryShiListFunc = (handleSelectDetail) => {
  return [
    {
      title: '汇总单名称',
      dataIndex: 'summary_sheet_name',
      key: 'summary_sheet_name',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return <a href='javascript:;' className='left-gap' onClick={() => {
          handleSelectDetail(record)
        }}>{record.summary_sheet_name}</a>
      }
    },
    {
      title: '汇总单状态',
      dataIndex: 'summary_status',
      key: 'summary_status',
      align: 'center',
      width: 100,
      render: (text) => {
        return summaryStatus[text]
      }
    },
    {
      title: '汇总单总数',
      dataIndex: 'total_order_amount',
      key: 'total_order_amount',
      align: 'center',
      width: 100,
    },
    {
      title: '应实付金额(元)',
      dataIndex: 'total_pay_amount',
      key: 'total_pay_amount',
      align: 'center',
      width: 100,
    },
    {
      title: '调账订单',
      dataIndex: ' adjustment_order_count ',
      key: ' adjustment_order_count ',
      align: 'center',
      width: 100,
    },
    {
      title: '调账总金额(元)',
      dataIndex: 'adjustment_amount',
      key: 'adjustment_amount',
      align: 'center',
      width: 100,
    },
    {
      title: '扣减订单',
      dataIndex: ' deduction_order_count',
      key: ' deduction_order_count',
      align: 'center',
      width: 100,
    },
    {
      title: '扣减金额(元)',
      dataIndex: 'deduction_amount',
      key: 'deduction_amount',
      align: 'center',
      width: 100,
      render: (text) => {
        return parseFloat(text).toFixed(2)
      }
    }
  ];
}

export const summaryTotalDetailListFunc = (agentInfo) => {
  return [
    {
      title: '订单号',
      dataIndex: 'wby_order_id',
      key: 'wby_order_id',
      align: 'center',
      width: 100
    },
    {
      title: agentInfo.length > 0 ? agentInfo[0].cooperationPlatformName : '',
      dataIndex: 'public_cost_price',
      key: 'public_cost_price',
      align: 'center',
      width: 100,
    }, {
      title: '汇总单ID',
      dataIndex: 'summary_sheet_id',
      key: 'summary_sheet_id',
      align: 'center',
      width: 100,
    },
    {
      title: '账号名称',
      dataIndex: 'weibo_name',
      key: 'weibo_name',
      align: 'center',
      width: 100,
    },
    {
      title: '下单时间',
      dataIndex: 'ttp_place_order_at',
      key: 'ttp_place_order_at',
      align: 'center',
      width: 100,
    },
    {
      title: '公司简称',
      dataIndex: 'company_name',
      key: 'company_name',
      align: 'center',
      width: 100,
    },
    {
      title: '媒介',
      dataIndex: 'm',
      key: 'm',
      align: 'center',
      width: 150,
      render: (text, record) => {
        return <span>资源媒介:{record.media_user_name}</span>
      }
    },
    {
      title: '销售/执行人/创建人',
      dataIndex: 'w',
      key: 'w',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return <span>{record.sale_name}/{record.executor_name}/{record.creater_name}</span>
      }
    },
    {
      title: '三方订单号',
      dataIndex: 'ttp_order_id',
      key: 'ttp_order_id',
      align: 'center',
      width: 100
    },
    {
      title: '对账状态',
      dataIndex: 'statement_status',
      key: 'statement_status',
      align: 'center',
      width: 100
    },
    {
      title: '扣减金额',
      dataIndex: 'deduction_amount',
      key: 'deduction_amount',
      align: 'center',
      width: 100,
    },
    {
      title: '是否可扣减',
      dataIndex: 'is_can_deduction',
      key: 'is_can_deduction',
      align: 'center',
      width: 100,
      render: (text) => {
        return text == 1 ? '是' : "否"
      }
    },
    {
      title: '扣减原因',
      dataIndex: 'deduction_reason',
      key: 'deduction_reason',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return <span>{record.deduction_reason || '-'}</span>
      }
    },
    {
      title: '调账金额',
      dataIndex: 'adjustment_amount',
      key: 'adjustment_amount',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return parseFloat(record.adjustment_amount).toFixed(2)
      }
    },
    {
      title: '调账方式',
      dataIndex: 'operation_type_name',
      key: 'operation_type_name',
      align: 'center',
      width: 100
    }, {
      title: '部分对账金额',
      dataIndex: 'pay_amount',
      key: 'pay_amount',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return record.operation_type == 4 ? parseFloat(record.pay_amount).toFixed(2) : '-'
      }
    },
    {
      title: '调账原因',
      dataIndex: 'adjustment_reason',
      key: 'adjustment_reason',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return <span>{record.adjustment_reason || '-'}</span>
      }
    },
    {
      title: '应实付金额',
      dataIndex: 'pay_amount',
      key: 'pay_amount',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return <span>{record.pay_amount}</span>
      }
    }
  ];
}

//对账列表
export const stateListFunc = (handleDelete) => {
  return [
    {
      title: '操作',
      dataIndex: 'o',
      key: 'o',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return record.statement_status == 1 ? <Popconfirm title={<div>
          <div>温馨提示:</div>
          <div>删除对账单将无法恢复，是否确认此操作</div>
        </div>} onConfirm={() => handleDelete(record)} okText="确定" cancelText="取消">
          <a href='javascript:;'>删除对账单</a>
        </Popconfirm> : null
      }
    },
    {
      title: '对账单名称',
      dataIndex: 'statement_name',
      key: 'statement_name',
      align: 'center',
      width: 100,
    },
    {
      title: '对账单编号',
      dataIndex: 'statement_batch',
      key: 'statement_batch',
      align: 'center',
      width: 100,
    },
    {
      title: '导入日期',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      width: 100,
    },
    {
      title: '操作人',
      dataIndex: 'created_operated_name',
      key: 'created_operated_name',
      align: 'center',
      width: 100,
    },
    {
      title: '对账单关联状态',
      dataIndex: 'statement_status',
      key: 'statement_status',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return statementStatus[record.statement_status]
      }
    }
  ];
}
