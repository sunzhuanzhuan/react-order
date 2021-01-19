/*
 * @Descripttion:
 * @Author: wangxinyue
 * @Date: 2020-02-24 13:24:22
 */
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/summaryData/exportKocSummaryDataBySummaryId',
    { target: 'http://192.168.100.118:30004/', changeOrigin: true }
  ));
  app.use(proxy('/api',
    { target: process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS, changeOrigin: true }
  ));
}
