import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';

// 新增任务
export const {
  TPAddTask
} = createHttpAction('TPAddTask', Interface.addTask, {
  method: 'post'
});
// 下线任务
export const {
  TPOffline
} = createHttpAction('TPOffline', Interface.offline, {
  method: 'post'
});
// 根据公司名称模糊查询公司列表
export const {
  TPFuzzyQueryCompany
} = createHttpAction('TPFuzzyQueryCompany', Interface.fuzzyQueryCompany, {
  method: 'post'
});
// 查询任务大厅余额
export const {
  TPQueryAvailableBalance
} = createHttpAction('TPQueryAvailableBalance', Interface.queryAvailableBalance);

// 查询预估阅读数/转发数
export const {
  TPQueryActionNum
} = createHttpAction('TPQueryActionNum', Interface.queryActionNum, {
  method: 'post'
});
// 任务管理列表
export const {
  TPTaskManageList,
  TPTaskManageList_success
} = createHttpAction('TPTaskManageList', Interface.taskManageList, {
  method: 'post'
});
