import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
  getSpotplanCompanyInfo,
  getSpotplanCompanyInfo_success
} = createHttpAction('getSpotplanCompanyInfo', Interface.getSpotplanCompanyInfo, {
  method: 'get'
});

export const {
  postAddSpotplan,
  postAddSpotplan_success
} = createHttpAction('postAddSpotplan', Interface.postAddSpotplan, {
  method: 'post'
});

export const {
  getSpotplanExecutor,
  getSpotplanExecutor_success
} = createHttpAction('getSpotplanExecutor', Interface.getSpotplanExecutor, {
  method: 'get'
});

export const {
  getSpotplanPlatform,
  getSpotplanPlatform_success
} = createHttpAction('getSpotplanPlatform', Interface.getSpotplanPlatform, {
  method: 'get'
});

export const {
  getSpotplanProject,
  getSpotplanProject_success
} = createHttpAction('getSpotplanProject', Interface.getSpotplanProject, {
  method: 'get'
});

export const {
  getSpotplanOrderList,
  getSpotplanOrderList_success
} = createHttpAction('getSpotplanOrderList', Interface.getSpotplanOrderList, {
  method: 'get',
  ignoreToast: true,
});

export const {
  postAddSpotplanOrder,
  postAddSpotplanOrder_success
} = createHttpAction('postAddSpotplanOrder', Interface.postAddSpotplanOrder, {
  method: 'post'
});

export const {
  getSpotplanEditOrder,
  getSpotplanEditOrder_success
} = createHttpAction('getSpotplanEditOrder', Interface.getSpotplanEditOrder, {
  method: 'get',
  ignoreToast: true,
});

export const {
  postUpdateSpotplanOrder,
  postUpdateSpotplanOrder_success
} = createHttpAction('postUpdateSpotplanOrder', Interface.postUpdateSpotplanOrder, {
  method: 'post'
});

export const {
  getSpotplanBrand,
  getSpotplanBrand_success
} = createHttpAction('getSpotplanBrand', Interface.getSpotplanBrand, {
  method: 'get'
});

export const {
  getSpotplanList,
  getSpotplanList_success
} = createHttpAction('getSpotplanList', Interface.getSpotplanList, {
  method: 'get',
  ignoreToast: true,
});

export const {
  getSpotplanPoInfo,
  getSpotplanPoInfo_success
} = createHttpAction('getSpotplanPoInfo', Interface.getSpotplanPoInfo, {
  method: 'get',
});

export const {
  getSpotplanAmount,
  getSpotplanAmount_success
} = createHttpAction('getSpotplanAmount', Interface.getSpotplanAmount, {
  method: 'get',
});

export const {
  getBasicSpotplanOrderInfo,
  getBasicSpotplanOrderInfo_success
} = createHttpAction('getBasicSpotplanOrderInfo', Interface.getBasicSpotplanOrderInfo, {
  method: 'get',
});

export const {
  getUpdateSpotplanOrder,
  getUpdateSpotplanOrder_success
} = createHttpAction('getUpdateSpotplanOrder', Interface.getUpdateSpotplanOrder, {
  method: 'get',
});

export const {
  getUpdateSpotplanOrderLog,
  getUpdateSpotplanOrderLog_success
} = createHttpAction('getUpdateSpotplanOrderLog', Interface.getUpdateSpotplanOrderLog, {
  method: 'get',
});

export const {
  postChangeNumberSpotplanOrder,
  postChangeNumberSpotplanOrder_success
} = createHttpAction('postChangeNumberSpotplanOrder', Interface.postChangeNumberSpotplanOrder, {
  method: 'post',
});

export const {
  getExportSpotplamExcel,
  getExportSpotplamExcel_success
} = createHttpAction('getExportSpotplamExcel', Interface.getExportSpotplamExcel, {
  method: 'get',
});

