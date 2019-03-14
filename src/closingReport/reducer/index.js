import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';

import {
  getCompanyBrand_success,
  getCompanyProject_success,
  getSalesManager_success,
  getOrder_success
} from '../actions';

// 处理列表数据为map表
function handleResponseList(primary_key) {
  return (state, action) => {
    let response = action.payload.data || {}, source = {};
    const { total = 0, page = 1, pageSize = 50, rows = [] } = response;
    const list = rows.map(item => {
      source[item[primary_key]] = { ...item };
      source[item[primary_key]]['key'] = item[primary_key];
      return item[primary_key];
    });
    return {
      total, page, pageSize, list, source: { ...state.source, ...source }, response
    };
  };
}

// 初始化列表数据
function initList() {
  return { list: [], source: {}, total: 0, page: 1, pageSize: 50, response: {} };
}


const defaultFilterSource = {
  brandByCompany: [],
  projectByCompany: [],
  salesManager: [],
  executionStatus: [
    { 'label': '执行中', 'value': '21' },
    { 'label': '已执行', 'value': '22' },
    { 'label': '待执行', 'value': '23' },
    { 'label': '执行取消', 'value': '24' },
    { 'label': '执行终止', 'value': '25' },
    { 'label': '待质检', 'value': '26' },
    { 'label': '质检中', 'value': '27' },
    { 'label': '质检完成', 'value': '28' },
    { 'label': '执行终止申请', 'value': '31' },
    { 'label': '已完成', 'value': '32' },
    { 'label': '赔偿申请中', 'value': '33' },
    { 'label': '赔偿通过', 'value': '34' },
    { 'label': '已结案', 'value': '35' }
  ]
};
export const filterSource = handleActions({
  [combineActions(getCompanyBrand_success)]: (state, action) => {
    return update(state, {
      brandByCompany: {
        $set: action.payload.data
      }
    });
  },
  [combineActions(getCompanyProject_success)]: (state, action) => {
    return update(state, {
      projectByCompany: {
        $set: action.payload.data
      }
    });
  },
  [combineActions(getSalesManager_success)]: (state, action) => {
    return update(state, {
      salesManager: {
        $set: action.payload.data
      }
    });
  }
}, defaultFilterSource);

export const selectOrderList = handleActions({
  [combineActions(getOrder_success)]: handleResponseList('order_id')
}, initList());

export default combineReducers({
  filterSource,
  selectOrderList
});
