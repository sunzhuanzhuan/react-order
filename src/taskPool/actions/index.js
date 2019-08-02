import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";

// 新增任务
export const {
  TPAddTask
} = createHttpAction('TPAddTask', Interface.addTask, {
  method: 'post'
});

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

// 任务管理列表
export const {
  TPTaskManageList,
  TPTaskManageList_success
} = createHttpAction('TPTaskManageList', Interface.taskManageList, {
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
