import React, { Component } from 'react';
import {} from 'antd';
import OrderCard from '../components/OrderCard';
import DetailModal from '../base/DetailModal';
import Loading from '../base/Loading';


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
    const { closingReport: { companySource }, actions, companyId } = props
    actions.getCompanyPlatforms({company_id: companyId});
    actions.getSummaryOrderInfo({summary_id: companySource.summaryId}).then(() => {
      this.setState({ loading: false });
    });
  }

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
    return loading ? <Loading/> : <div>
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
