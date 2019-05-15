import api from '../../api/index'
import {
  GET_AGENT, GET_AGENT_DETAIL, RESET_AGENT, RESET_AGENT_DETAIL
} from '../contants/ActionTypes'
import Interface from '../contants/Interface'
import { createHttpAction } from '../../store/ajaxMiddleware'


export const getAgent = (params) => (dispatch) => {
  return api.get('/operator-gateway/trinityPlatform/v1/getAllCooperationPlatformAndAgent', { platformId: params.platformId }).then((response) => {
    dispatch({
      type: GET_AGENT,
      payload: {
        data: response.data.cooperationPlatformList,
        type: params.type
      }
    })
  })
}

export const resetAgent = () => (dispatch) => {
  dispatch({
    type: RESET_AGENT
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

export const resetAgentDetail = () => (dispatch) => {
  dispatch({
    type: RESET_AGENT_DETAIL
  })
}

export const {
  addAgent
} = createHttpAction('addAgent', Interface.addAgent, {
  method: 'post'
});

export const {
  labelPlaceOrder
} = createHttpAction('labelPlaceOrder', Interface.labelPlaceOrder, {
  method: 'post'
});

//撤销三方已下单
export const {
  withdrawLabelPlaceOrder
} = createHttpAction('withdrawLabelPlaceOrder', Interface.withdrawLabelPlaceOrder, {
  method: 'post'
});

// 修改三方已下单
export const {
  modifyLabelPlaceOrder
} = createHttpAction('modifyLabelPlaceOrder', Interface.modifyLabelPlaceOrder, {
  method: 'post'
});

//执行处理
export const {
  dealExecutionNotificationApply
} = createHttpAction('dealExecutionNotificationApply', Interface.dealExecutionNotificationApply, {
  method: 'post'
});

//申请预付款
export const {
  createPrepayApply
} = createHttpAction('createPrepayApply', Interface.createPrepayApply, {
  method: 'post'
});

//执行终止
export const {
  dealExecutionTermination
} = createHttpAction('dealExecutionTermination', Interface.dealExecutionTermination, {
  method: 'post'
});

//新增代理商失焦验证代理商名称是否重复
export const {
  existsAgentName,
  existsAgentName_success
} = createHttpAction('existsAgentName', Interface.existsAgentName, {
  method: 'get'
});








