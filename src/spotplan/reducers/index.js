import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
  getSpotplanCompanyInfo_success,
  getSpotplanExecutor_success,
  getSpotplanPlatform_success,
  getSpotplanProject_success,
  getSpotplanOrderList_success,
} from '../actions';

export const spotplanCompanyInfo = handleActions({
  [getSpotplanCompanyInfo_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export const spotplanExecutor = handleActions({
  [getSpotplanExecutor_success]: (state, action) => {
    return [...action.payload.data]
  }
}, [])

export const spotplanPlatform = handleActions({
  [getSpotplanPlatform_success]: (state, action) => {
    return [...action.payload.data]
  }
}, [])

export const spotplanProject = handleActions({
  [getSpotplanProject_success]: (state, action) => {
    return [...action.payload.data]
  }
}, [])

export const spotplanOrderList = handleActions({
  [getSpotplanOrderList_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export default combineReducers({
  spotplanCompanyInfo,
  spotplanExecutor,
  spotplanPlatform,
  spotplanProject,
  spotplanOrderList,
})
