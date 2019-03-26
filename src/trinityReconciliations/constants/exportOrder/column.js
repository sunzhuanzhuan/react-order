import React from "react";
import qs from 'qs';
import { Popconfirm ,Radio} from 'antd';

export const exportOrderListFunc = () => {
	return [
		{
			title: '订单号',
			dataIndex: 'order_id',
			key: 'order_id',
			align: 'center',
			width: 100,
		},
		{
			title: '快接单下单价(元)',
			dataIndex: 'public_order_price',
			key: 'salepublic_order_price_id',
			align: 'center',
			width: 100,
		},
		{
			title: '项目名称',
			dataIndex: 'month',
			key: 'month',
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
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '项目媒介',
			dataIndex: 'vol_admin_name',
			key: 'vol_admin_name',
			align: 'center',
			width: 100,
    },
    {
			title: '资源媒介',
			dataIndex: 'owner_admin_name',
			key: 'owner_admin_name',
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
			dataIndex: 'executor_admin_name',
			key: 'executor_admin_name',
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
			dataIndex: 'public_order_id',
			key: 'public_order_id',
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
			title: '打款状态',
			dataIndex: 'payment_status',
			key: 'payment_status',
			align: 'center',
			width: 100,
		}
		

	];
}


export const paymentListFunc = (handleSelectDetail,summary_sheet_id) => {
	return [
    {
			title: '请选择',
			dataIndex: '',
			key: '',
			align: 'center',
      width: 100,
      render:(text,record)=>{
        return <Radio checked={summary_sheet_id == record.summary_sheet_id} onClick={()=>{handleSelectDetail(record)}}></Radio>
      }
		},
		{
			title: '汇总单名称',
			dataIndex: 'summary_sheet_name',
			key: 'summary_sheet_name',
			align: 'center',
			width: 100,
		},
		{
			title: '订单数量',
			dataIndex: 'total_order_amount',
			key: 'total_order_amount',
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
			dataIndex: 'wait_pay_order',
			key: 'wait_pay_order',
			align: 'center',
			width: 100,
		},
		{
			title: '代付金额',
			dataIndex: 'wait_pay_amount',
			key: 'wait_pay_amount',
			align: 'center',
			width: 100,
		},
		{
			title: '扣减订单',
			dataIndex: 'deduction_order',
			key: 'deduction_order',
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
			title: '调账订单',
			dataIndex: 'adjustment_order',
			key: 'adjustment_order',
			align: 'center',
			width: 100
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
		}
	];
}

const summaryStatus={
  1:'未对账',
  2:'对账成功',
  3:'已释放',
}
const paymentStatus={
  1:'未打款',
  2:'打款失败',
  3:'打款成功',
  4:'打款撤销',
  5:'打款中'
}

// 汇总单列表
export const summaryListFunc = (handleSelectDetail,handleOut) => {
	return [
		{
			title: '汇总单名称',
			dataIndex: 'summary_sheet_name',
			key: 'summary_sheet_name',
			align: 'center',
      width: 100,
      render:(text, record)=>{
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
      render:(text)=>{
        return summaryStatus[text]
      }
    },
		{
			title: '订单数量',
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
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '待付订单',
			dataIndex: 'wait_pay_order',
			key: 'wait_pay_order',
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
			dataIndex: 'adjustment_order',
			key: 'adjustment_order',
			align: 'center',
			width: 100,
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
			dataIndex: 'deduction_order',
			key: 'deduction_order',
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
    },
		{
			title: '打款状态',
			dataIndex: 'payment_status',
			key: 'payment_status',
			align: 'center',
			width: 100,
			render: (text) => {
				return paymentStatus[text]
			}
    },
    {
			title: '操作',
			dataIndex: 'ops',
			key: 'ops',
			align: 'center',
			width: 100,
			render: (text, record) => {
			return <span>{(record.summary_status == 2 && record.payment_status == 3) || (record.summary_status == 2 && record.payment_status == 5) ||(record.summary_status == 2 && record.payment_status == 1)?
          <a href='javascript:;' className='left-gap' onClick={() => {
            handleOut(record)
          }}>释放汇总单</a>:null
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
      render:(text, record)=>{
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
      render:(text)=>{
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
			dataIndex: 'adjustment_order',
			key: 'adjustment_order',
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
			dataIndex: 'deduction_order',
			key: 'deduction_order',
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

export const summaryTotalDetailListFunc = () => {
	return [
		{
			title: '订单号',
			dataIndex: 'order_id',
			key: 'order_id',
			align: 'center',
			width: 100
    },
		{
			title: '快接单下单价(元)',
			dataIndex: 'public_order_price',
			key: 'public_order_price',
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
      width: 100,
      render: (text,record) => {
				return <span>项目媒介:{record.vol_admin_name}资源媒介:{record.owner_admin_name}</span>
			}
		},
		{
			title: '销售/执行人/创建人',
			dataIndex: 'w',
			key: 'w',
			align: 'center',
			width: 100,
			render: (text,record) => {
				return <span>{record.sale_name}{record.executor_admin_name}{record.creater_name}</span>
			}
    },
    {
			title: '三方订单号',
			dataIndex: 'public_order_id',
			key: 'public_order_id',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
    },
    {
			title: '调账金额',
			dataIndex: 'adjustment_amount',
			key: 'adjustment_amount',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
    },
    {
			title: '调账方式',
			dataIndex: 'operation_type',
			key: 'operation_type',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
    },
    {
			title: '调账原因',
			dataIndex: 'reason',
			key: 'reason',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
    },
    {
			title: '应实付金额',
			dataIndex: 'total_pay_amount',
			key: 'total_pay_amount',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
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
      render:(text, record)=>{
        return <Popconfirm title={<div>
          <div>温馨提示:</div>
          <div>删除后将无法恢复</div>
        </div>} onConfirm={handleDelete} okText="确定" cancelText="取消">
       <a href='javascript:;'>删除对账单</a>
      </Popconfirm>
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
			dataIndex: 'operated_name',
			key: 'operated_name',
			align: 'center',
			width: 100,
		},
		{
			title: '对账单关联状态',
			dataIndex: 'statement_status',
			key: 'statement_status',
			align: 'center',
      width: 100
		}
	];
}
