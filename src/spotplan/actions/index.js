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
  method: 'get'
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
  method: 'get'
});

