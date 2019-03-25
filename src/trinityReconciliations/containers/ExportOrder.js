import React, { Component } from 'react';
import { Button,Row ,Popconfirm,message} from 'antd';
import ExportOrderFilter from '../components/exportOrder/Filter'
import {exportOrderListFunc} from '../constants/exportOrder/column'
import OrderTable from '../components/exportOrder/ExportTable'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actionsStatement from '../actions'
import qs from 'qs'


class ExportOrder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        page_size:20,
        loading:false,
        filterParams:{}
    };
  }


  componentWillMount=()=> {
    const search = qs.parse(this.props.location.search.substring(1));
    this.queryData({ page: 1, page_size: this.state.page_size, ...search.keys })
  }
  handleCancelSelect=()=>{
      this.setState({
        selectedRowKeys: [],
      })
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  //查询
  queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getOrderList({ ...obj }).then(() => {
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
  //导出订单
  handleExportOrder=()=>{
    
  }
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    let {orderList:{list=[], page, total}}=this.props;
    let {loading,page_size,selectedRowKeys}= this.state;
    const column = exportOrderListFunc();
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
    // const dataTable=[{name:'哈哈哈哈',id:2},{name:'天天',id:3}];
    const rowSelection = {
      onChange:this.onSelectChange,
      selectedRowKeys:selectedRowKeys
     
    };
    return <div>
     <Row>导出订单</Row>
     <div>收款平台/代理商:{search.agent}</div>
     <ExportOrderFilter
     search={this.props.actions.searchName}
     accountName={this.props.accountName}
     history={this.props.history}
     questAction={this.queryData}
     page_size={page_size}
     handlefilterParams={this.handlefilterParams}
     />
     <OrderTable
     loading={loading}
     columns={column}
     dataTable={list}
     page_size={page_size}
     paginationObj={paginationObj}
     rowSelection={rowSelection}
     />
     <Row style={{textAlign:'center'}}>
     <Popconfirm title="Are you sure delete this task?"
      onConfirm={this.handleCancelSelect} onCancel={this.cancel} okText="Yes" cancelText="No">
     <Button>取消</Button>
    </Popconfirm>
     
     <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleExportOrder}>导出订单</Button>

     </Row>
    </div>;
  }
}

const mapStateToProps = (state) => {
	return {
    orderList: state.statement.orderList,
    accountName: state.statement.accountName,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...actionsStatement }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ExportOrder)
