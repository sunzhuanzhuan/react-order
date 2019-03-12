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


export const paymentListFunc = () => {
	return [
    {
			title: '序号',
			dataIndex: 'name11',
			key: 'name11',
			align: 'center',
      width: 100,
      render:()=>{
        return <a>查看</a>
      }
		},
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
