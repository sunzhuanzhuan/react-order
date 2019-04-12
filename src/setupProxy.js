const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/spotplan/',
    { target: 'http://192.168.20.51:7300/mock/5caea28073f3100017a64392', changeOrigin: true }
  ));
  app.use(proxy('/api/common-file/',
    { target: 'http://weiboyi-files-service-test.192.168.100.203.nip.io', changeOrigin: true }
  ));
  app.use(proxy('/api/toolbox-gateway/',
    { target: 'http://weiboyi-toolbox-gateway-test.192.168.100.203.nip.io', changeOrigin: true }
  ));
  app.use(proxy('/api/operator-gateway/',
    { target: 'http://weiboyi-operator-gateway-test.192.168.100.203.nip.io', changeOrigin: true }
  ));
  /*app.use(proxy('/api/summaryData/',
    { target: 'http://192.168.100.117:30017', changeOrigin:true }
  ));*/
  //
  //http://easymock.wby.me:7300/mock/5c874e0b73f3100017a641c1/api/summaryData
  app.use(proxy('/api',
    { target: 'http://nb.tst-weiboyi.com', changeOrigin: true }
  ));
}
