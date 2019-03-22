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
        <li>{`合作方式：${agentDetail.cooperation_type == 1 ? "周期付款" : "其他"}`}</li>
        <li>{agentDetail.cooperation_type == 1 ? `返款比例：${agentDetail.refund_rate}` : `说明：${agentDetail.cooperation_remark}`}</li>
        <li>{`收款方式：${agentDetail.payment_type == 1 ? "银行转账" : "支付宝"}`}</li>
        {
          agentDetail.payment_type == 1 ?
            <div>
              <li>开户行:{agentDetail.bank}</li>
              <li>开户支行:{agentDetail.bank_agency}</li>
              <li>开户行所在省:{agentDetail.bank_agency_province}</li>
              <li>开户行所在市:{agentDetail.bank_agency_city}</li>
              <li>开户行账号:{agentDetail.card_number}</li>
              <li>开户行户名:{agentDetail.real_name}</li>
            </div> :
            <div>
              <li>账号：{agentDetail.alipay_account}</li>
              <li>收款方姓名：{agentDetail.alipay_account_name}</li>
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

