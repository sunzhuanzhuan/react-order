const prefix = "/operator-gateway"
const accountMapping = prefix + '/accountMapping/v2'
const cooperationPlatform = prefix + '/cooperationPlatform/v2'
const mcnOrder = prefix + '/mcnOrder/v1'
const configManage = prefix + '/configManage/v1'
export default {
  getTaskIndustry: prefix + "/common/v1/getTaskIndustry",
  TPGetTaskPosition: prefix + "/adOrder/v1/getTaskLocationInfoB",
  offline: prefix + "/adOrder/v1/offline",
  taskManageList: prefix + "/adOrder/v1/list",
  fuzzyQueryCompany: prefix + "/company/v1/fuzzyQuery",
  queryAvailableBalance: prefix + "/finance/v1/queryAvailableBalance",
  queryActionNum: prefix + "/adOrder/v1/queryActionNum",
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
  clue: {
    TPPostOperationLog: prefix + "/configmanage/v1/queryOperationLog",
    TPPostClueList: prefix + "/adclue/v1/queryAdClueList",
    TPGetClueDetail: prefix + "/adclue/v1/queryAdClueInfo",
  },
  platform: {
    TPGetPlatformList: prefix + "/cooperationPlatform/v2/getPlatformList",
    TPSavePlatform: prefix + "/cooperationPlatform/v2/savePlatform",
    TPPlatformDetail: prefix + "/cooperationPlatform/v2/getPlatformDetail",
    TPPUpdatePlatform: prefix + "/cooperationPlatform/v2/updatePlatform",
  },
  setting: {
    TPReadUnitPriceConfig: prefix + "/cooperationPlatform/v2/suggestReadUnitPriceConfig",
    TPGetReadUnitPriceConfig: prefix + "/cooperationPlatform/v2/getSuggestReadUnitPriceConfig",
    TPGetQualityConfig: prefix + "/configManage/v1/getQualityConfig",
    TPAddRetainTime: prefix + "/configManage/v1/addRetainTime",
    TPChangeQualityConfig: prefix + "/configManage/v1/changeQualityConfig",
    TPQueryCommissionConfig: prefix + "/configManage/v1/queryCommissionConfig",
    TPUpdateCommissionConfig: prefix + "/configManage/v1/commissionConfig"
  },
  account: {
    TPGetAccountList: `${accountMapping}/getAccountList`,//账号管理
    TPUpdateAccountStateMsg: `${accountMapping}/updateAccountStateMsg`,//上下架
    TPGetAccountDetail: `${accountMapping}/getAccountDetail`,//账号详情
    TPBatchUpdateAccountState: `${accountMapping}/batchUpdateAccountState`,//批量通过/批量拒绝
    TPGetClaimAccountList: `${accountMapping}/claimAccountList`,//领取列表
    TPAuditAccount: `${accountMapping}/auditAccount`,//账号审核
    TPClaimAccount: `${accountMapping}/claimAccount`,//领取账号（单条领取/批量领取）
    TPGetAccountEstimateDetails: `${accountMapping}/accountEstimateDetails`,//内容评估查询
    TPAccountEstimateSubmit: `${accountMapping}/accountEstimateSubmit`,//内容评估提交
    TPUpdateAccountEstimateDescribe: `${accountMapping}/updateAccountEstimateDescribe`,//账号评语提交
    TPGetAccountTabNumber: `${accountMapping}/getAccountTabNumber`,//蜂窝派账号管理页签数量
  },
  order: {
    TPGetPlatformOrderList: `${cooperationPlatform}/platformOrderList`,//订单管理（合作平台）
    TPUpdatePlatformOrder: `${cooperationPlatform}/updatePlatformOrder`,//（同意(批量)、驳回（批量））
    TPUpdatePlatformFile: `${cooperationPlatform}/updatePlatformFile`,//（上传执行单、上传结案报告）
    TPGetPlatformOrderDetail: `${cooperationPlatform}/platformOrderDetail`,//合作平台订单详情
    TPGetAllMcnOrderList: `${mcnOrder}/getAllMcnOrder`,//蜂窝派订单列表（搜索）
    TPApprovedFirstFailure: `${mcnOrder}/approvedFirstFailure`,//一次质检不通过
    TPApprovedFirstSuccess: `${mcnOrder}/approvedFirstSuccess`,//一次质检通过
    TPApprovedSecondFailure: `${mcnOrder}/approvedSecondFailure`,//二次质检不通过
    TPApprovedSecondSuccess: `${mcnOrder}/approvedSecondSuccess`,//二次质检通过
    TPMcnOrderConfirmFinish: `${mcnOrder}/mcnOrderConfirmFinish`,//执行结果确认
    TPMcnOrderConfirmCancel: `${mcnOrder}/mcnOrderConfirmCancel`,//执行结果取消
    TPFristFailureUpdateContentUrl: `${mcnOrder}/fristFailureUpdateContentUrl`,//回执链接调整
    TPGetMcnOrderStateList: `${mcnOrder}/getMcnOrderStateList`,//获取订单状态列表
    TPUpdateContentUrl: `${mcnOrder}/updateContentUrl`,//回执链接调整_质检前修改
    TPApplyConfirm: `${mcnOrder}/applyConfirm`,//订单确认/拒绝
    TPFailureReasons: `${mcnOrder}/failureReasons`,//订单失败原因查询
    TPOrderInfo: `${mcnOrder}/orderInfo`,//订单详情
    TPQueryDataCurve: `${mcnOrder}/queryDataCurve`,//获取数据曲线
  },
  attribute: {
    queryQualificationByName: configManage + "/queryQualificationByName",
  },
  task: {
    getIndustryCatalog: configManage + "/getIndustryCatalog",
    taskManageList: prefix + "/adOrder/v1/list",
    queryRetainTimeList: configManage + "/queryRetainTimeList",
    getTaskLocationInfoB: prefix + "/adOrder/v1/getTaskLocationInfoB",
    addTask: prefix + "/adOrder/v1/add",
    tripPriceCalculation: prefix + "/adOrder/v1/trip/priceCalculation",
    weixinPriceCalculation: prefix + "/adOrder/v1/weixin/priceCalculation",
    getBusinessScopeList: configManage + "/getBusinessScopeList",
    queryQualificationsGroup: configManage + "/queryQualificationsGroup",
    queryTaskCheckQualifications: configManage + "/queryTaskCheckQualifications",
    taskDetail: prefix + "/adOrder/v1/detail_2",
  }
}

