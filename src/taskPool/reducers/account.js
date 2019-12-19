import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as account from '../actions/account'
// 账号管理（合作平台）
export const accountList = handleActions({
  [account.getAccountList_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {
  list: []
})
// 领取账号列表管理（合作平台）
export const claimAccountList = handleActions({
  [account.getClaimAccountList_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, {
  list: []
})

