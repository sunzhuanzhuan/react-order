import Interface from '../constants/Interface';
import { createHttpAction } from 'redux-action-extend';
// import { createAction } from 'redux-actions';


//订单列表（导出订单前）
export const {
  getOrderList,
  getOrderList_success
} = createHttpAction('getOrderList', Interface.statement.orderList, {
  method: 'get'
});


//汇总单列表
export const {
  getSummaryList,
  getSummaryList_success
} = createHttpAction('getSummaryList', Interface.statement.listSummary, {
  method: 'get'
});
// // 使得添加页面提交可用
// export const setAddSubmit = createAction('setAddSubmit', (data) => {
//   return data;
// });

// // 入库页面提交
// export const {
//   saveAccountInfo
// } = createHttpAction('saveAccountInfo', Interface.saveAccountInfo, {
//   method: 'post',
//   ignoreToast: true
// });
