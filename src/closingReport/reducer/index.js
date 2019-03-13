import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';

import {
  getCompanyBrand_success,
  getCompanyProject_success,
  getSalesManager_success,
  getOrder_success
} from '../actions';

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
}, {
  brandByCompany: [],
  projectByCompany: [],
  salesManager: []
});

export default combineReducers({
  filterSource
});
