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
// 任务管理列表
export const {
  TPTaskManageList,
  TPTaskManageList_success
} = createHttpAction('TPTaskManageList', Interface.taskManageList, {
  method: 'post'
});
