import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/accountInterface';
import { createAction } from "redux-actions";
// 订单管理（合作平台）
export const {
  getAccountList,
  getAccountList_success,
} = createHttpAction('getAccountList', Interface.getAccountList, {
  method: 'post'
});
