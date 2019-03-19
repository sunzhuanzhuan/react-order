import Interface from '../constants/Interface';
import { createHttpAction } from 'redux-action-extend';
import { createAction } from 'redux-actions';

/**
 * 订单列表选择
 */
  // 获取执行人
export const {
    getSalesManagers,
    getSalesManagers_success
  } = createHttpAction('getSalesManagers', Interface.salesManagers, {
    method: 'get'
  });
// 获取公司品牌
export const {
  getCompanyBrands,
  getCompanyBrands_success
} = createHttpAction('getCompanyBrands', Interface.companyBrands, {
  method: 'get'
});
// 获取公司项目
export const {
  getCompanyProjects,
  getCompanyProjects_success
} = createHttpAction('getCompanyProjects', Interface.companyProjects, {
  method: 'get'
});
// 获取公司配置平台
export const {
  getCompanyPlatforms,
  getCompanyPlatforms_success
} = createHttpAction('getCompanyPlatforms', Interface.companyPlatforms, {
  method: 'get'
});
// 获取订单列表
export const {
  getOrders,
  getOrders_success
} = createHttpAction('getOrders', Interface.order, {
  method: 'get'
});
// 清空列表数据

/**
 * 数据单操作
 */
  // 新建或修改数据单信息
export const {
    addOrUpdateSummary,
    addOrUpdateSummary_success
  } = createHttpAction('addOrUpdateSummary', Interface.addOrUpdateSummary, {
    method: 'post'
  });
// 数据单订单详情
export const {
    getSummaryOrderInfo,
    getSummaryOrderInfo_success
  } = createHttpAction('getSummaryOrderInfo', Interface.getSummaryOrderInfo, {
    method: 'get'
  });
// 添加平台
export const addPlatform = createAction('addPlatform', (data) => {
  return { data };
});
// 删除平台
export const removePlatform = createAction('removePlatform', (data) => {
  return { data };
});
// 删除订单
export const removeSummaryOrder = createAction('removeSummaryOrder', (data) => {
  return { data };
});
// 获取平台信息
export const {
  getPlatformDataInfo,
  getPlatformDataInfo_success
} = createHttpAction('getPlatformDataInfo', Interface.getPlatformDataInfo, {
  method: 'get'
});
