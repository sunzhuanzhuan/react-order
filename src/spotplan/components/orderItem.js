import React from 'react'
import { Col, Radio } from 'antd'

const RadioGroup = Radio.Group;
export default class OrderItem extends React.Component {
  constructor() {
    super();
    this.state = {
      value: undefined
    }
  }
  handleChange = e => {
    this.props.handleCheck('123', e.target.value);
    this.setState({ value: e.target.value });
  }
  render() {
    const plainOptions = [
      { 'priceId': 1, 'a': 2, 'b': 3 },
      { 'priceId': 2, 'a': 2, 'b': 3 },
      { 'priceId': 3, 'a': 2, 'b': 3 },
    ];
    const { value } = this.state;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return <div className='check-order-item'>
      <div className='order-item-title'>
        <span>订单ID：</span><span>12345</span>
        <span>订单状态：</span><span >客户待确认</span>
        <span>需求名称：</span><span ><a target='_blank' href='http://192.168.100.142/pack/reservationrequirement/infoforsale?reservation_requirement_id=26684'>(复制)帮宝适一级帮4月种草</a></span>
        <span>账号名称：</span><span >辣爸爸新主张</span>
        <span>平台：</span><span >新浪微博</span>
        <span>执行人：</span><span>蔡逸琦</span>
        <span>项目：</span><span >pampers201900</span>
      </div>
      <RadioGroup
        onChange={this.handleChange}
        value={value}
      >
        {plainOptions.map((item, index) => (<Radio style={radioStyle} key={index} value={item.priceId}>
          <Item />
        </Radio>))}
      </RadioGroup>
    </div>
  }
}

function Item() {
  return <div className='order-item-list'>
    <Col className='list-item'>
      <div className='title'>PriceID</div>
      <div>408551</div>
    </Col>
    <Col className='list-item'>
      <div className='title'>价格名称</div>
      <div>直发+原创视频+微任务+真人出镜+内容授权</div>
    </Col>
    <Col className='list-item'>
      <div className='title'>账号报价（应约价）</div>
      <div>170,213.00</div>
    </Col>
    <Col className='list-item'>
      <div className='title'>总价（应约价）</div>
      <div>188,545.00</div>
    </Col>
  </div>
}
