import React, { Component } from 'react'
import './index.less'
import { Route } from 'react-router-dom';
import MerchantList from './containers/MerchantList'
import ComplaintsList from './containers/ComplaintsList'

class Business extends Component {
  render() {
    return (
      <div className='business-page-container content'>
        <Route path="/order/business/merchant/list" component={MerchantList} />
        <Route path="/order/business/complaints/list" component={ComplaintsList} />
      </div>
    )
  }
}

export default Business
