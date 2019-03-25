import React, { Component } from 'react';
import { Row } from 'antd';
import SummaryDetailInfo from '../components/summary/Detail';
import InfoTable from '../components/summary/SummaryTable';
import {summaryTotalDetailListFunc} from '../constants/exportOrder/column'
import  * as actionsSummary from '../actions'
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


  componentWillMount=()=> {
    
      this.props.actions.getDetailSummary();
      this.props.actions.getDetailSummaryList()
  }
 
  render() {
    const column = summaryTotalDetailListFunc();
    let {detailSummary,detailSummaryList:{list=[],page,total,page_size}}=this.props;
    console.log(list)
    let paginationObj = {
      onChange: (current) => {
        
        // this.queryData({  page: current, page_size });
      },
     
			total: parseInt(total),
      current: parseInt(page),
      pageSize:page_size,
    
		};
    const search = qs.parse(this.props.location.search.substring(1));
    
    return <div>
    <Row className='title'>查看汇总单详情</Row>
    <Row className='agent'>汇总单名称:<span className='agent_name'>{search.summary_sheet_name}</span></Row>
     <SummaryDetailInfo
     detailSummary={detailSummary}
     />
        <InfoTable
        columns={column}
        dataTable={list}
        paginationObj={paginationObj}
        />
     
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
