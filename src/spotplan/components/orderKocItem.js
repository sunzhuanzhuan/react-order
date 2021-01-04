import React from 'react'
import { Col, Checkbox, Tooltip } from 'antd'
import numeral from 'numeral'

export default class OrderKocItem extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }
  handleChange = e => {
    console.log(e.target.checked)
    const { data } = this.props;
    const item = data.price.find(item => item.price_id == e.target.value);
    const params = {
      ...item,
      order_id: data.order_id,
      requirement_name: data.requirement_name,
      weibo_type_name: data.weibo_type_name,
      weibo_name: data.weibo_name,
    };
    if (e.target.checked) {
      this.props.handleCheckKoc(1, data.order_id, params);
    } else {
      this.props.handleCheckKoc(2, data.order_id, params);
    }
  }
  render() {
    const { data, orderMapsKoc } = this.props;
    return <div className='check-order-item'>
      <div className='order-item-title'>
        <div className='title-info'>
          <span>订单ID:</span><span className='primary-font'>{data && data.order_id}</span>
          <span>订单状态:</span><span>{data && data.status_name}</span>
          <span>需求名称:</span><span><a target='_blank' href={data && data.requirement_path}>{data && data.requirement_name}</a></span>
          <span>账号名称:</span><span>{data && data.weibo_name}</span>
          <span>平台:</span><span>{data && data.weibo_type_name}</span>
          <span>执行人:</span><span>{data && data.executor_admin_name}</span>
          <span>项目:</span><span><a target='_blank' href={data && data.project_path}>{data && data.project_name}</a></span>
        </div>
        {data && (data.flag == 2 || data.flag == 3) && <div className='disabled-reason'>
          <Tooltip
            getPopupContainer={() => document.querySelector('.order-item-title')}
            title={data.flag == 2 ? `账号尚未应约` : `订单已经被Spotplan（ID：${data.binding_id}）绑定了`}>不可选原因</Tooltip>
        </div>}
      </div>
      {data && data.price.map((item, index) => (<Checkbox
        checked={(data && orderMapsKoc[data.order_id] && (orderMapsKoc[data.order_id].price_id == item.price_id)) || false}
        key={index} value={item.price_id}
        disabled={!(data && data.flag == 1)} onChange={this.handleChange}
      >
        <Item data={item} />
      </Checkbox>))}
    </div>
  }
}

function Item({ data }) {
  return <table className='item-table'>
    <thead>
      <tr>
        <th>PriceID</th>
        <th style={{ minWidth: '600px' }}>价格名称</th>
        <th style={{ minWidth: '160px' }}>账号报价（应约价）</th>
        <th style={{ minWidth: '160px' }}>总价（应约价）</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{data && data.price_id}</td>
        <td style={{ minWidth: '600px' }}>{data && data.price_name}</td>
        <td style={{ minWidth: '160px' }}>{data && numeral(data.cost).format('0,0')}</td>
        <td style={{ minWidth: '160px' }}>{data && numeral(data.costwithfee).format('0,0')}</td>
      </tr>
    </tbody>
  </table>
}
