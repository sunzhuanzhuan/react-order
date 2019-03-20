import {
  GET_PUBLIC_ORDER_LIST
} from '../contants/ActionTypes'

export const publicOrderList = (state = {}, action) => {
  switch (action.type) {
    case GET_PUBLIC_ORDER_LIST:
      return { ...action.payload.data }
    default:
      return state
  }
}
