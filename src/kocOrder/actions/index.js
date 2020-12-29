import api from '../../api/index'
import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'

export const {
  getKocOrderInfo,
  getKocOrderInfo_success
} = createHttpAction('getKocOrderInfo', Interface.getKocOrderInfo, {
  method: 'get'
});
export const {
  postSearchList,
  postSearchList_success
} = createHttpAction('postSearchList', Interface.postSearchList, {
  method: 'post'
});
