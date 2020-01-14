import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as setting from '../actions/setting'
// 获取阅读价格
export const readUnitPriceConfig = handleActions({
  [setting.TPGetReadUnitPriceConfig_success]: (state, action) => {
    if (action.payload.data) {
      return [...action.payload.data.accountGardes]
    } else {
      let arr = [{ accountGarde: 'A' }
        , { accountGarde: 'B' }
        , { accountGarde: 'C' }
        , { accountGarde: 'D' }
        , { accountGarde: 'E' }]
      return arr
    }


  },
}, [])
//获取质检配置数据
export const qualityConfig = handleActions({
  [setting.TPGetQualityConfig_success]: (state, action) => {
    let list = action.payload.data.retainTimeList || []
    for (let i = 0; i < list.length; i++) {
      if (list[i].retainTime == 24 || list[i].retainTime == 48) {
        list.splice(i, 1)
      }
    }

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
    return [...action.payload.data]
  },
}, [])
// 获取通知人员的列表
export const notificationList = handleActions({
  [setting.TPGetNotificationList_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
// 12306账号等级
export const dimensionConfig = handleActions({
  [setting.TPGetDimensionConfig_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
//任务要求--
export const taskLaunchConfigLiang = handleActions({
  [setting.TPGetTaskLaunchConfigLiang_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
//包天模式
export const taskLaunchConfigTian = handleActions({
  [setting.TPGetTaskLaunchConfigTian_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
//返现优惠
export const taskLaunchConfigHui = handleActions({
  [setting.TPGetTaskLaunchConfigHui_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
// 获取人员
export const userInfo = handleActions({
  [setting.TPQueryUserInfo_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
