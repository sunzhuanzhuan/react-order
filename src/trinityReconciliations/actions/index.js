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
//释放汇总单
export const {
  releaseSummaryList,
  releaseSummaryList_success
} = createHttpAction('releaseSummaryList', Interface.statement.releaseSummary, {
  method: 'get'
});

//汇总单详情detailSummary
export const {
  getDetailSummary,
  getDetailSummary_success
} = createHttpAction('getDetailSummary', Interface.statement.detailSummary, {
  method: 'get'
});

//汇总单详情detailSummary列表
export const {
  getDetailSummaryList,
  getDetailSummaryList_success
} = createHttpAction('getDetailSummaryList', Interface.statement.detailSummaryList, {
  method: 'get'
});

//对账单列表
export const {
  getListStatement,
  getListStatement_success
} = createHttpAction('getListStatement', Interface.statement.listStatement, {
  method: 'get'
});

//删除对账单
export const {
  deleteStatement,
  deleteStatement_success
} = createHttpAction('deleteStatement', Interface.statement.deleteStatement, {
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
