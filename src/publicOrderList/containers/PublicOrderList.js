import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Scolltable from '../../components/Scolltable'
import { Form, Tabs, Table, message, Modal } from 'antd';
import StatementComponent from '../components/StatementComponent'
import FilterForm from '../components/filter/FilterForm'
import ModalComponent from '../components/modal/ModalComponent'
import { filterFormArr, columns, modalParams } from '../contants/config'
import * as publicOrderListActions from '../actions/publicOrderListActions'
import './PublicOrderList.less'
import { getTotalWidth, events } from '@/util';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class PublicOrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      key: '',
      record: {},
      tableLoading: true,
      tab: "0",
      filterParams: {},
      pageSize: "20"
    }
    events.on('message', this.collapsedListener); 
  }
  collapsedListener = isClosed => {
		this.setState({leftWidth: isClosed ? 40 : 200});
  }
  componentDidMount() {
     // 获取列表
    this.getList(0, 1, this.state.pageSize);
    const leftSlide = document.getElementsByClassName('ant-layout-sider-trigger')[0];
		const leftWidth = leftSlide && leftSlide.clientWidth;

		this.setState({leftWidth});
  }
  getList = (tab, page, pageSize) => {
    this.setState({
      tableLoading: true
    })
    this.props.actions.getPublicOrderList({
      special_type: tab ? tab : this.state.tab,
      current_page: page ? page : 1,
      page_size: pageSize ? pageSize : this.state.pageSize,
      ...this.state.filterParams
    }).then(() => {
      this.setState({
        tableLoading: false
      })
    }).catch(() => {
      message.error("列表数据加载失败", 2)
      this.setState({
        tableLoading: false
      })
    })
  }
  // tab切换
  changeTab = (tab) => {
    this.setState({
      tab: tab
    })
    this.props.actions.resetPublicOrderList()
    this.getList(tab, 1, this.state.pageSize)
  }
  //弹框出现
  showModal = (params) => {
    let key = params.key
    let data = params.data
    //获取弹框详情
    this.props.actions.resetOrderDetail()
    if (key == "can_cancel_execution_termination_request") {
      //执行终止处理弹框
      this.props.actions.getInterruptExecution({ order_id: data.order_id })
    } else {
      this.props.actions.getOrderDetail({ order_id: data.order_id })
    }
    this.setState({
      key: key,
      visible: true,
      record: { ...data }
    })
  }
  //弹框消失
  handleCancel = () => {
    this.setState({
      key: '',
      visible: false
    })
  }
  //带确认的弹框消失
  handleCancelWithConfirm = () => {
    confirm({
      title: '取消后您的信息将无法保存，是否确认此操作？',
      onOk: () => {
        this.handleCancel()
      }
    });
  }
  //筛选
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let public_advance_payment_apply_created_at_str = ""
        if (values["public_advance_payment_apply_created_at-endTime"]) {
          public_advance_payment_apply_created_at_str = "|" + values["public_advance_payment_apply_created_at-endTime"].format("YYYY-MM-DD")
        }
        if (values["public_advance_payment_apply_created_at-startTime"]) {
          public_advance_payment_apply_created_at_str = values["public_advance_payment_apply_created_at-startTime"].format("YYYY-MM-DD") + public_advance_payment_apply_created_at_str
        }
        values.public_advance_payment_apply_created_at = public_advance_payment_apply_created_at_str
        delete values["public_advance_payment_apply_created_at-endTime"]
        delete values["public_advance_payment_apply_created_at-startTime"]
        let ttp_place_order_at_str = ""
        if (values["ttp_place_order_at-endTime"]) {
          ttp_place_order_at_str = "|" + values["ttp_place_order_at-endTime"].format("YYYY-MM-DD")
        }
        if (values["ttp_place_order_at-startTime"]) {
          ttp_place_order_at_str = values["ttp_place_order_at-startTime"].format("YYYY-MM-DD") + ttp_place_order_at_str
        }
        values.ttp_place_order_at = ttp_place_order_at_str
        delete values["ttp_place_order_at-endTime"]
        delete values["ttp_place_order_at-startTime"]
        Object.values(values).forEach((v, index) => {
          if (v == "0" || v == "") {
            values[Object.keys(values)[index]] = undefined
          }
        })
        this.setState({
          filterParams: { ...values }
        }, () => {
          this.props.actions.resetPublicOrderList()
          this.getList(this.state.tab, 1, this.state.pageSize)
        })
      }
    });
  }
  //分页
  changeTablePage = (page) => {
    this.props.actions.resetPublicOrderList()
    this.getList(this.state.tab, page, this.state.pageSize)
  }
  //选择一页显示多少条
  onShowSizeChange = (current, pageSize) => {
    this.setState({
      pageSize: pageSize
    })
    this.props.actions.resetPublicOrderList()
    this.getList(this.state.tab, 1, pageSize)
  }
  render() {
    const { form, publicOrderList, orderDetail, loginReducer } = this.props
    const { leftWidth } = this.state;
    const { UserConfigKey } = loginReducer
    const { babysitter_host = { value: "" } } = UserConfigKey
    const totalWidth = getTotalWidth(columns({babysitter_host}))
    return <div>
      {/* 第一模块-跳转调账对账周期付款，对接转转 */}
      <StatementComponent />
      {/* 第二模块-包含筛选项和列表 */}
      <div className="publicOrderList-chooseBox publicOrderList-main">
        {/* 筛选项 */}
        <Form layout="inline" className="publicOrderList-form">
          <FilterForm
            form={form}
            filtersConfig={filterFormArr}
            onSubmit={this.onSubmit}
          />
        </Form>
        {/* tab切换及列表 */}
        <Tabs defaultActiveKey={this.state.tab} onChange={this.changeTab}>
          <TabPane tab="全部" key="0"></TabPane>
          <TabPane tab="待执行" key="3"></TabPane>
          <TabPane tab="待贴链接" key="2"></TabPane>
          <TabPane tab="待上传数据截图" key="5"></TabPane>
        </Tabs>
        <Scolltable scrollClassName='.ant-table-body' widthScroll={totalWidth + leftWidth}>
          <Table
            className='public-order-list-table'
            dataSource={Object.keys(publicOrderList).length != 0 ? publicOrderList.items : []}
            columns={columns({ showModal: this.showModal, babysitter_host: babysitter_host })}
            scroll={{ x: totalWidth }}
            loading={this.state.tableLoading}
            pagination={{
              current: Object.keys(publicOrderList).length != 0 ? parseInt(publicOrderList.pagination.current_page) : 0,
              pageSize: Object.keys(publicOrderList).length != 0 ? parseInt(publicOrderList.pagination.page_size) : 0,
              total: Object.keys(publicOrderList).length != 0 ? parseInt(publicOrderList.pagination.total) : 0,
              onChange: this.changeTablePage,
              showSizeChanger: true,
              onShowSizeChange: this.onShowSizeChange,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}

          />
        </Scolltable>
        {/* 弹框组件 */}
        {
          this.state.key == '' ?
            null :
            <ModalComponent
              visible={this.state.visible}
              modalParams={modalParams[this.state.key]}
              handleCancel={this.handleCancel}
              record={this.state.record}
              orderDetail={orderDetail}
              getList={this.getList}
              handleCancelWithConfirm={this.handleCancelWithConfirm}
            ></ModalComponent>
        }
      </div>
    </div>
  }
}

const mapStateToProps = (state) => ({
  publicOrderList: state.publicOrderListReducer.publicOrderList,
  orderDetail: state.publicOrderListReducer.orderDetail,
  loginReducer: state.loginReducer
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...publicOrderListActions
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(PublicOrderList))

