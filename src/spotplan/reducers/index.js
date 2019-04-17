import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
  getSpotplanCompanyInfo_success,
  getSpotplanExecutor_success,
  getSpotplanPlatform_success,
  getSpotplanProject_success,
  getSpotplanOrderList_success,
  getSpotplanEditOrder_success,
  getSpotplanBrand_success,
  getSpotplanList_success,
  getSpotplanPoInfo_success,
  getSpotplanAmount_success,
  getBasicSpotplanOrderInfo_success,
  getUpdateSpotplanOrder_success,
  getUpdateSpotplanOrderLog_success,
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

export const spotplanEditList = handleActions({
  [getSpotplanEditOrder_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export const spotplanBrand = handleActions({
  [getSpotplanBrand_success]: (state, action) => {
    return [...action.payload.data]
  }
}, [])

export const spotplanList = handleActions({
  [getSpotplanList_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export const spotplanPoInfo = handleActions({
  [getSpotplanPoInfo_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export const spotplanAmount = handleActions({
  [getSpotplanAmount_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export const basicSpotplanOrderInfo = handleActions({
  [getBasicSpotplanOrderInfo_success]: (state, action) => {
    return [...action.payload.data]
  }
}, [])

export const updateSpotplanOrder = handleActions({
  [getUpdateSpotplanOrder_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export const updateSpotplanOrderLog = handleActions({
  [getUpdateSpotplanOrderLog_success]: (state, action) => {
    return { ...action.payload.data }
  }
}, {})

export default combineReducers({
  spotplanCompanyInfo,
  spotplanExecutor,
  spotplanPlatform,
  spotplanProject,
  spotplanOrderList,
  spotplanEditList,
  spotplanBrand,
  spotplanList,
  spotplanPoInfo,
  spotplanAmount,
  basicSpotplanOrderInfo,
  updateSpotplanOrder,
  updateSpotplanOrderLog,
})
