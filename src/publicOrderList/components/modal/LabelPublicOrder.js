/*

*这是标为三方已下单弹框内容组件

*/
import React, { Component } from 'react'
import { Form, Button } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PlaceOrderTime from './formItem/PlaceOrderTime'
import SingleAgent from './formItem/SingleAgent'
import MultiAgent from './formItem/MultiAgent'
import './ModalComponent.less'

class LabelPublicOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount() {

  }
  //提交-标为三方已下单
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { form, handleCancel } = this.props
    return <div className="modalBox">
      <Form layout="inline">
        {/* 下单时间 */}
        <PlaceOrderTime
          form={form}
          type="can_label_place_order"
        />
        {/* 本单只有一个平台/代理商 */}
        {/* <SingleAgent
          form={form}
        /> */}
        {/* 多个平台/代理商 */}
        <MultiAgent
          form={form}
        />
      </Form>
      {/* 提交按钮 */}
      <div className="modalBox-btnGroup">
        <Button type="primary" onClick={this.submit}>提交</Button>
        <Button type="primary"
          className="modalBox-btnGroup-cancel"
          onClick={handleCancel}
        >取消</Button>
      </div>
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

