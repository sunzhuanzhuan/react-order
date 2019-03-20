const prefix = '/summaryData';
export default {
  salesManagers: prefix + '/getSalesManager',
  companyBrands: prefix + '/getCompanyBrand',
  companyProjects: prefix + '/getCompanyProject',
  companyPlatforms: prefix + '/getCompanyPlatforms',
  order: prefix + '/getOrder',
  addOrUpdateSummary: prefix + '/add',
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
};
