import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions'

/**
 * 订单列表选择
 */
// 获取执行人
export const {
	getSalesManagers,
	getSalesManagers_success
} = createHttpAction('getSalesManagers', Interface.salesManagers, {
	method: 'get',
});
// 获取公司品牌
export const {
	getCompanyBrands,
	getCompanyBrands_success
} = createHttpAction('getCompanyBrands', Interface.companyBrands, {
	method: 'get',
});
// 获取公司项目
export const {
	getCompanyProjects,
	getCompanyProjects_success
} = createHttpAction('getCompanyProjects', Interface.companyProjects, {
	method: 'get',
});
// 获取公司配置平台
export const {
	getCompanyPlatforms,
	getCompanyPlatforms_success
} = createHttpAction('getCompanyPlatforms', Interface.companyPlatforms, {
	method: 'get',
});
// 获取订单列表
export const {
	getOrders,
	getOrders_success
} = createHttpAction('getOrders', Interface.order, {
	method: 'get',
});
// 清空列表数据

export const updateFetchInfo = createAction('updateFetchInfo', (data) => {
	return { data };
})
