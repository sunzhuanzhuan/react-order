import api from '../../api/index'
import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
  getSpotplanCompanyInfo,
  getSpotplanCompanyInfo_success
} = createHttpAction('getSpotplanCompanyInfo', Interface.getSpotplanCompanyInfo, {
  method: 'get'
});

export const {
  postAddSpotplan,
  postAddSpotplan_success
} = createHttpAction('postAddSpotplan', Interface.postAddSpotplan, {
  method: 'post'
});
export const {
  postUpdateSpotplan,
  postUpdateSpotplan_success
} = createHttpAction('postUpdateSpotplan', Interface.postUpdateSpotplan, {
  method: 'post'
});
export const {
  getSpotplanExecutor,
  getSpotplanExecutor_success
} = createHttpAction('getSpotplanExecutor', Interface.getSpotplanExecutor, {
  method: 'get'
});

export const {
  getSpotplanCreatorList,
  getSpotplanCreatorList_success
} = createHttpAction('getSpotplanCreatorList', Interface.getSpotplanCreatorList, {
  method: 'get'
});

export const {
  getSpotplanPlatform,
  getSpotplanPlatform_success
} = createHttpAction('getSpotplanPlatform', Interface.getSpotplanPlatform, {
  method: 'get'
});

export const {
  getSpotplanProject,
  getSpotplanProject_success
} = createHttpAction('getSpotplanProject', Interface.getSpotplanProject, {
  method: 'get'
});

export const {
  getSpotplanOrderList,
  getSpotplanOrderList_success
} = createHttpAction('getSpotplanOrderList', Interface.getSpotplanOrderList, {
  method: 'get',
  ignoreToast: true,
});
// 勾选订单获取koc的订单列表
export const {
  getSpotplanKocOrderList,
  getSpotplanKocOrderList_success
} = createHttpAction('getSpotplanKocOrderList', Interface.getSpotplanKocOrderList, {
  method: 'get',
  ignoreToast: true,
});
export const {
  postAddSpotplanOrder,
  postAddSpotplanOrder_success
} = createHttpAction('postAddSpotplanOrder', Interface.postAddSpotplanOrder, {
  method: 'post'
});

export const {
  getSpotplanEditOrder,
  getSpotplanEditOrder_success
} = createHttpAction('getSpotplanEditOrder', Interface.getSpotplanEditOrder, {
  method: 'get',
  ignoreToast: true,
});

export const {
  postUpdateSpotplanOrder,
  postUpdateSpotplanOrder_success
} = createHttpAction('postUpdateSpotplanOrder', Interface.postUpdateSpotplanOrder, {
  method: 'post'
});

export const {
  getSpotplanBrand,
  getSpotplanBrand_success
} = createHttpAction('getSpotplanBrand', Interface.getSpotplanBrand, {
  method: 'get'
});

export const {
  getSpotplanList,
  getSpotplanList_success
} = createHttpAction('getSpotplanList', Interface.getSpotplanList, {
  method: 'get',
  ignoreToast: true,
});

export const {
  getSpotplanPoInfo,
  getSpotplanPoInfo_success
} = createHttpAction('getSpotplanPoInfo', Interface.getSpotplanPoInfo, {
  method: 'get',
});

export const {
  getSpotplanAmount,
  getSpotplanAmount_success
} = createHttpAction('getSpotplanAmount', Interface.getSpotplanAmount, {
  method: 'get',
});

export const {
  getBasicSpotplanOrderInfo,
  getBasicSpotplanOrderInfo_success
} = createHttpAction('getBasicSpotplanOrderInfo', Interface.getBasicSpotplanOrderInfo, {
  method: 'get',
});

export const {
  getUpdateSpotplanOrder,
  getUpdateSpotplanOrder_success
} = createHttpAction('getUpdateSpotplanOrder', Interface.getUpdateSpotplanOrder, {
  method: 'get',
});

export const {
  getUpdateSpotplanOrderLog,
  getUpdateSpotplanOrderLog_success
} = createHttpAction('getUpdateSpotplanOrderLog', Interface.getUpdateSpotplanOrderLog, {
  method: 'get',
});

export const {
  postChangeNumberSpotplanOrder,
  postChangeNumberSpotplanOrder_success
} = createHttpAction('postChangeNumberSpotplanOrder', Interface.postChangeNumberSpotplanOrder, {
  method: 'post',
});
export const {
  postUpdatePublishArticlesAt,
  postUpdatePublishArticlesAt_success
} = createHttpAction('postUpdatePublishArticlesAt', Interface.postUpdatePublishArticlesAt, {
  method: 'post',
});
export const {
  getExportSpotplamExcel,
  getExportSpotplamExcel_success
} = createHttpAction('getExportSpotplamExcel', Interface.getExportSpotplamExcel, {
  method: 'get',
});

export const {
  postDeleteSpotplanOrder,
  postDeleteSpotplanOrder_success
} = createHttpAction('postDeleteSpotplanOrder', Interface.postDeleteSpotplanOrder, {
  method: 'post',
});

export const getServiceRateAmount = (params) => (dispatch) => {
  return api.get(Interface.getServiceRateAmount, { params }).then((response) => {
    dispatch({
      type: 'getServiceRateAmount_success',
      payload: {
        data: response.data
      }
    })
  })
}

export const restServiceRateAmount = (params) => (dispatch) => {
  dispatch({
    type: 'restServiceRateAmount_success',
  })
}

export const {
  getSpotplanPriceIdInfo,
  getSpotplanPriceIdInfo_success
} = createHttpAction('getSpotplanPriceIdInfo', Interface.getSpotplanPriceIdInfo, {
  method: 'get'
});

export const {
  getSpotplanPriceIdHistoryInfo,
  getSpotplanPriceIdHistoryInfo_success
} = createHttpAction('getSpotplanPriceIdHistoryInfo', Interface.getSpotplanPriceIdHistoryInfo, {
  method: 'get'
});

export const {
  editSpotplanPriceId,
  editSpotplanPriceId_success
} = createHttpAction('editSpotplanPriceId', Interface.editSpotplanPriceId, {
  method: 'post'
});

