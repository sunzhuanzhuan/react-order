const prefix = '/summaryData'
export default {
  salesManagers: prefix + '/getSalesManager',
  companyBrands: prefix + '/getCompanyBrand',
  companyProjects: prefix + '/getCompanyProject',
  companyPlatforms: prefix + '/getCompanyPlatforms',
  order: prefix + '/getOrder',
  addOrUpdateSummary: prefix + '/add',
  getSummaryOrderInfo: prefix + '/getSummaryOrderInfo',
  getPlatformDataInfo: prefix + '/getPlatformDataInfo',
}
