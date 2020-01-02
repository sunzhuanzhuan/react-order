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
