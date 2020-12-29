import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
  getKocOrderInfo_success,
  postSearchList_success
} from '../actions';

// 详情
export const kocOrderInfo = handleActions({
  [getKocOrderInfo_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})
// 获取列表
export const postSearchList = handleActions({
  [postSearchList_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})


export default combineReducers({
  postSearchList,
  kocOrderInfo
})
