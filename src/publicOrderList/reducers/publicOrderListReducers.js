import {
  GET_PUBLIC_ORDER_LIST,
  GET_ORDER_DETAIL,
  RESET_ORDER_DETAIL
} from '../contants/ActionTypes'

export const publicOrderList = (state = {}, action) => {
  switch (action.type) {
    case GET_PUBLIC_ORDER_LIST:
      return { ...action.payload.data }
    default:
      return state
  }
}

export const orderDetail = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_DETAIL:
      return { ...action.payload.data }
    case RESET_ORDER_DETAIL:
      return {}
    default:
      return state
  }
}
