import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './store';
import 'babel-polyfill';
import { LocaleProvider } from 'antd';
import './index.less';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { linkTo } from '@/util/linkTo';
// 导入语言包
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import 'numeral/locales/chs';
// 顶级根目录页面
import App from './containers/App';
import Reconciliations from './trinityReconciliations';
import PublicOrderList from './publicOrderList/containers/PublicOrderList';
import ClosingReport from './closingReport';
import SpotPlan from './spotplan';
import Business from './business';
import Task from './taskPool';

// 设置语言包
numeral.locale('chs');
moment.locale('zh-cn');
// 处理跳转到其他项目的路由
const redirectToOtherProjects = ({ location: { pathname = '/error', search = '' } }) => {
  /** 新B端测试环境地址 @namespace process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS **/
  linkTo(pathname + search)
  return null;
};
// 项目内路由
const routes = () => (
  <App history={history}>
    <Switch>
      <Route path="/order/trinity/reconciliations" component={Reconciliations} />
      <Route path="/order/publicOrderList" component={PublicOrderList} />
      <Route path="/order/closing-report" component={ClosingReport} />
      <Route path="/order/business" component={Business} />
      <Route path="/order/spotplan" component={SpotPlan} />
      <Route path="/order/task" component={Task} />
      <Route render={() => linkTo('/error')} />
    </Switch>
  </App>
);

render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <Switch>
          {
            process.env.NODE_ENV === 'development' ?
              <Route exact path="/" render={() => <Redirect to="/order/task/create" />} /> : null
          }
          <Route path="/order" render={routes} />
          <Route render={redirectToOtherProjects} />
        </Switch>
      </Router>
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
);
