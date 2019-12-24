const prefix = "/operator-gateway"
const accountUrl = 'operator-gateway/accountMapping/v2/'
const orderUrl = '/operator-gateway/cooperationPlatform/v2/'
export default {
  getTaskIndustry: prefix + "/common/v1/getTaskIndustry",
  addTask: prefix + "/adOrder/v1/add",
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
  account: {
    getAccountList: `${accountUrl}getAccountList`,//账号管理
    updateAccountStateMsg: `${accountUrl}updateAccountStateMsg`,//上下架
    getAccountDetail: `${accountUrl}getAccountDetail`,//账号详情
    batchUpdateAccountState: `${accountUrl}batchUpdateAccountState`,//批量通过/批量拒绝
    getClaimAccountList: `${accountUrl}claimAccountList`,//领取列表
    auditAccount: `${accountUrl}auditAccount`,//账号审核
    claimAccount: `${accountUrl}claimAccount`,//领取账号（单条领取/批量领取）
    getAccountEstimateDetails: `${accountUrl}accountEstimateDetails`,//内容评估查询
    accountEstimateSubmit: `${accountUrl}accountEstimateSubmit`,//内容评估提交
    updateAccountEstimateDescribe: `${accountUrl}updateAccountEstimateDescribe`,//账号评语提交
    getAccountTabNumber: `${accountUrl}getAccountTabNumber`,//蜂窝派账号管理页签数量
  },
  order: {
    getPlatformOrderList: `${orderUrl}platformOrderList`
  },
  attribute: {
    queryQualificationByName: prefix + "/configManage/v1/queryQualificationByName",
  }

}

