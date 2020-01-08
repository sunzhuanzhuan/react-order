import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as order from './order'
import * as account from './account'
import * as platform from './platform'
import * as setting from './setting'
import * as task from './task'
import { reducersResponseList } from '../constants/utils';

import {
  TPGetMcnReviewOrderList_success,
  TPQueryMcnFinancePaymentPage_success,
  TPGetExcuteStatusList_success,
  TPGetOrderStatusLists_success,
  TPGetClueDetail_success
} from '../actions'



//获取执行状态list
export const excuteStatus = handleActions({
  [TPGetExcuteStatusList_success]: (state, action) => {
    return [...action.payload.data]
  }
}, []);

//获取订单状态list
export const taskStatus = handleActions({
  [TPGetOrderStatusLists_success]: (state, action) => {
    return [...action.payload.data]
  }
}, []);

// 异常订单审核列表
export const mcnReviewOrderList = handleActions({
  [TPGetMcnReviewOrderList_success]: reducersResponseList(),
}, reducersResponseList.initList())

// 任务大厅打款列表
export const financeTradeRecord = handleActions({
  [TPQueryMcnFinancePaymentPage_success]: reducersResponseList(),
}, reducersResponseList.initList())

// 获取线索详情
export const clueDetail = handleActions({
  [TPGetClueDetail_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {});

export default combineReducers({
  mcnReviewOrderList,
  financeTradeRecord,
  excuteStatus,
  taskStatus,
  ...order,
  ...account,
  ...platform,
  ...setting,
  ...task,
  clueDetail
})
