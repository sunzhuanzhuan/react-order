import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as setting from '../actions/setting'
// 获取阅读价格
export const readUnitPriceConfig = handleActions({
  [setting.TPGetReadUnitPriceConfig_success]: (state, action) => {
    return [...action.payload.data.accountGardes]
  },
}, [])
//获取质检配置数据
export const qualityConfig = handleActions({
  [setting.TPGetQualityConfig_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
//新增保留时长
export const addRetainTime = handleActions({
  [setting.TPAddRetainTime_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
// 抽佣率设置
export const commissionConfig = handleActions({
  [setting.TPQueryCommissionConfig_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
// 任务设置
export const taskCheck = handleActions({
  [setting.TPTaskCheck_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
