const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  // http://easymock.wby.me:7300/mock/5c874e0b73f3100017a641c1/api/summaryData
  app.use(proxy('/api',
    { target: 'http://nb.dev-weiboyi.com', changeOrigin: true }
  ));
}
