/*
 * @Descripttion: 
 * @Author: wangxinyue
 * @Date: 2020-01-06 15:29:58
 * @LastEditors  : wangxinyue
 * @LastEditTime : 2020-02-06 12:00:03
 */
import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as account from '../actions/account'
//常见分类
export const orderIndustryCategory = handleActions({
  [account.TPGetFiltersMeta_success]: (state, action) => {
    return [...action.payload.data.grouped_categories]
  },
}, [])
// 账号管理（合作平台）
export const accountList = handleActions({
  [account.TPGetAccountList_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {
  list: []
})
// 领取账号列表管理（合作平台）
export const claimAccountList = handleActions({
  [account.TPGetClaimAccountList_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {
  list: []
})

//蜂窝派账号管理页签数量
export const accountTabNumber = handleActions({
  [account.TPGetAccountTabNumber_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
//账号详情页
export const accountDetail = handleActions({
  [account.TPGetAccountDetail_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})

//内容评估查询
export const accountEstimateDetails = handleActions({
  [account.TPGetAccountEstimateDetails_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
