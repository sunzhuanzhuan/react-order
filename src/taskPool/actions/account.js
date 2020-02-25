import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";
//获取常见分类
export const {
  TPGetFiltersMeta,
  TPGetFiltersMeta_success,
} = createHttpAction('TPGetFiltersMeta', '/export/account/getFiltersMeta');
// 账号管理（合作平台）
export const {
  TPGetAccountList,
  TPGetAccountList_success,
} = createHttpAction('TPGetAccountList', Interface.account.TPGetAccountList, {
  method: 'post'
});
//上下架
export const {
  TPUpdateAccountStateMsg,
  TPUpdateAccountStateMsg_success,
} = createHttpAction('TPUpdateAccountStateMsg', Interface.account.TPUpdateAccountStateMsg, {
  method: 'post'
});

// 领取列表
export const {
  TPGetClaimAccountList,
  TPGetClaimAccountList_success,
} = createHttpAction('TPGetClaimAccountList', Interface.account.TPGetClaimAccountList, {
  method: 'post'
});
//领取账号
export const {
  TPClaimAccount,
  TPClaimAccount_success,
} = createHttpAction('TPClaimAccount', Interface.account.TPClaimAccount, {
  method: 'post'
});


//账号详情
export const {
  TPGetAccountDetail,
  TPGetAccountDetail_success,
} = createHttpAction('TPGetAccountDetail', Interface.account.TPGetAccountDetail, {
  method: 'post'
});

//批量通过/批量拒绝
export const {
  TPBatchUpdateAccountState,
  TPBatchUpdateAccountState_success,
} = createHttpAction('TPBatchUpdateAccountState', Interface.account.TPBatchUpdateAccountState, {
  method: 'post'
});

//账号审核
export const {
  TPAuditAccount,
  TPAuditAccount_success,
} = createHttpAction('TPAuditAccount', Interface.account.TPAuditAccount, {
  method: 'post'
});

//内容评估查询
export const {
  TPGetAccountEstimateDetails,
  TPGetAccountEstimateDetails_success,
} = createHttpAction('TPGetAccountEstimateDetails', Interface.account.TPGetAccountEstimateDetails, {
  method: 'post'
});

//内容评估提交
export const {
  TPAccountEstimateSubmit,
  TPAccountEstimateSubmit_success,
} = createHttpAction('TPAccountEstimateSubmit', Interface.account.TPAccountEstimateSubmit, {
  method: 'post'
});

//账号评语提交
export const {
  TPUpdateAccountEstimateDescribe,
  TPUpdateAccountEstimateDescribe_success,
} = createHttpAction('TPUpdateAccountEstimateDescribe', Interface.account.TPUpdateAccountEstimateDescribe, {
  method: 'post'
});

//蜂窝派账号管理页签数量
export const {
  TPGetAccountTabNumber,
  TPGetAccountTabNumber_success,
} = createHttpAction('TPGetAccountTabNumber', Interface.account.TPGetAccountTabNumber);

