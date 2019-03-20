import React, { Component } from 'react';
import { Tabs,Row,message } from 'antd';
import SummaryFilter from '../components/summary/Filter'
import {summaryListFunc,summaryShiListFunc} from '../constants/exportOrder/column'
import SummaryTable from '../components/summary/SummaryTable';
import qs from 'qs'
import  * as actionsSummary from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
const TabPane = Tabs.TabPane;



class Summary extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page_size:20
    };
  }


  componentWillMount=()=> {
    const search = qs.parse(this.props.location.search.substring(1));
    this.queryData({ page: 1, page_size: this.state.page_size, ...search.keys })
  }
  //查询
  queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getSummaryList({ ...obj }).then(() => {
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
  this.props.history.push({
    pathname: '/order/trinity/reconciliations/detail',
    search: `?${qs.stringify({ id: record.id})}`,
  });
 }
 handleOut=(record)=>{
   console.log(record)
 }
 
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    const column = summaryListFunc(this.handleSelectDetail,this.handleOut);
    const shiColum = summaryShiListFunc();
    let {summaryList:{list=[],page,total }}=this.props;
    let {loading,page_size}= this.state;
   
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
     <Row>汇总单列表【平台/代理商:hahah】</Row>
     <Tabs defaultActiveKey="1">
      <TabPane tab="全部" key="1">
        <SummaryFilter/>
        <SummaryTable
        loading={loading}
      columns={column}
      dataTable={list}
      paginationObj={paginationObj}
      />
      </TabPane>
      <TabPane tab="对账完成" key="2">
        <SummaryFilter/>
        <SummaryTable
         loading={loading}
      columns={column}
      dataTable={list}
      paginationObj={paginationObj}
      />
      </TabPane>
      <TabPane tab="已释放" key="3">
        <SummaryFilter/>
        <SummaryTable
         loading={loading}
      columns={shiColum}
      dataTable={list}
      paginationObj={paginationObj}
      />
      </TabPane>
    </Tabs>,
     
     
    </div>;
  }
}

const mapStateToProps = (state) => {
	return {
		summaryList: state.statement.summaryList,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...actionsSummary }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary)
