import React, { Component } from 'react';
import { message,Row } from 'antd';
import PaymentFilter from '../components/payment/Filter'
import {paymentListFunc} from '../constants/exportOrder/column'
import PaymentTable from '../components/payment/PaymentTable'
import ReqireTicket from '../components/payment/RequireTicket'
import qs from 'qs'
import  * as actionsPayment from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import SearForm from '../../components/SearchForm';
import {searchFormPayment} from '../constants/search'
import './payment.less';


class Payment extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      page_size:20,
      filterParams:{},
      summary_sheet_id:''
    };
  }


  componentWillMount=()=> {
    const search = qs.parse(this.props.location.search.substring(1));
    this.queryData({ page: 1, page_size: this.state.page_size, ...search.keys })
    this.props.actions.getAgentInfo({agent_id:search.agent_id})
  }
  //查询
  queryData = (obj, func) => {
    this.setState({ loading: true });
    const search = qs.parse(this.props.location.search.substring(1));
		return this.props.actions.getTrinitySummaryList({agent_id:search.agent_id, ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
  }
  //选择查看详情
  handleSelectDetail=(record)=>{
    this.setState({
      summary_sheet_id:record.summary_sheet_id
    })
  }
   //过滤条件
   handlefilterParams = (filterParams) => {
    this.setState({ filterParams });
  }
 
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    const column = paymentListFunc(this.handleSelectDetail,this.state.summary_sheet_id);
    let {agentInfo,summaryList:{list=[],page,total }}=this.props;
    let {loading,page_size,filterParams}= this.state;
   
    let paginationObj = {
      onChange: (current) => {
        
        this.queryData({ ...search.key, page: current, page_size });
      },
      onShowSizeChange: (current, pageSize) => {
      
				const curPage = Math.ceil(total / pageSize);
				this.setState({ page_size: pageSize });
				this.queryData({ ...search.key, page: curPage, page_size: pageSize });
			},
			total: parseInt(total),
      current: parseInt(page),
      pageSize:page_size,
      showQuickJumper: true,
      showSizeChanger:true,
      pageSizeOptions:['20','50','100','200']
    };
    // console.log(this.props.actions.confirmApply)
    
    return <div className="payBox">
     <Row className='title'>申请周期付款</Row>
     <div className='agent'>收款平台/代理商:<span className='agent_name'>
     {agentInfo.length>0?agentInfo[0].agentName:''}</span></div>
      {/* <PaymentFilter
        summary_sheet_id={this.state.summary_sheet_id}
        handlefilterParams={this.handlefilterParams}
        questAction={this.queryData}
        page_size={page_size}
      /> */}
      <SearForm data={searchFormPayment} getAction={this.queryData}
      responseLayout={{ xs: 24, sm: 24, md: 5, lg: 6, xxl: 6 }}  />
     <div className="paymentTable">
      <PaymentTable
      loading={loading}
      columns={column}
      dataTable={list}
      paginationObj={paginationObj}
      />
     </div>
     <Row style={{textAlign:'center'}} className="payment">
        <ReqireTicket
        confirmApply={this.props.actions.confirmApply}
        queryData={this.queryData}
        summary_sheet_id={this.state.summary_sheet_id}
        handleSelectDetail={this.handleSelectDetail}
        filterParams={filterParams}
        page_size={page_size}
        />
     </Row>
    </div>;
  }
}


const mapStateToProps = (state) => {
	return {
		summaryList: state.statement.summaryList,
    agentInfo:state.statement.agentInfo
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...actionsPayment }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
