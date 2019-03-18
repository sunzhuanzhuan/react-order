import React, { Component } from 'react';
import { Badge, Icon, Divider, Select, Modal, message, Popconfirm } from 'antd';
import './OrderCard.less';
import IconText from '../base/IconText';
import update from 'immutability-helper';
import DataDetailsModal from "../containers/DataDetailsModal";

const Option = Select.Option;

export default class OrderCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      addModal: {},
      detailId: ''
    };
  }


  addPlatform = () => {
    this.setState(update(this.state, {
      addModal: { loading: { $set: true } }
    }));
    setTimeout(() => {
      message.success(`添加平台${this.state.addModal.platformKey}成功`);
      this.setState(update(this.state, {
        addModal: { show: { $set: false }, loading: { $set: false } }
      }));
    }, 3000);
  };

  render() {
    const platform = [
      '1', '110', '9'
    ];
    const { addModal } = this.state;
    const { orderActions } = this.props;
    const { add, del, check } = orderActions || {};
    const optional = this.props.source;/*.filter((p) => {
      return !platform.find(id => id === p.platform_id);
    });*/
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
            add && <a onClick={() => this.setState(update(this.state, {
              addModal: { show: { $set: true }, platformKey: { $set: undefined } }
            }))}>
              <Icon type="plus-circle" />
              <span>添加平台</span>
            </a>
          }
          {
            del && <Popconfirm
              getPopupContainer={() => document.querySelector('#order-card-container-delete-btn')}
              title={<div>删除后，订单内数据将全部清空。<br />确认删除么?</div>}
              okText="确定" cancelText="取消">
              <a id='order-card-container-delete-btn'>
                <Icon type="delete" />
                <span>删除</span>
              </a>
            </Popconfirm>
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
            <a onClick={() => this.setState({ detailId: 'xxx' })}>修改</a>
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
            <Divider type="vertical" />
            <a>查看</a>
            <Divider type="vertical" />
            <a>去审核</a>
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
      {add && <Modal
        title="添加平台"
        visible={addModal.show}
        width={420}
        onOk={this.addPlatform}
        onCancel={() => this.setState(update(this.state, {
          addModal: { show: { $set: false } }
        }))}
        okButtonProps={{
          disabled: !addModal.platformKey,
          loading: !!addModal.loading
        }}
      >
        <div>
          <span>选择平台：</span>
          <Select
            placeholder='请选择'
            style={{ width: 300 }}
            showSearch
            optionFilterProp='children'
            onChange={key => this.setState(update(this.state, {
              addModal: { platformKey: { $set: key } }
            }))}
            value={addModal.platformKey}
          >
            {optional.map(option =>
              <Option
                disabled={!!platform.find(id => id === option.platform_id)}
                key={option.platform_id}
              >{option.platform_name}</Option>)}
          </Select>
          <div style={{ color: '#999', lineHeight: '32px' }}>如果平台已经存在则不能再次添加</div>
        </div>
      </Modal>}
      {this.state.detailId ?
        <DataDetailsModal id={this.state.detailId} closed={() => this.setState({ detailId: '' })} /> : null}
    </div>;
  }
}
