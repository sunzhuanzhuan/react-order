import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Tabs, Table } from 'antd';
import StatementComponent from '../components/StatementComponent'
import FilterForm from '../components/filter/FilterForm'
import { filterFormArr, columns } from '../contants/config'
import './PublicOrderList.less'
const TabPane = Tabs.TabPane;

class PublicOrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  // tab切换
  changeTab = (key) => {
    console.log(key)
  }
  render() {
    const { form } = this.props
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
          />
        </Form>
        {/* tab切换及列表 */}
        <Tabs defaultActiveKey="1" onChange={this.changeTab}>
          <TabPane tab="全部" key="1"></TabPane>
          <TabPane tab="待执行" key="2"></TabPane>
          <TabPane tab="待贴链接" key="3"></TabPane>
          <TabPane tab="待上传数据截图" key="4"></TabPane>
        </Tabs>
        <Table dataSource={[]} columns={columns} />
      </div>
    </div>
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({

  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(PublicOrderList))

