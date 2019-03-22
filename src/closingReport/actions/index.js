import Interface from '../constants/Interface';
import { createHttpAction } from 'redux-action-extend';
import { createAction } from 'redux-actions';

/**
 * 订单列表选择
 */
  // 公司基本信息
export const {
    getCompanyTotalInfo,
    getCompanyTotalInfo_success
  } = createHttpAction('getCompanyTotalInfo', Interface.getCompanyTotalInfo, {
    method: 'get'
  });
// 获取执行人
export const {
  getExecutor,
  getExecutor_success
} = createHttpAction('getExecutor', Interface.getExecutor, {
  method: 'get'
});
// 获取销售
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
  // 数据单基本信息
export const {
    getSummaryTotalInfo,
    getSummaryTotalInfo_success
  } = createHttpAction('getSummaryTotalInfo', Interface.getSummaryTotalInfo, {
    method: 'get'
  });
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

// 添加平台(async)
export const {
  addSummaryPlatform,
  addSummaryPlatform_success
} = createHttpAction('addSummaryPlatform', Interface.addSummaryPlatform, {
  method: 'post'
});
// 添加平台
export const addPlatform = createAction('addPlatform', (data) => {
  return { data };
});

// 删除平台(async)
export const {
  deleteSummaryPlatform,
  deleteSummaryPlatform_success
} = createHttpAction('deleteSummaryPlatform', Interface.deleteSummaryPlatform, {
  method: 'post'
});
// 删除平台
export const removePlatform = createAction('removePlatform', (data) => {
  return { data };
});

// 删除订单(async)
export const {
  deleteSummaryOrder,
  deleteSummaryOrder_success
} = createHttpAction('deleteSummaryOrder', Interface.deleteSummaryOrder, {
  method: 'post'
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

// 更新平台数据信息
export const {
  updatePlatformInfo,
  updatePlatformInfo_success
} = createHttpAction('updatePlatformInfo', Interface.updatePlatformInfo, {
  method: 'post'
});

// 更新平台数据(设置完善)
export const submitPlatformInfo = createAction('submitPlatformInfo', (data) => {
  return { data };
});

// 更新平台数据信息
export const {
  checkPlatformData,
  checkPlatformData_success
} = createHttpAction('checkPlatformData', Interface.checkPlatformData, {
  method: 'post'
});

// 提交审核数据单
export const {
  submitCheckSummary
} = createHttpAction('submitCheckSummary', Interface.submitCheckSummary, {
  method: 'post'
});

// 提交审核数据单里的订单
export const {
  submitCheckSummaryByOrder
} = createHttpAction('submitCheckSummaryByOrder', Interface.submitCheckSummaryByOrder, {
  method: 'post'
});


// 清除创建页面拉取的全部信息
export const resetCreateReportData = createAction('resetCreateReportData', (data) => {
  return { data };
});

// 清除平台详细信息数据
export const clearPlatformData = createAction('clearPlatformData', (data) => {
  return { data };
});

// 清除全部可选订单
export const clearAllOrderList = createAction('clearAllOrderList', (data) => {
  return { data };
});
/**
 * 订单投放数据汇总列表
 */

  // 获取个人下公司简称
export const {
    getCompanyNames
  } = createHttpAction('getCompanyNames', Interface.getCompanyNames, {
    method: 'get'
  });
// 获取个人下品牌
export const {
  getBrands,
  getBrands_success
} = createHttpAction('getBrands', Interface.getBrands, {
  method: 'get'
});

// 获取个人下项目
export const {
  getProjects,
  getProjects_success
} = createHttpAction('getProjects', Interface.getProjects, {
  method: 'get'
});
// 订单投放数据汇总列表(订单维度)
export const {
  getSummaryListByOrder,
  getSummaryListByOrder_success
} = createHttpAction('getSummaryListByOrder', Interface.getSummaryListByOrder, {
  method: 'get'
});

// 订单投放数据审核列表
export const {
  getSummaryList,
  getSummaryList_success
} = createHttpAction('getSummaryList', Interface.getSummaryList, {
  method: 'get'
});

// 订单是否已完善
export const {
  getOrderIsFinish
} = createHttpAction('getOrderIsFinish', Interface.getOrderIsFinish, {
  method: 'get'
});
