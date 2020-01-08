import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";
// 建议博主报价
export const {
  TPReadUnitPriceConfig,
  TPReadUnitPriceConfig_success
} = createHttpAction('TPReadUnitPriceConfig', Interface.setting.TPReadUnitPriceConfig, {
  method: 'post'
});
//获取博主报价
export const {
  TPGetReadUnitPriceConfig,
  TPGetReadUnitPriceConfig_success
} = createHttpAction('TPGetReadUnitPriceConfig', Interface.setting.TPGetReadUnitPriceConfig, {
  method: 'post'
});
// 获取质检配置
export const {
  TPGetQualityConfig,
  TPGetQualityConfig_success
} = createHttpAction('TPGetQualityConfig', Interface.setting.TPGetQualityConfig, {
  method: 'get'
});
//新增保留时长
export const {
  TPAddRetainTime,
  TPAddRetainTime_success
} = createHttpAction('TPAddRetainTime', Interface.setting.TPAddRetainTime, {
  method: 'post'
});
//更新质检配置
export const {
  TPChangeQualityConfig,
  TPChangeQualityConfig_success
} = createHttpAction('TPChangeQualityConfig', Interface.setting.TPChangeQualityConfig, {
  method: 'post'
});
//查询抽佣率
export const {
  TPQueryCommissionConfig,
  TPQueryCommissionConfig_success
} = createHttpAction('TPQueryCommissionConfig', Interface.setting.TPQueryCommissionConfig, {
  method: 'get'
});
// 修改抽佣率
export const {
  TPUpdateCommissionConfig,
  TPUpdateCommissionConfig_success
} = createHttpAction('TPUpdateCommissionConfig', Interface.setting.TPUpdateCommissionConfig, {
  method: 'post'
});
// 查询任务设置
export const {
  TPTaskCheck,
  TPTaskCheck_success
} = createHttpAction('TPTaskCheck', Interface.setting.TPTaskCheck, {
  method: 'get'
});
// 设置任务
export const {
  TPUpdateTaskCheck,
  TPUpdateTaskCheck_success
} = createHttpAction('TPUpdateTaskCheck', Interface.setting.TPUpdateTaskCheck, {
  method: 'post'
});
