import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as spotplanAction from "../actions";
import { Pagination, Empty, Skeleton } from 'antd';
import CheckQuery from '../components/checkQuery'
import OrderItem from '../components/orderItem'
import Header from '../components/header'
import { STATUS_CUSTOMER, STATUS_RESERVATION } from '../constants'
import qs from 'qs'

class CheckOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      orderMaps: {}
    }
  }
  componentDidMount() {
    const search = qs.parse(this.props.location.search.substring(1));
    const { getSpotplanExecutor, getSpotplanPlatform } = this.props.actions;
    this.props.queryBasicInfo().then(() => {
      this.props.queryData(2, { company_id: search.company_id, project_id: [this.props.spotplanPoInfo.project_id], reservation_status: 2, ...search.keys });
    })
    getSpotplanExecutor();
    getSpotplanPlatform();
  }
  handlePageChange = (page) => {
    const search = qs.parse(this.props.location.search.substring(1));
    this.props.queryData(2, { company_id: search.company_id, ...search.keys, page })
  }
  // hanldeSizeChange = (current, size) => {
  //   const search = qs.parse(this.props.location.search.substring(1));
  //   this.props.queryData(2, { company_id: search.company_id, ...search.keys, page: 1, page_size: size })
  // }
  render() {
    const { spotplanExecutor, spotplanPlatform, spotplanProject, spotplanOrderList: { page, pageSize, total, rows = [] }, spotplanPoInfo, handleCheck, orderMaps, loading } = this.props;
    return <div className='splotplan-check-container' style={{ height: 700, overflowY: 'scroll', overflowX: 'hidden' }}>
      <Header data={spotplanPoInfo} />
      <h3 style={{ marginTop: '20px' }}>订单列表</h3>
      <div className='check-table-container'>
        <CheckQuery
          location={this.props.location}
          history={this.props.history}
          queryData={this.props.queryData}
          customer_status={STATUS_CUSTOMER}
          reservation_status={STATUS_RESERVATION}
          spotplan_executor={spotplanExecutor}
          spotplan_platform={spotplanPlatform}
          spotplan_project={spotplanProject}
          project_id={spotplanPoInfo && spotplanPoInfo.project_id}
          getProject={this.props.actions.getSpotplanProject}
        />
        <Skeleton active loading={loading}>
          {rows.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          {rows.map((item, index) => (<OrderItem key={index} data={item} handleCheck={handleCheck} orderMaps={orderMaps} />))}
          {total > 50 && <Pagination className='pagination'
            current={page}
            pageSize={pageSize}
            onChange={this.handlePageChange}
            // onShowSizeChange={this.hanldeSizeChange}
            size="small"
            total={total}
            // showSizeChanger
            showQuickJumper
          // pageSizeOptions={['50', '100', '200']}
          />}
        </Skeleton>
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
    spotplanPoInfo: state.spotplanReducers.spotplanPoInfo,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...spotplanAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckOrder)
