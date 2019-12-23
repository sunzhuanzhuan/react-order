const baseUrl = 'operator-gateway/accountMapping/v2/'
export default {
  getAccountList: `${baseUrl}getAccountList`,//账号管理
  updateAccountStateMsg: `${baseUrl}updateAccountStateMsg`,//上下架
  getAccountDetail: `${baseUrl}getAccountDetail`,//账号详情
  batchUpdateAccountState: `${baseUrl}batchUpdateAccountState`,//批量通过/批量拒绝
  getClaimAccountList: `${baseUrl}claimAccountList`,//领取列表
  auditAccount: `${baseUrl}auditAccount`,//账号审核
  claimAccount: `${baseUrl}claimAccount`,//领取账号（单条领取/批量领取）
  getAccountEstimateDetails: `${baseUrl}accountEstimateDetails`,//内容评估查询
  accountEstimateSubmit: `${baseUrl}accountEstimateSubmit`,//内容评估提交
  updateAccountEstimateDescribe: `${baseUrl}updateAccountEstimateDescribe`,//账号评语提交
  getAccountTabNumber: `${baseUrl}getAccountTabNumber`,//蜂窝派账号管理页签数量
}
