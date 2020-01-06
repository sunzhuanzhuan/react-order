/**
 * Created by lzb on 2019-12-24.
 */
import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";


// 获取任务管理列表
export const {
  TPTaskManageList,
  TPTaskManageList_success
} = createHttpAction('TPTaskManageList', Interface.task.taskManageList, {
  method: 'post'
});

// 获取任务大厅行业列表
export const {
  TPGetIndustryCatalog
} = createHttpAction('TPGetIndustryCatalog', Interface.task.getIndustryCatalog);

// 获取任务位置列表
export const {
  TPGetTaskPosition,
  TPGetTaskPosition_success
} = createHttpAction('TPGetTaskPosition', Interface.task.getTaskLocationInfoB);

// 查询保留时长列表
export const {
  TPQueryRetainTimeList,
} = createHttpAction('TPQueryRetainTimeList', Interface.task.queryRetainTimeList);

// 新增任务
export const {
  TPAddTask
} = createHttpAction('TPAddTask', Interface.task.addTask, {
  method: 'post'
});

// 根据行业ID获取经营内容
export const {
  TPGetBusinessScopeList
} = createHttpAction('TPGetBusinessScopeList', Interface.task.getBusinessScopeList)

// 根据行业/经营内容获取资质组信息
export const {
  TPQueryQualificationsGroup
} = createHttpAction('TPQueryQualificationsGroup', Interface.task.queryQualificationsGroup);

// 该平台是否需要上传资质(目前仅微信)
export const {
  TPQueryTaskCheckQualifications
} = createHttpAction('TPQueryTaskCheckQualifications', Interface.task.queryTaskCheckQualifications);

// 12306价格计算
export const {
  TPTripPriceCalculation
} = createHttpAction('TPTripPriceCalculation', Interface.task.tripPriceCalculation, {
  method: 'post'
});

// 微信价格计算
export const {
  TPWeixinPriceCalculation
} = createHttpAction('TPWeixinPriceCalculation', Interface.task.weixinPriceCalculation);

// 任务详情
export const {
  TPTaskDetail,
  TPTaskDetail_success
} = createHttpAction('TPTaskDetail', Interface.task.taskDetail);
