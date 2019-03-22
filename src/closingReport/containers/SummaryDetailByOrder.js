import React, { Component } from 'react';
import { PageHeader, Divider,  Empty } from 'antd';
import OrderCard from '../components/OrderCard';
import { SH2 } from '@/base/SectionHeader';
import { linkTo } from '../../util/linkTo';
import { parseUrlQuery } from '../../util/parseUrl';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { connect } from 'react-redux';
import DetailModal from '../base/DetailModal';
import Loading from '../base/Loading';

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  closingReport: state.closingReportReducers
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Test extends Component {
  constructor(props) {
    super(props);
    let { summary_id, order_id } = parseUrlQuery();
    this.state = {
      summaryId: summary_id,
      orderId: order_id,
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
        if (![1, 4, 6].includes(data.summary_status)) {
          return {};
        }
        // 当订单的投放数据审核状态为【待提交内审】【内审被拒，待修改】【品牌方审核被拒，待修改】时，
        // 订单操作逻辑同在 逻辑B 的基础上增加【提交审核】操作
        return {
          add: true,
          del: true,
          check: {
            disabled: data.platform.some(platform => parseInt(platform.is_finish) === 2),
            callback: () => {
              this.reload();
            }
          }
        };
      },
      orderStatus: true,
      dateTimeRecord: true,
      platformConfig: (item, data, propsSource) => {
        // data.is_finish == 2 || data.modify_status == 1 || data.check_status == 6;
        //return { edit, del, check, view, props }
        // 待提交内审
        if (data.summary_status === 1) {
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
        // 内审被拒，待修改
        if (data.summary_status === 4) {
          let result = {};
          let source = propsSource['modify_status'];
          let status = item['modify_status'];
          result.props = source[status];
          result.del = parseInt(item.is_hand_record) === 1 && parseInt(status) !== 3;
          if (parseInt(status) === 1) {
            result.edit = true;
          }
          if (item['is_finish'] !== 1) {
            result.edit = true;
          }
          result.view = !result.edit;
          return result;
        }
        // 品牌方审核被拒，待修改
        if (data.summary_status === 6) {
          let result = {};
          result.del = parseInt(item.is_hand_record) === 1;
          result.edit = true;
          result.view = !result.edit;
          return result;
        }
        return {
          view: true
        };
      }
    };
    const { actions } = this.props;
    // 获取结案数据单信息
    actions.getSummaryTotalInfo({ summary_id }).then(({ data }) => {
      actions.getCompanyPlatforms({ company_id: data.company_id });
    });
    actions.getSummaryOrderInfo({ summary_id, order_id }).then(() => {
      this.setState({ loading: false });
    });
  }

  reload = () => {
    let { summary_id, order_id } = parseUrlQuery();
    const { actions } = this.props;
    this.setState({ loading: true });
    actions.getSummaryOrderInfo({ summary_id, order_id }).then(() => {
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
    if (!this.state.summaryId || !this.state.orderId) {
      linkTo('/error');
    }
    const { closingReport: { companySource, summaryOrders, platformData }, actions } = this.props;
    const { list = [], source = {} } = summaryOrders;
    const { summaryName, creatorName} = companySource;
    const { loading, detailModal,  summaryId } = this.state;
    const connect = {
      actions,
      platformData,
      companySource
    };
    return <div>
      <PageHeader
        onBack={() => this.props.history.push('/order/closing-report/list/summary-order')}
        title="结案数据单详情页"
      >
        <div style={{ padding: '20px 15px' }}>
          <span>
            结案数据单号：{summaryId}
          </span>
          <Divider type="vertical" />
          <span>
            结案数据单名称：{summaryName}
          </span>
          <Divider type="vertical" />
          <span>
            创建人：{creatorName}
          </span>
        </div>
        <SH2 />
      </PageHeader>
      {loading ? <Loading/> : <div style={{marginTop: '20px'}}>
        {
          list.length ? list.map(key => {
            let item = source[key];
            return <OrderCard
              key={key}
              {...connect}
              display={this.cardConfig}
              optional={companySource.platformByCompany}
              data={item}
              onDetail={this.handleDetail}
            />;
          }): <Empty/>
        }
        <DetailModal
          {...connect}
          {...detailModal}
          closed={() => this.handleDetail()}
        />
      </div>}
    </div>;
  }
}
