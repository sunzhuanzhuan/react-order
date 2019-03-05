import Interface from '../constants/Interface';
import { createHttpAction } from 'redux-action-extend';
import { createAction } from 'redux-actions';


// 获取主账号发票信息
export const {
  getUserInvoiceInfo,
  getUserInvoiceInfo_success
} = createHttpAction('getUserInvoiceInfo', Interface.getUserInvoiceInfo, {
  method: 'get'
});

// 编辑账号时，获取报价信息
export const {
  getSkuList,
  getSkuList_success
} = createHttpAction('getSkuList', Interface.getSkuList, {
  method: 'get'
});

// 获取报价项信息
export const {
  getSkuTypeList,
  getSkuTypeList_success
} = createHttpAction('getSkuTypeList', Interface.getSkuTypeList, {
  method: 'get'
});

// 使得添加页面提交可用
export const setAddSubmit = createAction('setAddSubmit', (data) => {
  return data;
});

// 入库页面提交
export const {
  saveAccountInfo
} = createHttpAction('saveAccountInfo', Interface.saveAccountInfo, {
  method: 'post',
  ignoreToast: true
});
