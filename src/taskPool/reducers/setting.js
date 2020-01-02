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
