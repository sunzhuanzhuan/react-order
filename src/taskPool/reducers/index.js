import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import {
  TPTaskManageList_success,
  TPTaskDetail_success,
  TPChangeTaskDetail,
  TPTaskDetailClear,
  TPMcnOrderList_success,
  TPGetMcnReviewOrderList_success,
} from '../actions'

// 处理列表数据为map表
function handleResponseList(primary_key = 'id') {
  return (state, action) => {
    let response = action.payload.data || {}, source = {}
    const { total = 0, pageNum = 1, pageSize = 50, list = [] } = response
    const keys = list.map(item => {
      source[item[primary_key]] = { ...item }
      source[item[primary_key]]['key'] = item[primary_key]
      return item[primary_key]
    })
    return {
      total,
      pageNum,
      pageSize,
      keys,
      source: { ...state.source, ...source },
      response
    }
  }
}

// 初始化列表数据
function initList() {
  return { keys: [], source: {}, total: 0, pageNum: 1, pageSize: 50, response: {} }
}

// 任务管理列表
export const taskManageList = handleActions({
  [TPTaskManageList_success]: handleResponseList('id')
}, initList())

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


// 任务详情, 博主领取列表
export const mcnOrderList = handleActions({
  [TPMcnOrderList_success]: handleResponseList('id'),
  [TPTaskDetailClear]: (state, action) => {
    return initList()
  }
}, initList())

// 异常订单审核列表
export const mcnReviewOrderList = handleActions({
  [TPGetMcnReviewOrderList_success]: handleResponseList(),
}, initList())



export default combineReducers({
  taskManageList,
  taskDetail,
  mcnOrderList,
  mcnReviewOrderList
})
