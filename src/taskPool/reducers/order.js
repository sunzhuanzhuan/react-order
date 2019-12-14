import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as order from '../actions/order'
// 订单管理（合作平台）
export const platformOrderList = handleActions({
  [order.getPlatformOrderList_success]: (state, action) => {
    return { ...action.payload.data }
  },
}, [])


