/*

*这是代理商详情组件

*/
import React from 'react';
import './formItem.less'
const AgentDetail = (props) => {
  const { agentDetail } = props
  return (
    <ul className="agentDetail">
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
  )
}

export default AgentDetail
