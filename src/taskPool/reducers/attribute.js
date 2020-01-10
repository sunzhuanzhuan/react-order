import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import { reducersResponseList } from '../constants/utils';

import {
  TPGetIndustryList_success,
  TPQueryQualificationList_success
} from '../actions';

// 行业列表
export const taskIndustryList = handleActions({
  [TPGetIndustryList_success]: reducersResponseList('id')
}, reducersResponseList.initList())

// 行业列表
export const qualificationList = handleActions({
  [TPQueryQualificationList_success]: reducersResponseList('id')
}, reducersResponseList.initList())
