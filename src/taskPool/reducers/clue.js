import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import { reducersResponseList } from '../constants/utils';
import * as clue from '../actions/clue'

// 操作日志
export const log = handleActions({
  [clue.TPPostOperationLog_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {})

// 任务管理列表
export const clueManageList = handleActions({
  [clue.TPPostClueList_success]: reducersResponseList('id')
}, reducersResponseList.initList())

// 获取线索详情
export const clueDetail = handleActions({
  [clue.TPGetClueDetail_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {});
