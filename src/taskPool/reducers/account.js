import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as account from '../actions/account'
// 订单管理（合作平台）
export const accountList = handleActions({
  [account.getAccountList_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {
  list: []
})


