import React from 'react'
import { Col, Radio, Tooltip } from 'antd'
import numeral from 'numeral'

const RadioGroup = Radio.Group;
export default class OrderItem extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }
  handleChange = e => {
    const { data } = this.props;
    const item = data.price.find(item => item.price_id == e.target.value);
    const params = {
      ...item,
      order_id: data.order_id,
      requirement_name: data.requirement_name,
      weibo_type_name: data.weibo_type_name,
      weibo_name: data.weibo_name,
    };
    this.props.handleCheck(data.order_id, params);
  }
  render() {
    const { data, orderMaps } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return <div className='check-order-item'>
      <div className='order-item-title'>
        <div className='title-info'>
          <span>订单ID：</span><span className='primary-font'>{data && data.order_id}</span>
          <span>订单状态：</span><span>{data && data.status_name}</span>
          <span>需求名称：</span><span><a target='_blank' href={data && data.requirement_path}>{data && data.requirement_name}</a></span>
          <span>账号名称：</span><span>{data && data.weibo_name}</span>
          <span>平台：</span><span>{data && data.weibo_type_name}</span>
          <span>执行人：</span><span>{data && data.executor_admin_name}</span>
          <span>项目：</span><span><a target='_blank' href={data && data.project_path}>{data && data.project_name}</a></span>
        </div>
        {data && (data.flag == 2 || data.flag == 3) && <div className='disabled-reason'>
          <Tooltip
            getPopupContainer={() => document.querySelector('.order-item-title')}
            title={data.flag == 2 ? `订单不是【客户待确认】状态` : `订单已经被Spotplan（ID：${data.binding_id}）绑定了`}>不可选原因</Tooltip>
        </div>}
      </div>
      <RadioGroup
        onChange={this.handleChange}
        value={(data && orderMaps[data.order_id] && orderMaps[data.order_id].price_id) || ''}
      >
        {data && data.price.map((item, index) => (<Radio style={radioStyle} key={index} value={item.price_id}
          disabled={!(data && data.flag == 1)}
        >
          <Item data={item} />
        </Radio>))}
      </RadioGroup>
    </div>
  }
}

function Item({ data }) {
  return <div className='order-item-list'>
    <Col className='list-item'>
      <div className='title'>PriceID</div>
      <div>{data && data.price_id}</div>
    </Col>
    <Col className='list-item'>
      <div className='title'>价格名称</div>
      <div>{data && data.price_name}</div>
    </Col>
    <Col className='list-item'>
      <div className='title'>账号报价（应约价）</div>
      <div>{data && numeral(data.cost).format('0,0')}</div>
    </Col>
    <Col className='list-item'>
      <div className='title'>总价（应约价）</div>
      <div>{data && numeral(data.costwithfee).format('0,0')}</div>
    </Col>
  </div>
}
