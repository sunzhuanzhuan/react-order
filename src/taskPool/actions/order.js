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
