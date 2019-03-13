import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions'

/**
 * 订单列表选择
 */
// 获取执行人
export const {
	getSalesManager,
	getSalesManager_success
} = createHttpAction('getSalesManager', Interface.salesManager, {
	method: 'get',
});
// 获取公司品牌
export const {
	getCompanyBrand,
	getCompanyBrand_success
} = createHttpAction('getCompanyBrand', Interface.companyBrand, {
	method: 'get',
});
// 获取公司项目
export const {
	getCompanyProject,
	getCompanyProject_success
} = createHttpAction('getCompanyProject', Interface.companyProject, {
	method: 'get',
});
// 获取订单列表
export const {
	getOrder,
	getOrder_success
} = createHttpAction('getOrder', Interface.order, {
	method: 'get',
});

export const updateFetchInfo = createAction('updateFetchInfo', (data) => {
	return { data };
})
