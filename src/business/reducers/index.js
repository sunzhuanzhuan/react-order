import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import {
  BSGetIndustryList_success,
  BSGetBusinessAccountList_success,
  BSGetCompensationList_success
} from '../actions'

// 行业数据
export const industryList = handleActions({
  [BSGetIndustryList_success]: (state, action) => {
    return [
      ...action.payload.data
    ]
  }
}, [])
// 商户列表
export const businessAccountList = handleActions({
  [BSGetBusinessAccountList_success]: (state, action) => {
    return {
      ...action.payload.data
    }
  }
}, {})

// 商户投诉列表
export const businessCompensationList = handleActions({
  [BSGetCompensationList_success]: (state, action) => {
    return {
      ...action.payload.data
    }
  }
}, {})
export default combineReducers({
  industryList,
  businessAccountList,
  businessCompensationList
})
