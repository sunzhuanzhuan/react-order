import React, { Component } from 'react'
import './index.less'
import { Route, Redirect, Switch } from 'react-router-dom';
import CreateTask from './containers/CreateTask';
import UpdateTask from './containers/UpdateTask';
import TaskDetail from './containers/TaskDetail';
import Tasks from './containers/Tasks';
import Orders from './containers/Orders';
import OrderCooDetail from './containers/OrderCooDetail';
import OrderWechatDetail from './containers/OrderWechatDetail';
import Clues from './containers/Clues';
import Attributes from './containers/Attributes';
import CreateAttribute from './containers/CreateAttribute';
import UpdateAttribute from './containers/UpdateAttribute';
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
          <Route path="/order/task/tasks-manage/:active" component={Tasks} />
          <Route path="/order/task/tasks-create" component={CreateTask} />
          <Route path="/order/task/tasks-update/:id" component={UpdateTask} />
          <Route path="/order/task/tasks-details/:id" component={TaskDetail} />
          <Route path="/order/task/orders-manage/:id" component={Orders} />
          <Route path="/order/task/orders-coodetail" component={OrderCooDetail} />
          <Route path="/order/task/orders-wechatdetail" component={OrderWechatDetail} />

          <Route path="/order/task/clues-manage" component={Clues} />
          <Route path="/order/task/clues-details" component={CluesDetails} />
          <Route path="/order/task/attributes-manage" component={Attributes} />
          <Route path="/order/task/attributes-create/:pid/:name" component={CreateAttribute} />
          <Route path="/order/task/attributes-update/:id" component={UpdateAttribute} />
          <Route path="/order/task/platform-manage" component={Platform} />
          <Route path="/order/task/settings-manage" component={Settings} />
          <Route path="/order/task/account-manage" component={Account} />
          <Route path="/order/task/account-receive" component={AccountReceive} />
          <Route path="/order/task/account-details" component={AccountDetails} />
          <Route path="/order/task/operation-log" component={operationLog} />
          <Redirect from="/order/task/create" to='/order/task/tasks-manage/9' />
          <Redirect from="/order/task/tasks-manage" to='/order/task/tasks-manage/9' />
        </Switch >
      </div>
    )
  }
}

export default Business
