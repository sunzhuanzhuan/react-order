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
