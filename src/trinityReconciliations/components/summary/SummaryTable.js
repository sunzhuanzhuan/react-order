import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import { Link, browserHistory } from 'react-router'
import { Link } from 'react-router-dom'
import qs from 'qs'
import PropTypes from 'prop-types'
// import * as zhangActions from '../actions/index';
// import Query from'../components/query'

import { Table, Pagination } from "antd";
// import './list.less'

class SummaryTable extends Component {
	constructor(props) {
		super(props)

	}
	handleNewModal=({id})=>{
		// console.log(record)
		this.props.history.push({
			pathname: '/finance/zhangwu/detail',
			search: `?${qs.stringify({ id: id})}`,
		});
	}
	render(){
    let {columns,paginationObj,dataTable}=this.props;
    

		return <div className='top-gap'>
				<Table
					columns={columns}
          dataSource={dataTable}
					rowKey={(record)=>record.summary_sheet_id}
					pagination={paginationObj}
				></Table>
			</div>
	}
}

const mapStateToProps = () => {
	return {
	
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({  }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SummaryTable)
