/*

*本单使用平台/代理商只有一个

*/

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'antd';
const FormItem = Form.Item;
const SingleAgent = (props) => {
  const { getFieldDecorator } = props.form
  return (
    <div className="modalBox-singleAgent">
      <FormItem
        label="本单使用平台/代理商"
        layout={{
          labelCol: { span: 7 },
          wrapperCol: { span: 17 }
        }}
        style={{ width: '500px' }}
      >
        {getFieldDecorator("agent_id", {
          rules: [{
            required: true, message: '本项为必选项，请选择！',
          }],
          initialValue: "1"
        })(
          <span>代理商A</span>
        )}
      </FormItem>
      {/* 平台/代理商详情 */}
      <ul>
        <li>合作方式：周期返款</li>
        <li>返款比例：10%</li>
        <li>收款方式：支付宝</li>
        <li>账号：123456789</li>
        <li>收款方姓名：XXX</li>
      </ul>
    </div>
  )
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
)(SingleAgent)

