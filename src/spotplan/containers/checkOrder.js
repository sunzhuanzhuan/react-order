import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as spotplanAction from "../actions";
import { Pagination } from 'antd';
import CheckQuery from '../components/checkQuery'
import OrderItem from '../components/orderItem'
import Header from '../components/header'
import { STATUS_CUSTOMER, STATUS_RESERVATION } from '../constants'

class CheckOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      orderMaps: {}
    }
  }
  componentDidMount() {
    const { search } = this.props;
    const { getSpotplanExecutor, getSpotplanPlatform, getSpotplanProject } = this.props.actions;
    getSpotplanExecutor();
    getSpotplanPlatform();
    getSpotplanProject();
    this.props.queryData(2, { spotplan_id: search.spotplan_id, ...search.keys });
  }
  render() {
    const { spotplanExecutor, spotplanPlatform, spotplanProject, spotplanOrderList: { page, pageSize, total, rows = [] }, handleCheck, orderMaps } = this.props;
    return <div className='splotplan-check-container'>
      <Header />
      <h3 style={{ marginTop: '20px' }}>订单列表</h3>
      <div className='check-table-container'>
        <CheckQuery customer_status={STATUS_CUSTOMER}
          reservation_status={STATUS_RESERVATION}
          spotplan_executor={spotplanExecutor}
          spotplan_platform={spotplanPlatform}
          spotplan_project={spotplanProject}
        />
        {rows.map((item, index) => (<OrderItem key={index} data={item} handleCheck={handleCheck} orderMaps={orderMaps} />))}
        {total > 50 && <Pagination className='pagination'
          size="small"
          // total={50}
          // showSizeChanger
          showQuickJumper
        // pageSizeOptions
        />}
      </div>
    </div>
  }
}
const mapStateToProps = (state) => {
  return {
    spotplanExecutor: state.spotplanReducers.spotplanExecutor,
    spotplanPlatform: state.spotplanReducers.spotplanPlatform,
    spotplanProject: state.spotplanReducers.spotplanProject,
    spotplanOrderList: state.spotplanReducers.spotplanOrderList,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...spotplanAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckOrder)
