const prefix = "/operator-gateway"
export default {
  addTask: prefix + "/adOrder/v1/add",
  offline: prefix + "/adOrder/v1/offline",
  taskManageList: prefix + "/adOrder/v1/list",
  fuzzyQueryCompany: prefix + "/company/v1/fuzzyQuery",
  queryAvailableBalance: prefix + "/finance/v1/queryAvailableBalance",
  queryActionNum: prefix + "/adOrder/v1/queryActionNum",
}
