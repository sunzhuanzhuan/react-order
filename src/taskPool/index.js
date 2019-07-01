import React, { Component } from 'react'
import './index.less'
import { Route } from 'react-router-dom';
import CreateTask from './containers/CreateTask'

class Business extends Component {
  render() {
    return (
      <div className='task-pool-router-wrapper'>
        {/*<Route path="/order/task/list" component={MerchantList} />*/}
        {/*<Route path="/order/task/review" component={MerchantList} />*/}
        <Route path="/order/task/create" component={CreateTask} />
      </div>
    )
  }
}

export default Business
