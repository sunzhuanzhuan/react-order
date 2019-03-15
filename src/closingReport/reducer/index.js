import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';

import {
  getCompanyBrands_success,
  getCompanyProjects_success,
  getSalesManagers_success,
  getCompanyPlatforms_success,
  getOrders_success
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

// 公共的数据
const defaultPublicSource = {
  salesManagers: [],
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
export const publicSource = handleActions({
  [combineActions(getSalesManagers_success)]: (state, action) => {
    return update(state, {
      salesManagers: {
        $set: action.payload.data
      }
    });
  }
}, defaultPublicSource);

// 公司(结案单)纬度下的数据
const defaultCompanySource = {
  brandByCompany: [],
  projectByCompany: [],
  platformByCompany: [],
};
export const companySource = handleActions({
  [combineActions(getCompanyBrands_success)]: (state, action) => {
    return update(state, {
      brandByCompany: {
        $set: action.payload.data
      }
    });
  },
  [combineActions(getCompanyProjects_success)]: (state, action) => {
    return update(state, {
      projectByCompany: {
        $set: action.payload.data
      }
    });
  },
  [combineActions(getCompanyPlatforms_success)]: (state, action) => {
    return update(state, {
      platformByCompany: {
        $set: action.payload.data
      }
    });
  }
}, defaultCompanySource);

// 请求订单的数据
export const selectOrderList = handleActions({
  [combineActions(getOrders_success)]: handleResponseList('order_id')
}, initList());

export default combineReducers({
  publicSource,
  companySource,
  selectOrderList
});
