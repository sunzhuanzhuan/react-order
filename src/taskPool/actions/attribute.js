/**
 * Created by lzb on 2019-12-24.
 */
import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";

// 资质模糊查询
export const {
  TPQueryQualificationByName,
} = createHttpAction('TPQueryQualificationByName', Interface.attribute.queryQualificationByName, {
  method: 'post'
});

// 资质名重复校验
export const {
  TPCheckQualification,
} = createHttpAction('TPCheckQualification', Interface.attribute.checkQualification, {
  method: 'post'
});

// 资质分页查询
export const {
  TPQueryQualificationList,
  TPQueryQualificationList_success,
} = createHttpAction('TPQueryQualificationList', Interface.attribute.queryQualificationList, {
  method: 'post'
});

// 资质添加
export const {
  TPAddQualification,
} = createHttpAction('TPAddQualification', Interface.attribute.addQualification, {
  method: 'post'
});

// 行业添加/更新
export const {
  TPAddOrUpdateIndustryInfo,
} = createHttpAction('TPAddOrUpdateIndustryInfo', Interface.attribute.addOrUpdateIndustryInfo, {
  method: 'post'
});

// 行业添加/更新
export const {
  TPGetIndustryInfo,
} = createHttpAction('TPGetIndustryInfo', Interface.attribute.getIndustryInfo);



