import React, { Component } from 'react'
import './index.less'
import { Route } from 'react-router-dom';
import CreateTask from './containers/CreateTask'
import TaskDetail from './containers/TaskDetail'
import NewTaskManageList from './containers/NewTaskManageList'
// import TaskReviewList from './containers/TaskReviewList'
import RemittanceRecordList from './containers/RemittanceRecordList'
import TaskManageList from './containers/TaskManageList';

class Business extends Component {
  render() {
    return (
      <div className='task-pool-router-wrapper'>
        <Route path="/order/task/create" component={CreateTask} />
        <Route path="/order/task/detail/:id" component={TaskDetail} />
        <Route path="/order/task/manage" component={TaskManageList} />
        {/* <Route path="/order/task/review" component={TaskReviewList} /> */}
        <Route path="/order/task/review" component={NewTaskManageList} />
        <Route path="/order/task/remittance_record" component={RemittanceRecordList} />
      </div>
    )
  }
}

export default Business
