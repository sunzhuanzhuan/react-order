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


//汇总单列表(申请周期付款是一个接口)
export const {
  getTrinitySummaryList,
  getTrinitySummaryList_success
} = createHttpAction('getTrinitySummaryList', Interface.statement.listSummary, {
  method: 'get'
});
//释放汇总单
export const {
  releaseSummaryList,
  releaseSummaryList_success
} = createHttpAction('releaseSummaryList', Interface.statement.releaseSummary, {
  method: 'get'
});

//释放汇总单
export const {
  getDelummary,
  getDelSummary_success
} = createHttpAction('getDelummary', Interface.statement.delSummary, {
  method: 'post'
});
//汇总单详情detailSummary
export const {
  getDetaillummary,
  getDetaillummary_success
} = createHttpAction('getDetaillummary', Interface.statement.detailSummary, {
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
  method: 'post'
});

//申请周期付款，确认申请
export const {
  confirmApply,
  confirmApply_success
} = createHttpAction('confirmApply', Interface.statement.confirmApply, {
  method: 'post'
});

//导入token
export const {
  getToken,
  getToken_success
} = createHttpAction('getToken', Interface.getToken, {
  method: 'get'
});

//导入三方对账单
export const {
  addOrder,
  addOrder_success
} = createHttpAction('addOrder', Interface.statement.addOrder, {
  method: 'post'
});


//导入三方汇总单
export const {
  importSummary,
  importSummary_success
} = createHttpAction('importSummary', Interface.statement.importSummary, {
  method: 'post',
});

//导入订单模糊搜索

export const {
  searchName,
  searchName_success
} = createHttpAction('searchName', Interface.statement.searchName, {
  method: 'get',
});

//导出Excel订单
export const {
  exportOrder,
  exportOrder_success
} = createHttpAction('exportOrder', Interface.statement.exportOrder, {
  method: 'post',
});

//对账单inputlist
export const {
  getInputList,
  getInputList_success
} = createHttpAction('getInputList', Interface.statement.inputList, {
  method: 'get',
});
//获取代理商信息
export const {
  getAgentInfo,
  getAgentInfo_success
} = createHttpAction('getAgentInfo', Interface.agent.info, {
  method: 'get',
});
//清空redux
export const REMOVE_SUMMARY_LIST = 'REMOVE_SUMMARY_LIST'
export const removeSummaryList = () => ({
  type: REMOVE_SUMMARY_LIST,
})
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
