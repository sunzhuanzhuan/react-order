const prefix = "/operator-gateway"
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

  TPGetAllMcnOrder: prefix + "/mcnOrder/v1/getAllMcnOrder",
  TPFristFailureUpdateContentUrl: prefix + "/mcnOrder/v1/fristFailureUpdateContentUrl",
  TPApprovedFristFailure: prefix + "/mcnOrder/v1/approvedFristFailure",
  TPApprovedFirstSuccess: prefix + "/mcnOrder/v1/approvedFirstSuccess",
  TPApprovedSecondFailure: prefix + "/mcnOrder/v1/approvedSecondFailure",
  TPApprovedSecondSuccess: prefix + "/mcnOrder/v1/approvedSecondSuccess",
  TPMcnOrderConfirmFinish: prefix + "/mcnOrder/v1/mcnOrderConfirmFinish",
  TPMcnOrderConfirmCancel: prefix + "/mcnOrder/v1/mcnOrderConfirmCancel",

}
