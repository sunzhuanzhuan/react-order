import { combineReducers } from 'redux'
import {
  publicOrderList,
  orderDetail
} from './publicOrderListReducers'
import {
  agentList,
  agentDetail,
  existsAgentName
} from './modalReducers'

export default combineReducers({
  publicOrderList,
  agentList,
  agentDetail,
  orderDetail,
  existsAgentName
})

