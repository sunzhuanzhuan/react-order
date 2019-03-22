import api from '../../api/index'
import {
  GET_AGENT, GET_AGENT_DETAIL
} from '../contants/ActionTypes'

export const getAgent = (params) => (dispatch) => {
  return api.get('/operator-gateway/trinityPlatform/v1/getAllCooperationPlatformAndAgent', { params }).then((response) => {
    dispatch({
      type: GET_AGENT,
      payload: {
        data: response.data.cooperationPlatformList
      }
    })
  })
}

export const getAgentDetail = (params) => (dispatch) => {
  return api.get('/operator-gateway/trinityAgent/v1/getAgentById', { params }).then((response) => {
    dispatch({
      type: GET_AGENT_DETAIL,
      payload: {
        data: response.data
      }
    })
  })
}




