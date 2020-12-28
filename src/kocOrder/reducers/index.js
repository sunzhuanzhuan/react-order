import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
  getKocOrderInfo_success,
} from '../actions';

export const spotplanCompanyInfo = handleActions({
  [getKocOrderInfo_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})
