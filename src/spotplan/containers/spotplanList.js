import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as spotplanAction from "../actions";
import { Breadcrumb, Table, message } from 'antd'
import ListQuery from '../components/listQuery'
import { SpotplanListFunc } from '../constants'
import './spotplan.less'
import qs from 'qs'

class SpotPlanList extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {
    const search = qs.parse(this.props.location.search.substring(1));
    const { getSpotplanProject, getSpotplanBrand, getSpotplanExecutor } = this.props.actions;
    getSpotplanProject();
    getSpotplanBrand();
    getSpotplanExecutor();
    this.queryData({ ...search.keys })
  }
  handleJump = (record) => {
    const params = {
      keys: { item_type: 1 },
      labels: { item_type: "预约订单" },
    };
    this.props.history.replace({
      pathname: '/order/spotplan/detail',
      search: `?${qs.stringify({ spotplan_id: record.spotplan_id, ...params })}`,
    })
  }
  queryData = (obj, func) => {
    this.setState({ loading: true });
    return this.props.actions.getSpotplanList({ ...obj }).then((res) => {
      if (func && Object.prototype.toString.call(func) === '[object Function]') {
        func(res.data);
      }
      this.setState({ loading: false });
    }).catch(({ errorMsg }) => {
      this.setState({ loading: false });
      message.error(errorMsg || '获取接口数据出错！');
    })
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    const { loading } = this.state;
    const { spotplanProject, spotplanBrand, spotplanExecutor, spotplanList: { total, page, pageSize, rows } } = this.props;
    const SpotplanListCols = SpotplanListFunc(this.handleJump);
    const paginationObj = {
      onChange: (current) => {
        this.queryData({ ...search.keys, page: current }).then(() => {
          this.props.history.replace({
            pathname: this.props.location.pathname,
            search: `?${qs.stringify({ ...search, keys: { ...search.keys, page: current } })}`,
          });
        })
      },
      // onShowSizeChange: (current, page_size) => {
      //   this.queryData({ ...search.keys, page: 1, page_size }).then(() => {
      //     this.props.history.replace({
      //       pathname: this.props.location.pathname,
      //       search: `?${qs.stringify({ ...search, keys: { ...search.keys, page: current, page_size } })}`,
      //     });
      //   })
      // },
      total: parseInt(total),
      current: parseInt(page),
      pageSize: parseInt(pageSize),
      showQuickJumper: true,
      // showSizeChanger: true,
      // pageSizeOptions: ['50', '100', '200'],
      size: "small"
    };
    return <div className='spotList-list-container'>
      <Breadcrumb>
        <Breadcrumb.Item><a href="">Spotplan管理</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="">Spotplan列表</a></Breadcrumb.Item>
      </Breadcrumb>
      <h2>Spotplan列表</h2>
      <h3 style={{ marginTop: '20px' }}>筛选项</h3>
      <ListQuery
        queryData={this.queryData}
        history={this.props.history}
        location={this.props.location}
        spotplan_project={spotplanProject}
        spotplan_brand={spotplanBrand}
        spotplan_executor={spotplanExecutor}
        getProject={this.props.actions.getSpotplanProject}
      />
      <h3 style={{ marginTop: '20px' }}>Spotplan列表</h3>
      <Table
        rowKey='spotplan_id'
        loading={loading}
        columns={SpotplanListCols}
        dataSource={rows}
        bordered
        pagination={total > 50 ? paginationObj : false}
      />
    </div>
  }
}
const mapStateToProps = (state) => {
  return {
    spotplanProject: state.spotplanReducers.spotplanProject,
    spotplanBrand: state.spotplanReducers.spotplanBrand,
    spotplanExecutor: state.spotplanReducers.spotplanExecutor,
    spotplanList: state.spotplanReducers.spotplanList,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...spotplanAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotPlanList)
