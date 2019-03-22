import { combineReducers } from 'redux'
import {
  publicOrderList
} from './publicOrderListReducers'
import {
  agentList,
  agentDetail
} from './modalReducers'

export default combineReducers({
  publicOrderList,
  agentList,
  agentDetail
})

