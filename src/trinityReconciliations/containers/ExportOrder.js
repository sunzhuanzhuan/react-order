import React, { Component } from 'react';
import { Button, Row, Popconfirm, message } from 'antd';
import ExportOrderFilter from '../components/exportOrder/Filter'
import { exportOrderListFunc } from '../constants/exportOrder/column'
import OrderTable from '../components/exportOrder/ExportTable'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actionsStatement from '../actions'
import qs from 'qs'
import './payment.less';
import SearForm from '../../components/SearchForm'
import getPagination from '../../components/pagination'
import { searchForm } from '../constants/search'

const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

class ExportOrder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page_size: 20,
      loading: false,
      filterParams: {},
      order_ids: [],
      selectedRowKeys: [],
    };
  }


  componentWillMount = () => {
    const search = qs.parse(this.props.location.search.substring(1));
    if (search.keys) {
      this.queryData({ page: 1, page_size: this.state.page_size, ...search.keys })
      this.props.actions.getAgentInfo({ agent_id: search.agent_id })
    } else {
      this.queryData({ page: 1, page_size: this.state.page_size, statement_status: ['1', '4'] })
      this.props.actions.getAgentInfo({ agent_id: search.agent_id })
    }

  }
  handleCancelSelect = () => {
    this.setState({
      selectedRowKeys: [],
    })
  }
  onSelectChange = (selectedRowKeys, selectedRow) => {
    this.setState({ selectedRowKeys, selectedRow });
    // selectedRow.map((item) => {
    //   this.state.order_ids.push(item.wby_order_id)
    // })
    this.setState({
      order_ids: selectedRowKeys
    })
  }
  //查询
  queryData = (obj, func) => {
    const search = qs.parse(this.props.location.search.substring(1));
    this.setState({ loading: true });
    const value = obj.ttp_order_ids ? obj.ttp_order_ids.split(',') : null;
    const value1 = obj.wby_order_ids ? obj.wby_order_ids.split(',') : null;
    const value2 = obj.weibo_names ? obj.weibo_names.split(',') : null;
    return this.props.actions.getOrderList({
      agent_id: search.agent_id, ...obj,
      ttp_order_ids: value, wby_order_ids: value1, weibo_names: value2
    }).then(() => {
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
  handleExportOrder = () => {
    const search = qs.parse(this.props.location.search.substring(1));
    let selectedRow = this.state.selectedRow;
    let order_ids = [];
    selectedRow.map((item) => {
      order_ids.push(item.wby_order_id)
    })
    this.props.actions.exportOrder({ order_ids: order_ids }).then((response) => {
      if (response.data.code === 1000) {
        // 处理下载请求
        if (response.headers && (response.headers['content-type'] === 'application/vnd.ms-excel' || response.headers['content-type'] === 'application/x-msdownload' || response.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
          downloadUrl(response.request.responseURL)
          this.queryData({ page: 1, page_size: this.state.page_size, ...search.keys })
          return
        }
      }
    })
    // console.log(order_ids)
  }
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    // console.log(search);
    let { orderList: { list = [], page, total, page_size }, agentInfo } = this.props;
    let { loading, selectedRowKeys } = this.state;
    const column = exportOrderListFunc(agentInfo);
    const paginationObj = getPagination(this, search, { total, page, page_size });
    // let paginationObj = {
    // 	onChange: (current) => {

    //     this.queryData({ ...filterParams, page: current, page_size });
    //   },
    //   onShowSizeChange: (current, pageSize) => {

    // 		const curPage = Math.ceil(total / pageSize);
    // 		this.setState({ page_size: pageSize });
    // 		this.queryData({ ...filterParams, page: curPage, page_size: pageSize });
    // 	},
    // 	total: parseInt(total),
    //   current: parseInt(page),
    //   pageSize:page_size,
    //   showQuickJumper: true,
    //   showSizeChanger:true,
    //   pageSizeOptions:['20','50','100','200']
    // };
    // const dataTable=[{name:'哈哈哈哈',id:2},{name:'天天',id:3}];
    const rowSelection = {
      onChange: this.onSelectChange,
      selectedRowKeys: selectedRowKeys

    };
    return <div className='export-order-container'>
      <Row className='title'>导出订单</Row>
      <div className='agent'>收款平台/代理商:<span className="agent_name">{agentInfo.length > 0 ? agentInfo[0].agentName : ''}</span></div>
      {/* <ExportOrderFilter
     search={this.props.actions.searchName}ßß
     accountName={this.props.accountName}
     history={this.props.history}
     questAction={this.queryData}
     page_size={page_size}
     handlefilterParams={this.handlefilterParams}
     /> */}
      <SearForm data={searchForm} getAction={this.queryData}
        responseLayout={{ xs: 24, sm: 24, md: 10, lg: 8, xxl: 6 }} />
      <div style={{ marginTop: '20px' }}>
        <OrderTable
          loading={loading}
          columns={column}
          dataTable={list}
          page_size={page_size}
          paginationObj={paginationObj}
          rowSelection={rowSelection}
        />
      </div>
      <Row style={{ textAlign: 'center' }}>
        <Popconfirm title={
          <div>
            <div>温馨提示</div>
            <div>取消后将无法保存信息，是否确认此操作?</div>
          </div>
        }
          onConfirm={this.handleCancelSelect} onCancel={this.cancel} okText="确定" cancelText="取消">
          <Button>取消</Button>
        </Popconfirm>

        {selectedRowKeys.length == 0 ? <Button type="primary" style={{ margin: '0 20px' }} onClick={() => message.error('请先选择订单')}>导出订单</Button> :
          <Button type="primary" style={{ margin: '0 20px' }}>
            <a target='_blank' onClick={() => window.location.reload()} href={`/api/finance/statementOrder/export?wby_order_ids=${this.state.order_ids}&agent_id=${search.agent_id}`}>导出订单</a>
          </Button>}
      </Row>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orderList: state.statement.orderList,
    accountName: state.statement.accountName,
    agentInfo: state.statement.agentInfo
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actionsStatement }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ExportOrder)
