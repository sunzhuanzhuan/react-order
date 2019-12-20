import React, { Component } from 'react'
import './index.less'
import { Route, Redirect, Switch } from 'react-router-dom';
import CreateTask from './containers/CreateTask';
import Tasks from './containers/Tasks';
import Orders from './containers/Orders';
import Clues from './containers/Clues';
import Attributes from './containers/Attributes';
import Settings from './containers/Settings';
import Account from './containers/Account';
import {  } from 'antd';


class Business extends Component {
  render() {
    return (
      <Switch className='task-pool-router-wrapper'>
        {/*<Route path="/order/task/create" component={CreateTask} />
        <Route path="/order/task/detail/:id" component={TaskDetail} />
        <Route path="/order/task/manage" component={TaskManageList} />
         <Route path="/order/task/review" component={TaskReviewList} />
        <Route path="/order/task/review" component={NewTaskManageList} />
        <Route path="/order/task/remittance_record" component={RemittanceRecordList} />*/}
        <Route path="/order/task/tasks-manage" component={Tasks} />
        <Route path="/order/task/tasks-create" component={CreateTask} />
        <Route path="/order/task/orders-manage" component={Orders} />
        <Route path="/order/task/clues-manage" component={Clues} />
        <Route path="/order/task/attributes-manage" component={Attributes} />
        <Route path="/order/task/settings-manage" component={Settings} />
        <Route path="/order/task/account-manage" component={Account} />
        <Redirect from="/order/task/create" to='/order/task/tasks-manage' />
      </Switch>
    )
  }
}

export default Business
