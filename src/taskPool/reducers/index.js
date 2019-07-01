import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import {
  // BSGetCompensationList_success
} from '../actions'

// 商户投诉列表
/*export const businessCompensationList = handleActions({
  [BSGetCompensationList_success]: (state, action) => {
    return {
      ...action.payload.data
    }
  }
}, {})*/
export default combineReducers({
  // businessCompensationList
})
