import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';


import {
  getSkuList_success,
  getSkuTypeList_success,
  getUserInvoiceInfo_success
} from '../actions';


export const priceInfo = handleActions({
  [combineActions(getSkuList_success)]: (state, action) => {
    return {
      ...state,
      ...action.payload.data
    };
  },
  [combineActions(getUserInvoiceInfo_success)]: (state, action) => {
    let [item = {}] = action.payload.data || [];
    return {
      ...state,
      ...item
    };
  }
}, {});

export const priceTypeList = handleActions({
  [combineActions(getSkuTypeList_success)]: (state, action) => {
    return [
      ...state,
      ...action.payload.data
    ];
  }
}, []);

export default combineReducers({
  priceInfo,
  priceTypeList
});
