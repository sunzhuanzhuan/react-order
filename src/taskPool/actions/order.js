import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/OrderInterface';
import { createAction } from "redux-actions";
// 订单管理（合作平台）
export const {
  getPlatformOrderList,
  getPlatformOrderList_success,
} = createHttpAction('getPlatformOrderList', Interface.getPlatformOrderList, {
  method: 'post'
});
