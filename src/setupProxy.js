const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/businessaccount/',
    { target: 'http://192.168.20.51:7300/mock/5c9ada4673f3100017a6432b/api/agent', changeOrigin:true }
  ));
  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin:true }
  ));
}
