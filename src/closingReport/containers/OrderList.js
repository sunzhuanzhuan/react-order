import React, { Component } from 'react';
import {} from 'antd';
import OrderCard from '../components/OrderCard';
import DataDetailsModalEdit from './DataDetailsModalEdit';
import DataDetailsModalView from './DataDetailsModalView';
import DataDetailsModalCheck from './DataDetailsModalCheck';

const DetailModal = (props) => {
  let C;
  switch (props.type) {
    case 'edit':
      C = DataDetailsModalEdit;
      break;
    case 'view':
      C = DataDetailsModalView;
      break;
    case 'check':
      C = DataDetailsModalCheck;
      break;
    default :
      return null;
  }
  return props.show && <C {...props} />;
};

export default class OrderList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      detailModal: {
        show: false,
        data: {},
        type: ''
      }
    };
    this.cardConfig = {
      orderActions: (data) => {
        //return { add, del, check }
        return {
          add: true,
          del: true,
          check: {
            disabled: data.platform.some(platform => parseInt(platform.is_finish) === 2),
            callback: () => {
              this.reload()
            }
          }
        };
      },
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
    };
    props.actions.getCompanyPlatforms();
    props.actions.getSummaryOrderInfo().then(() => {
      this.setState({ loading: false });
    });
  }

  reload = () => {
    const { actions } = this.props;
    this.setState({ loading: true });
    actions.getSummaryOrderInfo().then(() => {
      this.setState({ loading: false });
    });
  };

  handleDetail = (type, item, data) => {
    this.setState({
      detailModal: type ? {
        show: true,
        data: { ...data, current: item },
        type: type
      } : {}
    });
  };

  render() {
    const { closingReport: { companySource, summaryOrders, platformData }, actions } = this.props;
    const { list = [], source = {} } = summaryOrders;
    const { loading, detailModal } = this.state;
    const connect = {
      actions,
      platformData,
      companySource
    };
    return loading ? 'loading...' : <div>
      {
        list.map(key => {
          let item = source[key];
          return <OrderCard
            key={key}
            {...connect}
            display={this.cardConfig}
            optional={companySource.platformByCompany}
            data={item}
            onDetail={this.handleDetail}
          />;
        })
      }
      <DetailModal
        {...connect}
        {...detailModal}
        closed={() => this.handleDetail()}
      />
    </div>;
  }
}
