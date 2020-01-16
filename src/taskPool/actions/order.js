import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";
// 订单管理（合作平台）
export const {
  TPGetPlatformOrderList,
  TPGetPlatformOrderList_success,
} = createHttpAction('TPGetPlatformOrderList', Interface.order.TPGetPlatformOrderList, {
  method: 'post'
});
// （同意(批量)、驳回（批量））
export const {
  TPUpdatePlatformOrder,
  TPUpdatePlatformOrder_success,
} = createHttpAction('TPUpdatePlatformOrder', Interface.order.TPUpdatePlatformOrder, {
  method: 'post'
});
// 上传执行单、上传结案报告）
export const {
  TPUpdatePlatformFile,
  TPUpdatePlatformFile_success,
} = createHttpAction('TPUpdatePlatformFile', Interface.order.TPUpdatePlatformFile, {
  method: 'post'
});

//订单管理微信公众号
export const {
  TPGetAllMcnOrderList,
  TPGetAllMcnOrderList_success,
} = createHttpAction('TPGetAllMcnOrderList', Interface.order.TPGetAllMcnOrderList, {
  method: 'post'
});
//一次质检不通过
export const {
  TPApprovedFirstFailure,
  TPApprovedFirstFailure_success,
} = createHttpAction('TPApprovedFirstFailure', Interface.order.TPApprovedFirstFailure, {
  method: 'post'
})
//一次质检通过
export const {
  TPApprovedFirstSuccess,
  TPApprovedFirstSuccess_success,
} = createHttpAction('TPApprovedFirstSuccess', Interface.order.TPApprovedFirstSuccess, {
  method: 'post'
})
//二次质检不通过
export const {
  TPApprovedSecondFailure,
  TPApprovedSecondFailure_success,
} = createHttpAction('TPApprovedSecondFailure', Interface.order.TPApprovedSecondFailure, {
  method: 'post'
})
//二次质检通过
export const {
  TPApprovedSecondSuccess,
  TPApprovedSecondSuccess_success,
} = createHttpAction('TPApprovedSecondSuccess', Interface.order.TPApprovedSecondSuccess, {
  method: 'post'
})
//执行结果确认
export const {
  TPMcnOrderConfirmFinish,
  TPMcnOrderConfirmFinish_success,
} = createHttpAction('TPMcnOrderConfirmFinish', Interface.order.TPMcnOrderConfirmFinish, {
  method: 'post'
})
//执行结果取消
export const {
  TPMcnOrderConfirmCancel,
  TPMcnOrderConfirmCancel_success,
} = createHttpAction('TPMcnOrderConfirmCancel', Interface.order.TPMcnOrderConfirmCancel, {
  method: 'post'
})
//回执链接调整
export const {
  TPFristFailureUpdateContentUrl,
  TPFristFailureUpdateContentUrl_success,
} = createHttpAction('TPFristFailureUpdateContentUrl', Interface.order.TPFristFailureUpdateContentUrl, {
  method: 'post'
})
//获取订单状态列表
export const {
  TPGetMcnOrderStateList,
  TPGetMcnOrderStateList_success,
} = createHttpAction('TPGetMcnOrderStateList', Interface.order.TPGetMcnOrderStateList)

//回执链接调整_质检前修改
export const {
  TPUpdateContentUrl,
  TPUpdateContentUrl_success,
} = createHttpAction('TPUpdateContentUrl', Interface.order.TPUpdateContentUrl, {
  method: 'post'
})
//订单失败原因查询
export const {
  TPFailureReasons,
  TPFailureReasons_success,
} = createHttpAction('TPFailureReasons', Interface.order.TPFailureReasons, {
  method: 'post'
})
//订单详情
export const {
  TPOrderInfo,
  TPOrderInfo_success,
} = createHttpAction('TPOrderInfo', Interface.order.TPOrderInfo)
//获取数据曲线
export const {
  TPQueryDataCurve,
  TPQueryDataCurve_success,
} = createHttpAction('TPQueryDataCurve', Interface.order.TPQueryDataCurve)
