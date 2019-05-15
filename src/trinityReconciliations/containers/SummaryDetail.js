import React, { Component } from 'react';
import { Row, Button, Popconfirm, PageHeader, message } from 'antd';
import SummaryDetailInfo from '../components/summary/Detail';
import InfoTable from '../components/summary/SummaryTable';
import { summaryTotalDetailListFunc } from '../constants/exportOrder/column'
import * as actionsSummary from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import qs from 'qs'
import './payment.less'


class SummaryDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }
  handleRelease = () => {
    const search = qs.parse(this.props.location.search.substring(1));
    this.props.actions.getDelummary({ summary_sheet_id: search.summary_sheet_id }).then((res) => {
      if (res.code == 1000) {
        message.success('释放成功');
        const search = qs.parse(this.props.location.search.substring(1));
        this.props.history.push({
          pathname: '/order/trinity/reconciliations/summary',
          search: `?${qs.stringify({
            agent_id: search.agent_id
          })}`,
        });
      }
    })
  }

  componentWillMount = () => {
    const search = qs.parse(this.props.location.search.substring(1));
    this.props.actions.getDetaillummary({ summary_sheet_id: search.summary_sheet_id });
    this.props.actions.getDetailSummaryList({ summary_sheet_id: search.summary_sheet_id })
  }

  render() {
    const column = summaryTotalDetailListFunc();
    let { detailSummary, detailSummaryList } = this.props;
    // let paginationObj = {
    //   onChange: (current) => {

    //     // this.queryData({  page: current, page_size });
    //   },

    // 	total: parseInt(total),
    //   current: parseInt(page),
    //   pageSize:page_size,

    // };
    const search = qs.parse(this.props.location.search.substring(1));

    return <div>
      <Row className='summaryDetail'><PageHeader
        onBack={() => {
          this.props.history.push({
            pathname: '/order/trinity/reconciliations/summary',
            search: `?${qs.stringify({
              agent_id: search.agent_id
            })}`,
          });
        }}
        title="查看汇总单详情"
      /></Row>
      <Row className='agent'>汇总单名称:<span className='agent_name'>{detailSummary.summary_sheet_name}</span></Row>
      <SummaryDetailInfo
        detailSummary={detailSummary}
      />
      {detailSummaryList.length > 0 ? <InfoTable
        columns={column}
        dataTable={detailSummaryList}
        paginationObj={false}
      /> : null}
      {
        search.release ? <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Button onClick={() => {
            this.props.history.push({
              pathname: '/order/trinity/reconciliations/summary',
              search: `?${qs.stringify({
                agent_id: search.agent_id
              })}`,
            });
          }}>取消</Button>
          <Popconfirm title="是否确认释放该汇总单，释放后，需重新进行对账！" onConfirm={this.handleRelease} okText="确定" cancelText="取消">

            <Button type="primary" style={{ marginLeft: '50px' }}>确认</Button>
          </Popconfirm>

        </div> : null
      }
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    detailSummary: state.statement.detailSummary,
    detailSummaryList: state.statement.detailSummaryList,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actionsSummary }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryDetail)
