const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  // app.use(proxy('/api/finance',
  //   { target: 'http://192.168.100.117:30002', changeOrigin: true }
  // ));
  // app.use(proxy('/api/trinity',
  //   { target: 'http://192.168.100.117:30002', changeOrigin: true }
  // ));
  app.use(proxy('/api',
    { target: 'http://nb.dev-weiboyi.com', changeOrigin: true }
  ));

}

