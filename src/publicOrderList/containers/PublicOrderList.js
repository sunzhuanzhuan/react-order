import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Tabs, Table } from 'antd';
import StatementComponent from '../components/StatementComponent'
import FilterForm from '../components/filter/FilterForm'
import ModalComponent from '../components/modal/ModalComponent'
import { filterFormArr, columns, modalParams } from '../contants/config'
import * as publicOrderListActions from '../actions/publicOrderListActions'
import './PublicOrderList.less'
import { id } from 'postcss-selector-parser';
const TabPane = Tabs.TabPane;

class PublicOrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      key: '',
      record: {}
    }
  }
  componentWillMount() {
    // 获取列表
    this.props.actions.getPublicOrderList()
  }
  // tab切换
  changeTab = (tab) => {
    console.log(tab)
  }
  //弹框出现
  showModal = (params) => {
    let key = params.key
    let data = params.data
    //获取弹框详情
    this.props.actions.resetOrderDetail()
    this.props.actions.getOrderDetail({ order_id: data.order_id })
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
        console.log(values)
      }
    });
  }
  render() {
    const { form, publicOrderList, orderDetail, loginReducer } = this.props
    const { UserConfigKey } = loginReducer
    const { babysitter_host = { value: "" } } = UserConfigKey
    return <div>
      {/* 第一模块-跳转调账对账周期付款，对接转转 */}
      <StatementComponent />
      {/* 第二模块-包含筛选项和列表 */}
      <div className="publicOrderList-chooseBox publicOrderList-main">
        {/* 筛选项 */}
        <Form layout="inline">
          <FilterForm
            form={form}
            filtersConfig={filterFormArr}
            onSubmit={this.onSubmit}
          />
        </Form>
        {/* tab切换及列表 */}
        <Tabs defaultActiveKey="1" onChange={this.changeTab}>
          <TabPane tab="全部" key="1"></TabPane>
          <TabPane tab="待执行" key="2"></TabPane>
          <TabPane tab="待贴链接" key="3"></TabPane>
          <TabPane tab="待上传数据截图" key="4"></TabPane>
        </Tabs>
        <Table
          dataSource={Object.keys(publicOrderList).length != 0 ? publicOrderList.items : []}
          columns={columns({ showModal: this.showModal, babysitter_host: babysitter_host })}
          scroll={{ x: 3000 }}
        />
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

