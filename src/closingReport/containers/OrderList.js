import React, { Component } from 'react';
import {} from 'antd';
import OrderCard from '../components/OrderCard';

const cardConfig = {
  orderActions: {
    add: true,
    del: true
    // check: true
  },
  display: {
    orderStatus: false,
    platformConfig: (item, data, propsSource) => {
      // data.is_finish == 2 || data.modify_status == 1 || data.check_status == 6;
      //return { edit, del, check, view, props }
      let result = {};
      let source = propsSource['is_finish'];
      let status = item['is_finish'];
      result.props = source[status];
      result.del = parseInt(item.is_hand_record) === 1;
      if (parseInt(status) === 2) {
        result.edit = true;
      }
      result.view = !result.edit;
      return result;
    }
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
          return <OrderCard actions={this.props.actions} key={key} {...cardConfig} optional={companySource.platformByCompany} data={item} />;
        })
      }
    </div>;
  }
}
