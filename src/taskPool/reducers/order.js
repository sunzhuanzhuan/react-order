import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as order from '../actions/order'
// 订单管理（合作平台）
export const platformOrderList = handleActions({
  [order.TPGetPlatformOrderList_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
// 订单管理（合作平台）
export const allMcnOrderList = handleActions({
  [order.TPGetAllMcnOrderList_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})

//获取订单状态列表
export const mcnOrderStateList = handleActions({
  [order.TPGetMcnOrderStateList_success]: (state, action) => {
    return [...action.payload.data]
  },
}, [])

//订单详情
export const orderMcnDetailInfo = handleActions({
  [order.TPOrderInfo_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
//获取数据曲线
export const dataCurvelist = handleActions({
  [order.TPQueryDataCurve_success]: (state, action) => {
    return [...action.payload.data]
  },
}, [])
