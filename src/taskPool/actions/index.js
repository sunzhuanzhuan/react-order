import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";
export * from './order'
export * from './account'
export * from './task'
export * from './attribute'


// 获取任务大厅行业列表
export const {
  TPGetTaskIndustry
} = createHttpAction('TPGetTaskIndustry', Interface.getTaskIndustry);

// 下线任务
export const {
  TPOffline
} = createHttpAction('TPOffline', Interface.offline);

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


// 任务详情
export const {
  TPTaskDetail,
  TPTaskDetail_success
} = createHttpAction('TPTaskDetail', Interface.taskDetail);

// 修改任务详情
export const TPChangeTaskDetail = createAction('TPChangeTaskDetail', (data) => {
  return { data }
})

// 清除任务详情
export const TPTaskDetailClear = createAction('TPTaskDetailClear', (data) => {
  return { data }
})

// 查询博主领取列表
export const {
  TPMcnOrderList,
  TPMcnOrderList_success
} = createHttpAction('TPMcnOrderList', Interface.mcnOrderList, {
  method: 'post'
});

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



// 质检前回执链接调整
export const {
  TPUpdateContentUrl
} = createHttpAction('TPUpdateContentUrl', Interface.TPUpdateContentUrl, {
  method: 'post'
});


// 回执链接调整
export const {
  TPFristFailureUpdateContentUrl
} = createHttpAction('TPFristFailureUpdateContentUrl', Interface.TPFristFailureUpdateContentUrl, {
  method: 'post'
});

// 一次质检不通过
export const {
  TPApprovedFristFailure
} = createHttpAction('TPApprovedFristFailure', Interface.TPApprovedFristFailure, {
  method: 'post'
});

// 一次质检通过
export const {
  TPApprovedFirstSuccess
} = createHttpAction('TPApprovedFirstSuccess', Interface.TPApprovedFirstSuccess, {
  method: 'post'
});

// 二次质检不通过
export const {
  TPApprovedSecondFailure
} = createHttpAction('TPApprovedSecondFailure', Interface.TPApprovedSecondFailure, {
  method: 'post'
});

// 二次质检通过
export const {
  TPApprovedSecondSuccess
} = createHttpAction('TPApprovedSecondSuccess', Interface.TPApprovedSecondSuccess, {
  method: 'post'
});

// 执行结果确认
export const {
  TPMcnOrderConfirmFinish
} = createHttpAction('TPMcnOrderConfirmFinish', Interface.TPMcnOrderConfirmFinish, {
  method: 'post'
});

// 执行结果取消
export const {
  TPMcnOrderConfirmCancel
} = createHttpAction('TPMcnOrderConfirmCancel', Interface.TPMcnOrderConfirmCancel, {
  method: 'post'
});

// 获取操作日志
export const {
  TPPostOperationLog
} = createHttpAction('TPPostOperationLog', Interface.TPPostOperationLog, {
  method: 'post'
});
//线索列表
export const {
  TPPostClueList
} = createHttpAction('TPPostClueList', Interface.TPPostClueList, {
  method: 'post'
});
//线索详情
export const {
  TPGetClueDetail,
  TPGetClueDetail_success
} = createHttpAction('TPGetClueDetail', Interface.TPGetClueDetail, {
  method: 'get'
});
