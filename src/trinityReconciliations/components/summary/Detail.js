import React, { Component } from 'react';
import { Row,Col } from 'antd';




export default class SummaryDetailInfo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }


  componentWillMount() {}
 
  render() {
    let {detailSummary}=this.props
    
    return <div>
      
    <Row>汇总单信息</Row>
    <div>
      <Row>
        <Col span={6}> 订单总数: {detailSummary.total_order_amount}</Col>
        <Col span={6}> 调账订单:{detailSummary.adjustment_order} </Col>
        <Col span={6}> 扣减订单: {detailSummary.deduction_order}</Col>
        <Col span={6}> 应实付总金额(元):{detailSummary.total_pay_amount} </Col>
      </Row>
      <Row>
        <Col span={6}> 汇总单金额(元):{detailSummary.total_pay_amount} </Col>
        <Col span={6}> 调账订单总金额(元):{detailSummary.adjustment_amount} </Col>
        <Col span={6}> 扣减总金额(元): {detailSummary.deduction_amount}</Col>
      </Row>
    </div><Row>三方对账单信息</Row>
    <div>
      <Row>
        <Col span={8}> 对账单名称:{detailSummary.statement_name} </Col>
        <Col span={8}> 总金额(元): {detailSummary.bill_total_amount}</Col>
        <Col span={8}> 对账单:{detailSummary.attachment} </Col>
      </Row>
      <Row>
        <Col span={8}> 订单总数{detailSummary.total_order} </Col>
        <Col span={8}>  </Col>
        <Col span={8}>  </Col>
      </Row>
    </div>
    </div>;
  }
}
