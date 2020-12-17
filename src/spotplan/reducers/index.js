import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
  getSpotplanCompanyInfo_success,
  getSpotplanExecutor_success,
  getSpotplanCreatorList_success,
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
  getSpotplanPriceIdInfo_success,
  getSpotplanPriceIdHistoryInfo_success
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

export const spotplanCreatorList = handleActions({
  [getSpotplanCreatorList_success]: (state, action) => {
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
    const data = action.payload.data;
    if (data.type) {
      return { ...state, [data.type]: data }
    } else {
      return { ...state, 'all': data }
    }
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
    return [...action.payload.data]
  }
}, [])

export const serviceRateAmount = (state = {}, action) => {
  switch (action.type) {
    case 'getServiceRateAmount_success':
      return { ...action.payload.data }
    case 'restServiceRateAmount_success':
      return {}
    default:
      return state
  }
}

export const priceIdInfo = handleActions({
  [getSpotplanPriceIdInfo_success]: (state, action) => {
    return {...action.payload.data}
  }
}, {})

export const priceIdHistoryInfo = handleActions({
  [getSpotplanPriceIdHistoryInfo_success]: (state, action) => {
    return [...action.payload.data]
  }
}, [])

export default combineReducers({
  spotplanCompanyInfo,
  spotplanExecutor,
  spotplanCreatorList,
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
  serviceRateAmount,
  priceIdInfo,
  priceIdHistoryInfo
})
