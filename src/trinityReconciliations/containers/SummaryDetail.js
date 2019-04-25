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
    const search = qs.parse(this.props.location.search.substring(1));
      this.props.actions.getDetailSummary({summary_sheet_id:search.summary_sheet_id});
      this.props.actions.getDetailSummaryList({summary_sheet_id:search.summary_sheet_id})
  }
 
  render() {
    const column = summaryTotalDetailListFunc();
    let {detailSummary,detailSummaryList}=this.props;
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
    <Row className='title'>查看汇总单详情</Row>
    <Row className='agent'>汇总单名称:<span className='agent_name'>{search.summary_sheet_name}</span></Row>
     <SummaryDetailInfo
     detailSummary={detailSummary}
     />
       {detailSummaryList.length>0? <InfoTable
        columns={column}
        dataTable={detailSummaryList}
        paginationObj={false}
        />:null}
     
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
