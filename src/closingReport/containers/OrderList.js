import React, { Component } from 'react';
import {} from 'antd';
import OrderCard from '../components/OrderCard';
import DataDetailsModal from './DataDetailsModal';

export default class OrderList extends Component {
  state = {
    detailId: ''
  };

  render() {
    return <div>
      <OrderCard orderActions={{ add: true, del: true, check: true }} />
      {this.state.detailId ? <DataDetailsModal id={this.state.detailId} /> : null}
    </div>;
  }
}
