import { 
  getOrderList_success,
  getSummaryList_success,
  getDetailSummary_success,
  getDetailSummaryList_success
 } from '../actions'
import { handleActions } from 'redux-actions';

//订单类表
export const orderList = handleActions({
	[getOrderList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

//汇总当列表
export const summaryList = handleActions({
	[getSummaryList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

//汇总单详情
export const detailSummary = handleActions({
	[getDetailSummary_success]: (state, action) => {
    return {...action.payload.data }
	}
}, {})
//汇总单详情列表格

export const detailSummaryList = handleActions({
	[getDetailSummaryList_success]: (state, action) => {
    return {...action.payload.data }
	}
}, {})
