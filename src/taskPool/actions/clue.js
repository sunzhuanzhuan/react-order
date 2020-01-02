import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";
// 获取操作日志
export const {
  TPPostOperationLog
} = createHttpAction('TPPostOperationLog', Interface.TPPostOperationLog, {
  method: 'post'
});
//线索列表
export const {
  TPPostClueList
} = createHttpAction('TPPostClueList', Interface.TPPostClueList, {
  method: 'post'
});
//线索详情
export const {
  TPGetClueDetail,
  TPGetClueDetail_success
} = createHttpAction('TPGetClueDetail', Interface.TPGetClueDetail, {
  method: 'get'
});
