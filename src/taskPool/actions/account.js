import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";
// 账号管理（合作平台）
export const {
  getAccountList,
  getAccountList_success,
} = createHttpAction('getAccountList', Interface.account.getAccountList, {
  method: 'post'
});
//上下架
export const {
  updateAccountStateMsg,
  updateAccountStateMsg_success,
} = createHttpAction('updateAccountStateMsg', Interface.account.updateAccountStateMsg, {
  method: 'post'
});

// 领取列表
export const {
  getClaimAccountList,
  getClaimAccountList_success,
} = createHttpAction('getClaimAccountList', Interface.account.getClaimAccountList, {
  method: 'post'
});
//领取账号
export const {
  claimAccount,
  claimAccount_success,
} = createHttpAction('claimAccount', Interface.account.claimAccount, {
  method: 'post'
});


//账号详情
export const {
  getAccountDetail,
  getAccountDetail_success,
} = createHttpAction('getAccountDetail', Interface.account.getAccountDetail, {
  method: 'post'
});

//批量通过/批量拒绝
export const {
  batchUpdateAccountState,
  batchUpdateAccountState_success,
} = createHttpAction('batchUpdateAccountState', Interface.account.batchUpdateAccountState, {
  method: 'post'
});

//账号审核
export const {
  auditAccount,
  auditAccount_success,
} = createHttpAction('auditAccount', Interface.account.auditAccount, {
  method: 'post'
});

//内容评估查询
export const {
  getAccountEstimateDetails,
  getAccountEstimateDetails_success,
} = createHttpAction('getAccountEstimateDetails', Interface.account.getAccountEstimateDetails, {
  method: 'post'
});

//内容评估提交
export const {
  accountEstimateSubmit,
  accountEstimateSubmit_success,
} = createHttpAction('accountEstimateSubmit', Interface.account.accountEstimateSubmit, {
  method: 'post'
});

//账号评语提交
export const {
  updateAccountEstimateDescribe,
  updateAccountEstimateDescribe_success,
} = createHttpAction('updateAccountEstimateDescribe', Interface.account.updateAccountEstimateDescribe, {
  method: 'post'
});

//蜂窝派账号管理页签数量
export const {
  getAccountTabNumber,
  getAccountTabNumber_success,
} = createHttpAction('getAccountTabNumber', Interface.account.getAccountTabNumber);

