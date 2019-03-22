import {
  GET_AGENT,
  GET_AGENT_DETAIL
} from '../contants/ActionTypes'

export const agentList = (state = [], action) => {
  switch (action.type) {
    case GET_AGENT:
      return [...action.payload.data]
    default:
      return state
  }
}

export const agentDetail = (state = {}, action) => {
  switch (action.type) {
    case GET_AGENT_DETAIL:
      return { ...action.payload.data }
    default:
      return state
  }
}
