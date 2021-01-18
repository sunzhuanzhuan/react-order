const prefix = '/summaryData'
export default {
  salesManagers: prefix + '/getSalesManager',
  getExecutor: prefix + '/getExecutor',
  companyBrands: prefix + '/getCompanyBrand',
  companyProjects: prefix + '/getCompanyProject',
  companyPlatforms: prefix + '/getCompanyPlatforms',
  order: prefix + '/getOrder',
  orderKoc: '/koc/getKocOrderListForSummary',
  addOrUpdateSummary: prefix + '/addSummaryData',
  getSummaryOrderInfo: prefix + '/getSummaryOrderInfo',
  getPlatformDataInfo: prefix + '/getPlatformDataInfo',
  updatePlatformInfo: prefix + '/updatePlatformInfo',
  checkPlatformData: prefix + '/checkPlatformData',
  addSummaryPlatform: prefix + '/addSummaryPlatform',
  deleteSummaryOrder: prefix + '/deleteSummaryOrder',
  deleteSummaryPlatform: prefix + '/deleteSummaryPlatform',
  getCompanyNames: prefix + '/getCompanyName',
  getBrands: prefix + '/getBrand',
  getProjects: prefix + '/getProject',
  getSummaryListByOrder: prefix + '/getSummaryOrderList',
  getSummaryList: prefix + '/getSummaryList',
  getOrderIsFinish: prefix + '/getOrderIsFinish',
  getCompanyTotalInfo: prefix + '/getCompanyTotalInfo',
  getSummaryTotalInfo: prefix + '/getSummaryTotalInfo',
  submitCheckSummaryByOrder: prefix + '/checkOrder',
  submitCheckSummary: prefix + '/checkSummaryOrder',
  exportPlatformDataInfoExcel: prefix + '/exportPlatformDataInfoExcel',
  uploadExcle: '/api/summaryData/exportKocSummaryDataBySummaryId'
}
