const prefix = "/operator-gateway"
const accountUrl = prefix + '/accountMapping/v2'
const orderUrl = prefix + '/cooperationPlatform/v2'
const orderMcnUrl = prefix + '/mcnOrder/v1'
const configManage = prefix + '/configManage/v1'
export default {
  getTaskIndustry: prefix + "/common/v1/getTaskIndustry",
  TPGetTaskPosition: prefix + "/adOrder/v1/getTaskLocationInfoB",
  offline: prefix + "/adOrder/v1/offline",
  taskManageList: prefix + "/adOrder/v1/list",
  fuzzyQueryCompany: prefix + "/company/v1/fuzzyQuery",
  queryAvailableBalance: prefix + "/finance/v1/queryAvailableBalance",
  queryActionNum: prefix + "/adOrder/v1/queryActionNum",
  taskDetail: prefix + "/adOrder/v1/detail",
  mcnOrderList: prefix + "/adOrder/v1/mcnOrderList",
  getMcnReviewOrderList: prefix + "/mcnGrapLog/v1/getMcnReviewOrderList",
  approvedSuccess: prefix + "/mcnGrapLog/v1/approvedSuccess",
  approvedFailure: prefix + "/mcnGrapLog/v1/approvedFailure",
  queryMcnFinancePaymentPage: prefix + "/finance/v1/queryMcnFinancePaymentPage",
  payMcnFinancePayment: prefix + "/finance/v1/payMcnFinancePayment",

  TPGetExcuteStatusList: prefix + "/mcnOrder/v1/getMcnOrderConfrimStateList",
  TPGetOrderStatusLists: prefix + "/mcnOrder/v1/getMcnOrderStateList",
  TPGetAllMcnOrder: prefix + "/mcnOrder/v1/getAllMcnOrder",
  TPUpdateContentUrl: prefix + "/mcnOrder/v1/updateContentUrl",
  TPFristFailureUpdateContentUrl: prefix + "/mcnOrder/v1/fristFailureUpdateContentUrl",
  TPApprovedFristFailure: prefix + "/mcnOrder/v1/approvedFirstFailure",
  TPApprovedFirstSuccess: prefix + "/mcnOrder/v1/approvedFirstSuccess",
  TPApprovedSecondFailure: prefix + "/mcnOrder/v1/approvedSecondFailure",
  TPApprovedSecondSuccess: prefix + "/mcnOrder/v1/approvedSecondSuccess",
  TPMcnOrderConfirmFinish: prefix + "/mcnOrder/v1/mcnOrderConfirmFinish",
  TPMcnOrderConfirmCancel: prefix + "/mcnOrder/v1/mcnOrderConfirmCancel",
  TPPostOperationLog: prefix + "/configmanage/v1/queryOperationLog",
  TPPostClueList: prefix + "/adclue/v1/queryAdClueList",
  TPGetClueDetail: prefix + "/adclue/v1/queryAdClueInfo",

  account: {
    TPGetAccountList: `${accountUrl}/getAccountList`,//账号管理
    TPUpdateAccountStateMsg: `${accountUrl}/updateAccountStateMsg`,//上下架
    TPGetAccountDetail: `${accountUrl}/getAccountDetail`,//账号详情
    TPBatchUpdateAccountState: `${accountUrl}/batchUpdateAccountState`,//批量通过/批量拒绝
    TPGetClaimAccountList: `${accountUrl}/claimAccountList`,//领取列表
    TPAuditAccount: `${accountUrl}/auditAccount`,//账号审核
    TPClaimAccount: `${accountUrl}/claimAccount`,//领取账号（单条领取/批量领取）
    TPGetAccountEstimateDetails: `${accountUrl}/accountEstimateDetails`,//内容评估查询
    TPAccountEstimateSubmit: `${accountUrl}/accountEstimateSubmit`,//内容评估提交
    TPUpdateAccountEstimateDescribe: `${accountUrl}/updateAccountEstimateDescribe`,//账号评语提交
    TPGetAccountTabNumber: `${accountUrl}/getAccountTabNumber`,//蜂窝派账号管理页签数量
  },
  order: {
    TPGetPlatformOrderList: `${orderUrl}/platformOrderList`,//订单管理（合作平台）
    TPUpdatePlatformOrder: `${orderUrl}/updatePlatformOrder`,//（同意(批量)、驳回（批量））
    TPUpdatePlatformFile: `${orderUrl}/updatePlatformFile`,//（上传执行单、上传结案报告）
    TPGetPlatformOrderDetail: `${orderUrl}/platformOrderDetail`,//合作平台订单详情
    TPGetAllMcnOrderList: `${orderMcnUrl}/getAllMcnOrder_2`,//蜂窝派订单列表（搜索）
    TPApprovedFirstFailure: `${orderMcnUrl}/approvedFirstFailure`,//一次质检不通过
    TPApprovedFirstSuccess: `${orderMcnUrl}/approvedFirstSuccess`,//一次质检通过
    TPApprovedSecondFailure: `${orderMcnUrl}/approvedSecondFailure`,//二次质检不通过
    TPApprovedSecondSuccess: `${orderMcnUrl}/approvedSecondSuccess`,//二次质检通过
    TPMcnOrderConfirmFinish: `${orderMcnUrl}/mcnOrderConfirmFinish`,//执行结果确认
    TPMcnOrderConfirmCancel: `${orderMcnUrl}/mcnOrderConfirmCancel`,//执行结果取消
    TPFristFailureUpdateContentUrl: `${orderMcnUrl}/fristFailureUpdateContentUrl`,//回执链接调整
    TPGetMcnOrderStateList: `${orderMcnUrl}/getMcnOrderStateList`,//获取订单状态列表
    TPUpdateContentUrl: `${orderMcnUrl}/updateContentUrl`,//回执链接调整_质检前修改
    TPApplyConfirm: `${orderMcnUrl}/applyConfirm`,//订单确认/拒绝
    TPFailureReasons: `${orderMcnUrl}/failureReasons`,//订单失败原因查询
    TPOrderInfo: `${orderMcnUrl}/orderInfo`,//订单详情
    TPQueryDataCurve: `${orderMcnUrl}/queryDataCurve`,//获取数据曲线
  },
  attribute: {
    queryQualificationByName: configManage + "/queryQualificationByName",
  },
  task: {
    getIndustryCatalog: configManage + "/getIndustryCatalog",
    taskManageList: prefix + "/adOrder/v1/list",
    queryRetainTimeList: configManage + "/queryRetainTimeList",
    getTaskLocationInfoB: prefix + "/adOrder/v1/getTaskLocationInfoB",
    addTask: prefix + "/adOrder/v1/add_2",
  }
}

