/* 

*这是修改三方已下单组件

*/
import React, { Component } from 'react'
import { Form } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './ModalComponent.less'

const FormItem = Form.Item;

class ModifyPublicOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    return <div>
      111
    </div>
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({

  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ModifyPublicOrder))

