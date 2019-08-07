const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  // app.use(proxy('/api/spotplan/',
  //   { target: 'http://192.168.100.117:30017', changeOrigin: true }
  // ));
  // http://easymock.wby.me:7300/mock/5c874e0b73f3100017a641c1/api/summaryData
  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin: true }
  ));

}

