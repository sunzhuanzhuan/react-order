import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';

//所属行业
export const {
  BSGetIndustryList,
  BSGetIndustryList_success
} = createHttpAction('BSGetIndustryList', Interface.getIndustryList);

//获取商户列表
export const {
  BSGetBusinessAccountList,
  BSGetBusinessAccountList_success
} = createHttpAction('BSGetBusinessAccountList', Interface.getBusinessAccountList);


//添加/修改商户信息
export const {
  BSUpdateBusinessAccount,
  BSUpdateBusinessAccount_success
} = createHttpAction('BSUpdateBusinessAccount', Interface.updateBusinessAccount, {
  method: 'post'
});

//删除商户信息
export const {
  BSDeleteBusinessAccount,
  BSDeleteBusinessAccount_success
} = createHttpAction('BSDeleteBusinessAccount', Interface.deleteBusinessAccount, {
  method: 'post'
});


//获取商户投诉列表
export const {
  BSGetCompensationList,
  BSGetCompensationList_success
} = createHttpAction('BSGetCompensationList', Interface.getCompensationList);

//处理投诉
export const {
  BSUpdateCompensation,
  BSUpdateCompensation_success
} = createHttpAction('BSUpdateCompensation', Interface.updateCompensation, {
  method: 'post'
});
