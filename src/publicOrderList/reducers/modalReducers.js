import { handleActions } from 'redux-actions';
import {
  GET_AGENT,
  GET_AGENT_DETAIL,
  RESET_AGENT,
  RESET_AGENT_DETAIL
} from '../contants/ActionTypes'

import {
  existsAgentName_success
} from '../actions/modalActions'


export const agentList = (state = [], action) => {
  switch (action.type) {
    case GET_AGENT:
      return [...action.payload.data]
    case RESET_AGENT:
      return []
    default:
      return state
  }
}

export const agentDetail = (state = {}, action) => {
  switch (action.type) {
    case GET_AGENT_DETAIL:
      return { ...action.payload.data }
    case RESET_AGENT_DETAIL:
      return {}
    default:
      return state
  }
}

export const existsAgentName = handleActions({
  [existsAgentName_success]: (state, action) => ({
    ...state,
    ...action.payload
  })
}, {})

