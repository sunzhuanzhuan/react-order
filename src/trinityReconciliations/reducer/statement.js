import { 
  getOrderList_success,
  getSummaryList_success,
  getDetailSummary_success,
  getDetailSummaryList_success,
  getListStatement_success,
  getToken_success,
  searchName_success
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
    return [...action.payload.data ]
	}
}, {})


//对账单列表
export const statementList = handleActions({
	[getListStatement_success]: (state, action) => {
    return {...action.payload.data }
	}
}, {})


//获取token

export const token = handleActions({
	[getToken_success]: (state, action) => (action.payload.data)
}, "")


//获取账号名称模糊搜索
export const accountName = handleActions({
	[searchName_success]: (state, action) => (action.payload.data)
}, "")

