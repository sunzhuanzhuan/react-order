import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
  getKocOrderInfo_success,
  getList_success
} from '../actions';

// 详情
export const kocOrderInfo = handleActions({
  [getKocOrderInfo_success]: (state, action) => {
    return { ...action.payload.info }
  }
}, {})
// 获取列表
export const list = handleActions({
  [getList_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})


export default combineReducers({
  list,
  kocOrderInfo
})
