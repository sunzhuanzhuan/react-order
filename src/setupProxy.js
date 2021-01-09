/*
 * @Descripttion:
 * @Author: wangxinyue
 * @Date: 2020-02-24 13:24:22
 */
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  // app.use(proxy('/api/koc/getKocOrderListForSummary',
  //   { target: 'http://yapi.ops.tst-weiboyi.com/project/257/', changeOrigin: true }
  // ));
  app.use(proxy('/api',
    { target: process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS, changeOrigin: true }
  ));
}
