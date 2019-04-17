const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/businessaccount/',
    { target: 'http://172.16.121.87:10080', changeOrigin:true }
  ));
  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin:true }
  ));
}
