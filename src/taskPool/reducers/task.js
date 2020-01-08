import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import { reducersResponseList } from '../constants/utils';

import {
  TPTaskManageList_success,
  TPGetTaskPosition_success,
  TPTaskDetail_success,
  TPChangeTaskDetail,
  TPTaskDetailClear,
  TPMcnOrderList_success,
  TPMcnOrderListByTemp_success,
  TPGetAllMcnOrder_success,
  TPGetIndustryList_success
} from '../actions';

// 任务管理列表
export const taskManageList = handleActions({
  [TPTaskManageList_success]: reducersResponseList('id')
}, reducersResponseList.initList())

// 任务详情
export const taskDetail = handleActions({
  [TPTaskDetail_success]: (state, action) => {
    return {
      ...action.payload.data
    }
  },
  [TPChangeTaskDetail]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    }
  },
  [TPTaskDetailClear]: (state, action) => {
    return {}
  }
}, {})

//获取订单管理列表
export const orderManageList = handleActions({
  [TPGetAllMcnOrder_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {});

//获取任务位置列表
export const taskPositionList = handleActions({
  [TPGetTaskPosition_success]: (state, action) => {
    return [...action.payload.data]
  }
}, []);

// 任务详情, 博主领取列表
export const mcnOrderList = handleActions({
  [TPMcnOrderList_success]: reducersResponseList('id'),
  [TPTaskDetailClear]: (state, action) => {
    return reducersResponseList.initList()
  }
}, reducersResponseList.initList())

// 任务详情, 博主申请列表
export const mcnOrderListByTemp = handleActions({
  [TPMcnOrderListByTemp_success]: reducersResponseList('id'),
  [TPTaskDetailClear]: (state, action) => {
    return reducersResponseList.initList()
  }
}, reducersResponseList.initList())

// 行业列表
export const taskIndustryList = handleActions({
  [TPGetIndustryList_success]: reducersResponseList('id')
}, reducersResponseList.initList())
