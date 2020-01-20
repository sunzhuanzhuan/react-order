import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";
// 合作平台管理列表
export const {
  TPGetPlatformList,
  TPGetPlatformList_success
} = createHttpAction('TPGetPlatformList', Interface.platform.TPGetPlatformList, {
  method: 'post'
});
// 添加合作平台
export const {
  TPSavePlatform
} = createHttpAction('TPSavePlatform', Interface.platform.TPSavePlatform, {
  method: 'post'
});
// 列表详情
export const {
  TPPlatformDetail,
  TPPlatformDetail_success
} = createHttpAction('TPPlatformDetail', Interface.platform.TPPlatformDetail, {
  method: 'post'
});
// 删除和终止
export const {
  TPPUpdatePlatform,
  TPPUpdatePlatform_success
} = createHttpAction('TPPUpdatePlatform', Interface.platform.TPPUpdatePlatform, {
  method: 'post'
});
// 省会列表
export const {
  TPAllProvince,
  TPAllProvince_success
} = createHttpAction('TPAllProvince', Interface.platform.TPAllProvince, {
  method: 'get'
});
