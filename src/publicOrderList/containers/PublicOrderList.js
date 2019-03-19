import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table } from 'antd';
import StatementComponent from '../components/StatementComponent'
import './PublicOrderList.less'

class PublicOrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return <div>
      {/* 第一模块 */}
      <StatementComponent />
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
)(PublicOrderList)

