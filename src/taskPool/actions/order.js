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
