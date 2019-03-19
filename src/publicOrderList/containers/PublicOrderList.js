import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form } from 'antd';
import StatementComponent from '../components/StatementComponent'
import FilterForm from '../components/filter/FilterForm'
import { filterFormArr } from '../contants/config'
import './PublicOrderList.less'

class PublicOrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
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

