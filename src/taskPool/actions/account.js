import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/accountInterface';
import { createAction } from "redux-actions";
// 账号管理（合作平台）
export const {
  getAccountList,
  getAccountList_success,
} = createHttpAction('getAccountList', Interface.getAccountList, {
  method: 'post'
});
//上下架
export const {
  updateAccountStateMsg,
  updateAccountStateMsg_success,
} = createHttpAction('updateAccountStateMsg', Interface.updateAccountStateMsg, {
  method: 'post'
});

// 账号管理（合作平台）
export const {
  getClaimAccountList,
  getClaimAccountList_success,
} = createHttpAction('getClaimAccountList', Interface.getClaimAccountList, {
  method: 'post'
});
//领取账号
export const {
  claimAccount,
  claimAccount_success,
} = createHttpAction('claimAccount', Interface.claimAccount, {
  method: 'post'
});
