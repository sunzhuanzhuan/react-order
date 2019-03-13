import React from "react";
import qs from 'qs';
import { Radio } from 'antd';

export const exportOrderListFunc = () => {
	return [
		{
			title: '订单号',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			width: 100,
		},
		{
			title: '快接单下单价(元)',
			dataIndex: 'sale_id',
			key: 'sale_id',
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
			dataIndex: 'original_target',
			key: 'original_target',
			align: 'center',
			width: 100,
		},
		{
			title: '下单时间',
			dataIndex: 'distribute_target',
			key: 'distribute_target',
			align: 'center',
			width: 100,
		},
		{
			title: '公司简称',
			dataIndex: 'video_target',
			key: 'video_target',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '媒介',
			dataIndex: 'not_video_target',
			key: 'not_video_target',
			align: 'center',
			width: 100,
		},
		{
			title: '销售/执行人/创建人',
			dataIndex: 'all_target',
			key: 'all_target',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '三方订单号',
			dataIndex: 'all_target1',
			key: 'all_target1',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '可对账金额',
			dataIndex: 'all_target2',
			key: 'all_target2',
			width: 100,
			align: 'center',
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '对账状态',
			dataIndex: 'all_target3',
			key: 'all_target3',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '打款状态',
			dataIndex: 'all_target4',
			key: 'all_target4',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		}
		

	];
}


export const paymentListFunc = (handleSelectDetail) => {
	return [
    {
			title: '序号',
			dataIndex: 'name11',
			key: 'name11',
			align: 'center',
      width: 100,
      render:(text, record)=>{
        return <a href='javascript:;' onClick={()=>{handleSelectDetail(record)}}>查看</a>
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
			dataIndex: 'sale_id',
			key: 'sale_id',
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
			title: '所属平台/代理商',
			dataIndex: 'original_target',
			key: 'original_target',
			align: 'center',
			width: 100,
		},
		{
			title: '生成时间',
			dataIndex: 'distribute_target',
			key: 'distribute_target',
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
				return parseFloat(text).toFixed(2)
			}
		},
		{
			title: '打款状态',
			dataIndex: 'payment_status',
			key: 'payment_status',
			align: 'center',
			width: 100,
		},
		{
			title: '关联三方对账单',
			dataIndex: 'all_target',
			key: 'all_target',
			align: 'center',
			width: 100,
			render: (text) => {
				return parseFloat(text).toFixed(2)
			}
		}

	];
}

// 汇总单列表
export const summaryListFunc = (handleSelectDetail) => {
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
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			width: 100
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
    },
    {
			title: '操作',
			dataIndex: 'ops',
			key: 'ops',
			align: 'center',
			width: 100,
			render: () => {
				return null
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
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			width: 100
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
