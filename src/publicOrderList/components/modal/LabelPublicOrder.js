/*

*这是标为三方已下单弹框内容组件

*/
import React, { Component } from 'react'
import { Form } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PlaceOrderTime from './formItem/PlaceOrderTime'
import './ModalComponent.less'

class LabelPublicOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount() {

  }
  render() {
    const { form } = this.props
    return <div className="modalBox">
      <Form layout="inline">
        {/* 下单时间 */}
        <PlaceOrderTime
          form={form}
          type="can_label_place_order"
        />
      </Form>
    </div>
  }
}

const mapStateToProps = () => {
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
)(Form.create()(LabelPublicOrder))

