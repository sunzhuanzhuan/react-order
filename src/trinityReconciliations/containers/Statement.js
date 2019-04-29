import React, { Component } from 'react';
import { Row ,message} from 'antd';
import {stateListFunc} from '../constants/exportOrder/column'
import StateTable from '../components/statement/StateTable';
import Filter from '../components/statement/Filter'
import qs from 'qs'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import  * as actionsStatement from '../actions'
import SearForm from '../../components/SearchForm';
import {searchFormStatement} from '../constants/search'

import './payment.less';


class Statement extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page_size:20,
      loading:false,
      filterParams:{}
    };
  }


  componentWillMount=() =>{
    const search = qs.parse(this.props.location.search.substring(1));
    this.queryData({ page: 1, page_size: this.state.page_size})
    this.props.actions.getAgentInfo({agent_id:search.agent_id})
  }
 //删除对账单
 handleDelete=(record)=>{
  this.props.actions.deleteStatement({statement_id:record.statement_id}).then((res)=>{
      if(res.code == 1000){
        message.success('删除成功');

      }else{
        message.error('删除失败')
      }
      this.queryData({ page: 1, page_size: this.state.page_size})
  })
 }
  //查询
  queryData = (obj, func) => {
    this.setState({ loading: true });
    const search = qs.parse(this.props.location.search.substring(1));
    return this.props.actions.getListStatement({ agent_id:search.agent_id,...obj }).then(() => {
      if (func && Object.prototype.toString.call(func) === '[object Function]') {
        func();
      }
      this.setState({ loading: false })
    }).catch(({ errorMsg }) => {
      this.setState({ loading: false });
      message.error(errorMsg || '列表加载失败，请重试！');
    })
  }
  //filter
  handlefilterParams = (filterParams) => {
    this.setState({ filterParams });
  
  }
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    const column = stateListFunc(this.handleDelete);
    let {statementList:{list=[],page,total },agentInfo}=this.props;
   
    let {page_size,loading,filterParams}=this.state;
    let paginationObj = {
      onChange: (current) => {
        
        this.queryData({ page: current, page_size ,...filterParams});
      },
      onShowSizeChange: (current, pageSize) => {
      
				const curPage = Math.ceil(total / pageSize);
				this.setState({ page_size: pageSize });
				this.queryData({ page: curPage, page_size: pageSize,...filterParams });
			},
			total: parseInt(total),
      current: parseInt(page),
      pageSize:page_size,
      showQuickJumper: true,
      showSizeChanger:true,
      pageSizeOptions:['20','50','100','200']
		};
    
    return <div>
      <Row className='title'>对账单导入记录【所属平台:<span className='agent_name'>{agentInfo.length>0?agentInfo[0].agentName:''}</span>,
      总对账单数量:<span className='agent_name'>{total}</span>】</Row>
      {/* <Filter
      questAction={this.queryData}
      page_size={page_size}
      />
      */}
       <div style={{marginTop:'20px'}}>
        <SearForm data={searchFormStatement} getAction={this.queryData}
        responseLayout={{ xs: 24, sm: 24, md: 10, lg: 8, xxl: 6 }}  />
      </div>
      <div style={{marginTop:'20px'}}>
      <StateTable
      loading={loading}
      columns={column}
      dataTable={list}
      paginationObj={paginationObj}
      />
     </div>
     
    </div>;
  }
}



const mapStateToProps = (state) => {
	return {
    statementList: state.statement.statementList,
    agentInfo:state.statement.agentInfo
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...actionsStatement }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Statement)
