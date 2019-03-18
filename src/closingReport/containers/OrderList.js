import React, { Component } from 'react';
import {} from 'antd';
import OrderCard from '../components/OrderCard';

const cardConfig = {
  orderActions: {
    add: true,
    del: true,
    // check: true
  },
  platformActions: {
    edit: true,
    del: true,
    // check: true
  },
  display: {
    orderStatus: false,
    isReview: false
  }
};

export default class OrderList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true
    };
    props.actions.getCompanyPlatforms();
    props.actions.getSummaryOrderInfo().then(() => {
      this.setState({ loading: false });
    });
  }


  render() {
    const { closingReport: { companySource, summaryOrders } } = this.props;
    const { list = [], source = {} } = summaryOrders;
    const { loading } = this.state;
    return loading ? 'loading...' : <div>
      {
        list.map(key => {
          let item = source[key];
          return <OrderCard key={key} {...cardConfig} optional={companySource.platformByCompany} data={item} />;
        })
      }
    </div>;
  }
}
