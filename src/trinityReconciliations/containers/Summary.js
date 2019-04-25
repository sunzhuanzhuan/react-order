import React, { Component } from 'react';
import { Tabs,Row,message,Modal } from 'antd';
// import SummaryFilter from '../components/summary/Filter'
import {summaryListFunc,summaryShiListFunc} from '../constants/exportOrder/column'
import SummaryTable from '../components/summary/SummaryTable';
import qs from 'qs'
import  * as actionsSummary from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import SummaryDetailInfo from '../components/summary/Detail'
import InfoTable from '../components/summary/SummaryTable'
import {summaryTotalDetailListFunc} from '../constants/exportOrder/column'
import SearForm from '../../components/SearchForm';
import {searchFormStatement} from '../constants/search'
import './payment.less'
const TabPane = Tabs.TabPane;



class Summary extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page_size:20,
      filterParams:{},
      activeKey:'1',
      visible: false
    };
  }


  componentWillMount=()=> {
    const search = qs.parse(this.props.location.search.substring(1));
    this.queryData({ page: 1, page_size: this.state.page_size, ...search.keys })
  }
  //查询
  queryData = (obj, func) => {
		this.setState({ loading: true });
    const search = qs.parse(this.props.location.search.substring(1));
		return this.props.actions.getSummaryList({agent_id:search.agent_id, ...obj }).then(() => {
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
   console.log(111111)
  const search = qs.parse(this.props.location.search.substring(1));
  // this.props.actions.getDetailSummary().then(()=>{
  //   this.props.actions.getDetailSummaryList().then(()=>{
      this.props.history.push({
        pathname: '/order/trinity/reconciliations/detail',
        search: `?${qs.stringify({ 
          summary_sheet_id:record.summary_sheet_id,
          agent_id:search.agent_id})}`,
      });
//     })
//  });
  
 
 }
 //释放汇总单
 handleOut=(record)=>{
  const search = qs.parse(this.props.location.search.substring(1));
  //  console.log(record);
  this.props.actions.getDelummary({summary_sheet_id:record.summary_sheet_id}).then(()=>{
    // this.props.actions.getDetailSummaryList().then((res)=>{
    //   // console.log(res)
    //   if(res.code == 1000){
    //     this.setState({
    //           visible: true,
    //     });
    //   }
    
    // })
    this.queryData({ page: 1, page_size: this.state.page_size, ...search.keys })
    })
   
  //  console.log(record);
  
 }

handleOk = () => {
  
  this.setState({
    visible: false,
  });
   this.props.actions.releaseSummaryList().then((res)=>{
    if(res.data==1000){
      message.success(res.msg)
    }else{
      message.error(res.msg)
    }
  })
}

handleCancel = (e) => {
  console.log(e);
  this.setState({
    visible: false,
  });
}
 //切换tab
 handleChangeTab=(activeKey)=>{
    // console.log(activeKey);
    this.setState({activeKey})
    // this.child.handleClear()
    if(activeKey == '3'){
      this.queryData({ page: 1, page_size: this.state.page_size,summary_status:'3' })
    }else if(activeKey == '5'){
      this.queryData({ page: 1, page_size: this.state.page_size, summary_status:'5'})
    }else{
      this.queryData({ page: 1, page_size: this.state.page_size, })
    }
 }
  //过滤条件
  handlefilterParams = (filterParams) => {
    this.setState({ filterParams });
  }
 
  onRef=(ref)=>{
    this.child = ref;
  }
  render() {
    const columnDetail = summaryTotalDetailListFunc();
    const search = qs.parse(this.props.location.search.substring(1));
    const column = summaryListFunc(this.handleSelectDetail,this.handleOut);
    // const shiColum = summaryShiListFunc(this.handleSelectDetail);
    let {detailSummary,detailSummaryList:{list:detailList=[],page:detailPage,total:detailTotal,page_size:detailPageSize}}=this.props;
    let {summaryList:{list=[],page,total },agentInfo}=this.props;
    let {loading,page_size}= this.state;
    let paginationObjInfo = {
      onChange: (current) => {
        
        // this.queryData({  page: current, page_size });
      },
     
			total: parseInt(detailTotal),
      current: parseInt(detailPage),
      pageSize:detailPageSize,
    
		};
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
    
    
    return <div>
     <Row className='title'>汇总单列表</Row>
     <Row className='agent'>平台/代理商:<span className='agent_name'>{agentInfo.length>0?agentInfo[0].agentName:''}</span></Row>
     <Tabs defaultActiveKey="1" onChange={this.handleChangeTab}>
      <TabPane tab="全部" key="1">
      <SearForm data={searchFormStatement} getAction={this.queryData}
      responseLayout={{ xs: 24, sm: 24, md: 10, lg: 8, xxl: 6 }}  />
        {/* <SummaryFilter
          onRef={this.onRef}
          handlefilterParams={this.handlefilterParams}
          questAction={this.queryData}
          page_size={page_size}
        /> */}
        <SummaryTable
          loading={loading}
          columns={column}
          dataTable={list}
          paginationObj={paginationObj}
      />
      </TabPane>
      <TabPane tab="对账完成" key="3">
      <SearForm data={searchFormStatement} getAction={this.queryData}
      responseLayout={{ xs: 24, sm: 24, md: 10, lg: 8, xxl: 6 }}  />
        {/* <SummaryFilter
         onRef={this.onRef}
         handlefilterParams={this.handlefilterParams}
         questAction={this.queryData}
         page_size={page_size}
        /> */}
        <SummaryTable
           loading={loading}
           columns={column}
           dataTable={list}
           paginationObj={paginationObj}
      />
      </TabPane>
      <TabPane tab="已释放" key="5">
      <SearForm data={searchFormStatement} getAction={this.queryData}
      responseLayout={{ xs: 24, sm: 24, md: 10, lg: 8, xxl: 6 }}  />
        {/* <SummaryFilter
        onRef={this.onRef}
        handlefilterParams={this.handlefilterParams}
        questAction={this.queryData}
        page_size={page_size}
        /> */}
        <SummaryTable
          loading={loading}
          columns={column}
          dataTable={list}
          paginationObj={paginationObj}
      />
      </TabPane>
    </Tabs>,
     
   {this.state.visible? <Modal
      width={1000}
      title="释放汇总单"
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      >
      <h3 style={{color:'red'}}>是否确认释放该汇总单，释放后，需重新对账操作！</h3>
         <SummaryDetailInfo
          detailSummary={detailSummary}
          />
        <InfoTable
        columns={columnDetail}
        dataTable={detailList}
        paginationObj={paginationObjInfo}
        />
     
        </Modal>:null}
    </div>;
  }
}

const mapStateToProps = (state) => {
	return {
    summaryList: state.statement.summaryList,
    detailSummary: state.statement.detailSummary,
		detailSummaryList: state.statement.detailSummaryList,
    agentInfo:state.statement.agentInfo
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...actionsSummary }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary)
