/*

*本单使用平台/代理商只有一个

*/

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'antd';
const FormItem = Form.Item;
const SingleAgent = (props) => {
  const { agentDetail, form, agentName, agentId } = props
  const { getFieldDecorator } = form
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
          initialValue: { agentId }
        })(
          <span>{agentName}</span>
        )}
      </FormItem>
      {/* 平台/代理商详情 */}
      <ul>
        <li>{`合作方式：${agentDetail.cooperationType == 1 ? "周期付款" : "其他"}`}</li>
        <li>{agentDetail.cooperation_type == 1 ? `返款比例：${agentDetail.refundRate}` : `说明：${agentDetail.cooperationRemark}`}</li>
        <li>{`收款方式：${agentDetail.paymentType == 1 ? "银行转账" : "支付宝"}`}</li>
        {
          agentDetail.paymentType == 1 ?
            <div>
              <li>开户行:{agentDetail.bank}</li>
              <li>开户支行:{agentDetail.bankAgency}</li>
              <li>开户行所在省:{agentDetail.bankAgencyProvince}</li>
              <li>开户行所在市:{agentDetail.bankAgencyCity}</li>
              <li>开户行账号:{agentDetail.cardNumber}</li>
              <li>开户行户名:{agentDetail.realName}</li>
            </div> :
            <div>
              <li>账号：{agentDetail.alipayAccount}</li>
              <li>收款方姓名：{agentDetail.alipayAccountName}</li>
            </div>
        }

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

