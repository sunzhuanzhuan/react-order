import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";
export * from './order'
export * from './account'
export * from './task'
export * from './attribute'
export * from './clue'
export * from './platform'
export * from './setting'


// 根据公司名称模糊查询公司列表
export const {
  TPFuzzyQueryCompany
} = createHttpAction('TPFuzzyQueryCompany', Interface.fuzzyQueryCompany, {
  method: 'post'
});

// 查询任务大厅余额
export const {
  TPQueryAvailableBalance
} = createHttpAction('TPQueryAvailableBalance', Interface.queryAvailableBalance);

// 查询预估阅读数/转发数
export const {
  TPQueryActionNum
} = createHttpAction('TPQueryActionNum', Interface.queryActionNum, {
  method: 'post'
});


// 修改任务详情
export const TPChangeTaskDetail = createAction('TPChangeTaskDetail', (data) => {
  return { data }
})

// 清除任务详情
export const TPTaskDetailClear = createAction('TPTaskDetailClear', (data) => {
  return { data }
})


// 异常任务管理列表
export const {
  TPGetMcnReviewOrderList,
  TPGetMcnReviewOrderList_success
} = createHttpAction('TPGetMcnReviewOrderList', Interface.getMcnReviewOrderList, {
  method: 'post'
});

// 异常任务通过
export const {
  TPApprovedSuccess,
} = createHttpAction('TPApprovedSuccess', Interface.approvedSuccess, {
  method: 'post'
});

// 异常任务拒绝
export const {
  TPApprovedFailure,
} = createHttpAction('TPApprovedFailure', Interface.approvedFailure, {
  method: 'post'
});

// 任务大厅打款列表
export const {
  TPQueryMcnFinancePaymentPage,
  TPQueryMcnFinancePaymentPage_success,
} = createHttpAction('TPQueryMcnFinancePaymentPage', Interface.queryMcnFinancePaymentPage, {
  method: 'post'
});

// 下载回传接口，表示执行任务
export const {
  TPPayMcnFinancePayment,
} = createHttpAction('TPPayMcnFinancePayment', Interface.payMcnFinancePayment, {
  method: 'post'
});


//-----------------------------V1.1---------------------------------------

//获取执行状态list
export const {
  TPGetExcuteStatusList,
  TPGetExcuteStatusList_success
} = createHttpAction('TPGetExcuteStatusList', Interface.TPGetExcuteStatusList, {
  method: 'get'
});

//获取订单状态list
export const {
  TPGetOrderStatusLists,
  TPGetOrderStatusLists_success
} = createHttpAction('TPGetOrderStatusLists', Interface.TPGetOrderStatusLists, {
  method: 'get'
});

// 获取任务管理列表
export const {
  TPGetAllMcnOrder,
  TPGetAllMcnOrder_success
} = createHttpAction('TPGetAllMcnOrder', Interface.TPGetAllMcnOrder, {
  method: 'post'
});




