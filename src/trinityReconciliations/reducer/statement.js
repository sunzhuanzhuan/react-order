import { 
  getOrderList_success,
  getTrinitySummaryList_success,
  getDelSummary_success,
  getDetailSummaryList_success,
  getListStatement_success,
  getToken_success,
  searchName_success,
  getInputList_success,
  getAgentInfo_success,
  getDetaillummary_success

 } from '../actions'
import { handleActions } from 'redux-actions';

//订单类表
export const orderList = handleActions({
	[getOrderList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

//汇总当列表
export const summaryTrinityList = handleActions({
	[getTrinitySummaryList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

//汇总单详情
export const detailSummary = handleActions({
	[getDetaillummary_success]: (state, action) => {
    return {...action.payload.data }
	}
}, {})
//释放汇总单
export const delSummary = handleActions({
	[getDelSummary_success]: (state, action) => {
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


//对账单inputlist
//获取账号名称模糊搜索
export const statementInputList = handleActions({
	[getInputList_success]: (state, action) => (action.payload.data)
}, [])

//获取代理商信息
export const agentInfo = handleActions({
	[getAgentInfo_success]: (state, action) => (action.payload.data)
}, [])
