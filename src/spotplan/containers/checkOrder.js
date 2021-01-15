import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as spotplanAction from "../actions";
import { Pagination, Empty, Skeleton, Button } from 'antd';
import CheckQuery from '../components/checkQuery'
import CheckKocQuery from '../components/checkKocQuery'
import OrderItem from '../components/orderItem'
import OrderKocItem from '../components/orderKocItem'
import Header from '../components/header'
import { STATUS_CUSTOMER, STATUS_RESERVATION } from '../constants'
import qs from 'qs'
import './checkOrder.less'
class CheckOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      orderMaps: {},
      kolVisible: false,
      kocVisible: false
    }
    this.checkQuery = React.createRef();
    this.checkKocQuery = React.createRef();
  }
  componentDidMount() {
    const search = qs.parse(this.props.location.search.substring(1));
    const { getSpotplanExecutor, getSpotplanPlatform } = this.props.actions;

    // 需要修改默认值的问题 item_type 1是kol,2是koc
    if (search.item_type == 2) {
      this.setState({ kocVisible: true })
    } else {
      this.setState({ kolVisible: true })
    }
    this.props.queryBasicInfo().then(() => {
      this.props.queryData(2, { spotplan_id: search.spotplan_id, project_id: [this.props.spotplanPoInfo.project_id], reservation_status: 2, ...search.keys });
      this.props.actions.getSpotplanKocOrderList({ spotplan_id: search.spotplan_id, project_id: [this.props.spotplanPoInfo.project_id], ...search.keys })
    })
    getSpotplanExecutor();
    getSpotplanPlatform();
  }
  handlePageChange = (page) => {
    const search = qs.parse(this.props.location.search.substring(1));
    this.props.queryData(2, { spotplan_id: search.spotplan_id, reservation_status: 2, ...search.keys, page })
  }
  selectKol = () => {
    this.setState({
      kolVisible: true,
      kocVisible: false
    }, () => {
      this.checkQuery.current.resetFields()
    })

  }
  selectKoc = () => {
    this.setState({
      kolVisible: false,
      kocVisible: true
    }, () => {
      this.checkKocQuery.current.resetFields()
    })
  }
  render() {
    const { spotplanExecutor, spotplanPlatform, spotplanProject,
      spotplanOrderList: { page, pageSize, total, rows = [] },
      spotplanKocOrderList: { page: pageKoc, pageSize: pageSizeKoc, total: totalKoc, rows: rowsKoc = [] },
      spotplanPoInfo, handleCheck, handleCheckKoc, orderMaps, loading, orderMapsKoc } = this.props;
    const winHeight = document.documentElement.clientHeight - 120 + 'px';
    let { kolVisible, kocVisible } = this.state
    return <div className='splotplan-check-container' style={{ height: winHeight, overflowY: 'scroll', overflowX: 'hidden' }}>
      <Header data={spotplanPoInfo} />

      <div style={{ marginTop: '20px' }}>
        <Button style={{ borderRadius: 0 }} className={kolVisible ? 'selected' : ''} onClick={this.selectKol}>预约订单</Button>
        <Button style={{ borderRadius: 0 }} className={kocVisible ? 'selected' : ''} onClick={this.selectKoc}>koc订单</Button>
      </div>
      {kolVisible && <div>
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
            project_name={spotplanPoInfo && spotplanPoInfo.project_name}
            getProject={this.props.actions.getSpotplanProject}
            ref={this.checkQuery}
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
      </div>}

      {
        kocVisible && <div>
          <h3 style={{ marginTop: '20px' }}>koc订单列表</h3>
          <div className='check-table-container'>
            <CheckKocQuery
              location={this.props.location}
              history={this.props.history}
              queryData={this.props.queryData}
              spotplan_executor={spotplanExecutor}
              spotplan_platform={spotplanPlatform}
              spotplan_project={spotplanProject}
              getSpotplanKocOrderList={this.props.actions.getSpotplanKocOrderList}
              project_id={spotplanPoInfo && spotplanPoInfo.project_id}
              project_name={spotplanPoInfo && spotplanPoInfo.project_name}
              getProject={this.props.actions.getSpotplanProject}
              ref={this.checkKocQuery}
            />
            <Skeleton active loading={loading}>
              {rowsKoc.length == 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
              {rowsKoc.map((item, index) => (<OrderKocItem key={index} data={item} handleCheckKoc={handleCheckKoc} orderMapsKoc={orderMapsKoc} />))}
              {totalKoc > 50 && <Pagination className='pagination'
                current={pageKoc}
                pageSize={pageSizeKoc}
                onChange={this.handlePageChange}
                // onShowSizeChange={this.hanldeSizeChange}
                size="small"
                total={totalKoc}
                // showSizeChanger
                showQuickJumper
              // pageSizeOptions={['50', '100', '200']}
              />}
            </Skeleton>
          </div>
        </div>
      }
    </div>
  }
}
const mapStateToProps = (state) => {
  return {
    spotplanExecutor: state.spotplanReducers.spotplanExecutor,
    spotplanPlatform: state.spotplanReducers.spotplanPlatform,
    spotplanProject: state.spotplanReducers.spotplanProject,
    spotplanOrderList: state.spotplanReducers.spotplanOrderList,
    spotplanKocOrderList: state.spotplanReducers.spotplanKocOrderList,
    spotplanPoInfo: state.spotplanReducers.spotplanPoInfo,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...spotplanAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckOrder)
