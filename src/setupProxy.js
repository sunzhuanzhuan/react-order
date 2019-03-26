const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api/operator-gateway/trinityAgent/v1/insertAgent',
  {target:'http://47.93.10.229:17071',changeOrigin:true}
  ));
  app.use(proxy('/api/common-file/',
    { target: 'http://weiboyi-files-service-test.192.168.100.203.nip.io', changeOrigin:true }
  ));
  app.use(proxy('/api/toolbox-gateway/',
    { target: 'http://weiboyi-toolbox-gateway-test.192.168.100.203.nip.io', changeOrigin:true }
  ));
  app.use(proxy('/api/operator-gateway/',
    { target: 'http://weiboyi-operator-gateway-test.192.168.100.203.nip.io', changeOrigin:true }
  ));
  app.use(proxy('/api/finance/statement/',
  {target:'http://192.168.20.51:7300/mock/5c90c22a73f3100017a642b8',changeOrigin:true}
  ));
  
  app.use(proxy('/api',
    { target: 'http://nb.dev-weiboyi.com', changeOrigin:true }
  ));
  
}

