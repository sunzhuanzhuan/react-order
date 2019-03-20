import api from '../../api/index'
import {
  GET_PUBLIC_ORDER_LIST
} from '../contants/ActionTypes'

export const getPublicOrderList = (params) => (dispatch) => {
  return api.get('/order/getPublicOrderList', { params }).then((response) => {
    dispatch({
      type: GET_PUBLIC_ORDER_LIST,
      payload: {
        data: response.data
      }
    })
  })
}

