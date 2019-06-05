const proxy = require('http-proxy-middleware');
module.exports = function (app) {
 /* app.use(proxy('/api/finance/payment/paymentTypeList',
    { target: ' http://192.168.20.51:7300/mock/5c7fa2bd73f3100017a6412e', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/trinityPlatform/v1/getPlatform',
    { target: 'http://47.93.10.229:17071', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/trinityPlatform/',
    { target: 'http://47.93.10.229:17071', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/trinityAgent/',
    { target: 'http://nb.dev-weiboyi.com', changeOrigin: true }
  ));*/
  /*app.use(proxy('/api/summaryData/',
    { target: 'http://192.168.100.117:30017', changeOrigin:true }
  ));*/
  //
  //http://easymock.wby.me:7300/mock/5c874e0b73f3100017a641c1/api/summaryData
  app.use(proxy('/api',
    { target: 'http://nb.dev-weiboyi.com', changeOrigin: true }
  ));
}
