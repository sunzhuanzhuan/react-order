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
    
    return <div>
      
    <Row>汇总单信息</Row>
    <div>
      <Row>
        <Col span={6}> 订单总数: </Col>
        <Col span={6}> 调账订单: </Col>
        <Col span={6}> 扣减订单: </Col>
        <Col span={6}> 应实付总金额(元): </Col>
      </Row>
      <Row>
        <Col span={6}> 汇总单金额(元): </Col>
        <Col span={6}> 调账订单总金额(元): </Col>
        <Col span={6}> 扣减总金额(元): </Col>
      </Row>
    </div><Row>三方对账单信息</Row>
    <div>
      <Row>
        <Col span={8}> 对账单名称: </Col>
        <Col span={8}> 总金额(元): </Col>
        <Col span={8}> 对账单: </Col>
      </Row>
      <Row>
        <Col span={8}> 订单总数 </Col>
        <Col span={8}>  </Col>
        <Col span={8}>  </Col>
      </Row>
    </div>
    </div>;
  }
}
