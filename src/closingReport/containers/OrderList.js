import React, { Component } from 'react';
import {} from 'antd';
import OrderCard from '../components/OrderCard';
import DataDetailsModal from './DataDetailsModal';

export default class OrderList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      detailId: ''
    };
    props.actions.getCompanyPlatforms()
  }



  render() {
    const { closingReport } = this.props
    return <div>
      <OrderCard orderActions={{ add: true, del: true, check: true }} source={closingReport.companySource.platformByCompany}/>
      {this.state.detailId ? <DataDetailsModal id={this.state.detailId} /> : null}
    </div>;
  }
}
