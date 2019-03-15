import React, { Component } from 'react';
import { Badge, Icon, Divider, Select, Modal } from 'antd';
import './OrderCard.less';
import IconText from '../base/IconText';
const Option = Select.Option;

export default class OrderCard extends Component {
  componentWillMount() {}

  addPlatform = () => {

  };

  render() {
    const { orderActions } = this.props;
    const { add, del, check } = orderActions || {};

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
          {
            add && <a>
              <Icon type="plus-circle" />
              <span>添加平台</span>
            </a>
          }
          {
            del && <a>
              <Icon type="delete" />
              <span>删除</span>
            </a>
          }
          {
            check && <a>
              <Icon type="check-circle" />
              <span>提交审核</span>
            </a>
          }
        </div>
      </header>
      <ul className='order-card-main'>
        <li>
          <div className='card-item-type'>
            主平台
          </div>
          <div className='card-item-name'>
            <IconText platform={'1'} text={'账号名账号名账号名账号名账号名账号名'} />
          </div>
          <div className='card-item-status'>
            <Badge status="success" text="成功" />
          </div>
          <div className='card-item-actions'>
            <a>修改</a>
            <Divider type="vertical" />
            <a>删除</a>
          </div>
        </li>
        <li>
          <div className='card-item-type'>
            分发平台（录入)
          </div>
          <div className='card-item-name'>
            <IconText platform={'110'} text={'账号名账号名账号名'} />
          </div>
          <div className='card-item-info'>
            王小丫 提交于2019-01-02 09:11
          </div>
          <div className='card-item-status'>
            <Badge status="success" text="成功" />
          </div>
          <div className='card-item-actions'>
            <a>删除</a>
          </div>
        </li>
        <li>
          <div className='card-item-type'>
            分发平台
          </div>
          <div className='card-item-name'>
            <IconText platform={'9'} text={'账号名账号名账号名'} />
          </div>
          <div className='card-item-info'>
            王小丫 提交于2019-01-02 09:11
          </div>
          <div className='card-item-status'>
          </div>
          <div className='card-item-actions'>
            <a>修改</a>
          </div>
        </li>
      </ul>
      <Modal
        title="添加平台"
        visible={false}
      >
        <div>
          <span>选择平台：</span>
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
      </Modal>
    </div>;
  }
}
