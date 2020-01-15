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
// 获取通知人员的列表
export const {
  TPGetNotificationList,
  TPGetNotificationList_success
} = createHttpAction('TPGetNotificationList', Interface.setting.TPGetNotificationList, {
  method: 'post'
});
// 删除通知人员
export const {
  TPDeleteNotice
} = createHttpAction('TPDeleteNotice', Interface.setting.TPDeleteNotice, {
  method: 'post'
});
// 应用12306的账号等级
export const {
  TPDimensionConfig,
  TPDimensionConfig_success
} = createHttpAction('TPDimensionConfig', Interface.setting.TPDimensionConfig, {
  method: 'post'
});
// 获取12306的账号等级
export const {
  TPGetDimensionConfig,
  TPGetDimensionConfig_success
} = createHttpAction('TPGetDimensionConfig', Interface.setting.TPGetDimensionConfig, {
  method: 'post'
});
// 任务要求
export const {
  TPGetTaskLaunchConfigLiang,
  TPGetTaskLaunchConfigLiang_success
} = createHttpAction('TPGetTaskLaunchConfigLiang', Interface.setting.TPGetTaskLaunchConfigLiang, {
  method: 'post'
});
// 包天模式
export const {
  TPGetTaskLaunchConfigTian,
  TPGetTaskLaunchConfigTian_success
} = createHttpAction('TPGetTaskLaunchConfigTian', Interface.setting.TPGetTaskLaunchConfigTian, {
  method: 'post'
});
// 返现优惠
export const {
  TPGetTaskLaunchConfigHui,
  TPGetTaskLaunchConfigHui_success
} = createHttpAction('TPGetTaskLaunchConfigHui', Interface.setting.TPGetTaskLaunchConfigHui, {
  method: 'post'
});
// 删除包天啥的
export const {
  TPDeleteTaskLaunch
} = createHttpAction('TPDeleteTaskLaunch', Interface.setting.TPDeleteTaskLaunch, {
  method: 'post'
});
// 删除维度
export const {
  TPDeleteDimension
} = createHttpAction('TPDeleteDimension', Interface.setting.TPDeleteDimension, {
  method: 'post'
});
// 更新包天优惠啥的
export const {
  TPUpdateTaskLaunchConfig
} = createHttpAction('TPUpdateTaskLaunchConfig', Interface.setting.TPUpdateTaskLaunchConfig, {
  method: 'post'
});
// 获取人员列表
export const {
  TPQueryUserInfo,
  TPQueryUserInfo_success
} = createHttpAction('TPQueryUserInfo', Interface.setting.TPQueryUserInfo, {
  method: 'post'
});
