import React, { Component } from 'react'
import './index.less'
import { Route, Redirect, Switch } from 'react-router-dom';
import CreateTask from './containers/CreateTask';
import Tasks from './containers/Tasks';
import Orders from './containers/Orders';
import OrderCooDetail from './containers/OrderCooDetail';
import OrderWechatDetail from './containers/OrderWechatDetail';
import Clues from './containers/Clues';
import Attributes from './containers/Attributes';
import CreateAttribute from './containers/CreateAttribute';
import Settings from './containers/Settings';
import Account from './containers/Account';
import AccountReceive from './containers/AccountReceive';
import AccountDetails from './containers/AccountDetails'
import operationLog from './containers/Log'
import CluesDetails from './containers/CluesDetails'
import Platform from './containers/Platfrom'
class Business extends Component {
  render() {
    return (
      <div className='task-pool-router-wrapper'>
        <Switch >
          {/*<Route path="/order/task/create" component={CreateTask} />
        <Route path="/order/task/detail/:id" component={TaskDetail} />
        <Route path="/order/task/manage" component={TaskManageList} />
         <Route path="/order/task/review" component={TaskReviewList} />
        <Route path="/order/task/review" component={NewTaskManageList} />
        <Route path="/order/task/remittance_record" component={RemittanceRecordList} />*/}
          <Route path="/order/task/tasks-manage" component={Tasks} />
          <Route path="/order/task/tasks-create" component={CreateTask} />
          <Route path="/order/task/orders-manage" component={Orders} />
          <Route path="/order/task/orders-coodetail" component={OrderCooDetail} />
          <Route path="/order/task/orders-wechatdetail" component={OrderWechatDetail} />

          <Route path="/order/task/clues-manage" component={Clues} />
          <Route path="/order/task/clues-details" component={CluesDetails} />
          <Route path="/order/task/attributes-manage" component={Attributes} />
          <Route path="/order/task/attributes-create" component={CreateAttribute} />
          <Route path="/order/task/platform-manage" component={Platform} />
          <Route path="/order/task/settings-manage" component={Settings} />
          <Route path="/order/task/account-manage" component={Account} />
          <Route path="/order/task/account-receive" component={AccountReceive} />
          <Route path="/order/task/account-details" component={AccountDetails} />
          <Route path="/order/task/operation-log" component={operationLog} />
          <Redirect from="/order/task/create" to='/order/task/tasks-manage' />
        </Switch >
      </div>
    )
  }
}

export default Business
