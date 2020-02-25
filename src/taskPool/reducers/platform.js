import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as platform from '../actions/platform'
// 合作平台列表
export const platformList = handleActions({
  [platform.TPGetPlatformList_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})
export const platformDetail = handleActions({
  [platform.TPPlatformDetail_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})

export const allProvince = handleActions({
  [platform.TPAllProvince_success]: (state, action) => {
    return [...action.payload.data]
  },
}, [])
