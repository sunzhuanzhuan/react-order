import React, { Component } from 'react';
import { Badge, Icon } from 'antd';
import { WBYPlatformIcon } from 'wbyui';
import './OrderCard.less';

export default class OrderCard extends Component {
  componentWillMount() {}

  render() {
    return <div className='order-card-container'>
      <header className='order-card-head'>
        <div className='head-left'>
          <Badge status="success" text="审核通过" />
          {/*<div>原因: balabala</div>*/}
        </div>
        <ul className='head-center'>
          <li>订单ID：1234556</li>
          <li>PO单号：1233567</li>
          <li>需求名：需求名称1</li>
          {/*<li>王小丫 提交于2019-01-02  09:11</li>*/}
        </ul>
        <div className='head-right'>
          <a>
            <Icon type="plus-circle" />
            <span>添加平台</span>
          </a>
          <a>
            <Icon type="delete" />
            <span>删除</span>
          </a>
          <a>
            <span>提交审核</span>
          </a>
        </div>
      </header>
      <ul className='order-card-main'>
        <li>
          <div className='card-item-type'>
            主平台
          </div>
          <div className='card-item-name'>
            <WBYPlatformIcon weibo_type='1' widthSize={22}/>
            <span>账号名账号名账号名</span>
          </div>
          <div className='card-item-status'>
            <Badge status="success" text="成功" />
          </div>
          <div className='card-item-actions'>
            <a>修改</a>
            <a>删除</a>
          </div>
        </li>
        <li>
          <div className='card-item-type'>
            分发平台（录入)
          </div>
          <div className='card-item-name'>
            <WBYPlatformIcon weibo_type='110' widthSize={22}/>
            <span>账号名账号名账号名账号名账号名</span>
          </div>
          <div className='card-item-info'>
            王小丫 提交于2019-01-02 09:11
          </div>
          <div className='card-item-status'>
            <Badge status="success" text="成功" />
          </div>
          <div className='card-item-actions'>
            <a>修改</a>
            <a>删除</a>
          </div>
        </li>
        <li>
          <div className='card-item-type'>
            分发平台
          </div>
          <div className='card-item-name'>
            <WBYPlatformIcon weibo_type='9' widthSize={22}/>
            <span>账号名账号名账号名账号名账号名</span>
          </div>
          <div className='card-item-info'>
            王小丫 提交于2019-01-02 09:11
          </div>
          <div className='card-item-status'>
          </div>
          <div className='card-item-actions'>
            <a>修改</a>
            <a>删除</a>
          </div>
        </li>
      </ul>
    </div>;
  }
}
