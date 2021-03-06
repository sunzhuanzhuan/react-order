import api from '../../api/index'
import {
  GET_PUBLIC_ORDER_LIST,
  GET_ORDER_DETAIL,
  RESET_ORDER_DETAIL,
  RESET_PUBLIC_ORDER_LIST,
  GET_INTERRUPT_EXECUTION
} from '../contants/ActionTypes'

export const getPublicOrderList = (params) => (dispatch) => {
  return api.get('/trinity/publicOrder/getList', { params }).then((response) => {
    dispatch({
      type: GET_PUBLIC_ORDER_LIST,
      payload: {
        data: response.data
      }
    })
  })
}

export const resetPublicOrderList = () => (dispatch) => {
  dispatch({
    type: RESET_PUBLIC_ORDER_LIST
  })
}

export const getOrderDetail = (params) => (dispatch) => {
  return api.get('/trinity/publicOrder/getOrderDetail', { params }).then((response) => {
    dispatch({
      type: GET_ORDER_DETAIL,
      payload: {
        data: response.data
      }
    })
  })
}
//执行终止处理弹框详情获取
export const getInterruptExecution = (params) => (dispatch) => {
  return api.get('/trinity/publicOrder/getInterruptExecution', { params }).then((response) => {
    dispatch({
      type: GET_INTERRUPT_EXECUTION,
      payload: {
        data: response.data
      }
    })
  })
}

export const resetOrderDetail = (params) => (dispatch) => {
  dispatch({
    type: RESET_ORDER_DETAIL
  })
}




