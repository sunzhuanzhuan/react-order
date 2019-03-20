import React, { Component } from 'react';
import { Badge, Icon, Divider, Select, Modal, message, Popconfirm } from 'antd';
import './OrderCard.less';
import IconText from '../base/IconText';
import update from 'immutability-helper';

const Option = Select.Option;
const orderPlatformStatusMap = {
  'modify_status': {
    '1': {
      status: 'default',
      text: '待修改',
      index: '6'
    },
    '2': {
      status: 'success',
      text: '已修改',
      index: '7'
    },
    '3': {
      status: 'success',
      text: '无需修改',
      index: '5'
    }
  },
  'is_finish': {
    '1': {
      status: 'success',
      text: '已完善',
      index: '2'
    },
    '2': {
      status: 'error',
      text: '待完善',
      index: '1'
    }
  },
  'check_status': {
    '1': {
      status: 'processing',
      text: '待审核',
      index: '3'
    },
    '2': {
      status: 'success',
      text: '内审通过',
      index: '4'
    },
    '3': {
      status: 'error',
      text: '内审拒绝',
      index: '4'
    },
    '4': {
      status: 'processing',
      text: '品牌方待审核'
    },
    '5': {
      status: 'success',
      text: '品牌方通过',
      index: '9'
    },
    '6': {
      status: 'error',
      text: '品牌方拒绝',
      index: '8'
    }
  }
};


// 订单结案状态
const OrderSummaryStatus = ({ status, reason }) => {
  let _display = {
    '1': {
      status: 'default',
      text: '待提交内审'
    },
    '2': {
      status: 'processing',
      text: '待内审'
    },
    '3': {
      status: 'processing',
      text: '内审通过'
    },
    '4': {
      status: 'error',
      text: '内审被拒，待修改'
    },
    '5': {
      status: 'processing',
      text: '待品牌方审核'
    },
    '6': {
      status: 'error',
      text: '品牌方审核被拒，待修改'
    },
    '7': {
      status: 'success',
      text: '审核通过'
    }
  };
  let props = _display[status];
  return (
    <div className='head-left'>
      <Badge {...props} />
      {/*<div>原因: balabala</div>*/}
    </div>
  );
};

// 数据完善状态
const OrderPlatformStatus = ({ orderStatus, data }) => {
  let orderStatusToStatus = {
    '1': 'is_finish',
    '2': 'check_status',
    '3': '__none__',
    '4': 'modify_status',
    '5': '__none__',
    '6': '__none__',
    '7': '__none__'
  };
  // ['1待完善' '2已完善' '3待审核' '4已审核' '5无需修改' '6待修改' '7已修改' '8品牌拒绝，待修改' '9审核完成']
  let _display = {
    'modify_status': {
      '1': {
        status: 'default',
        text: '待修改',
        index: '6'
      },
      '2': {
        status: 'success',
        text: '已修改',
        index: '7'
      },
      '3': {
        status: 'success',
        text: '无需修改',
        index: '5'
      }
    },
    'is_finish': {
      '1': {
        status: 'success',
        text: '已完善',
        index: '2'
      },
      '2': {
        status: 'error',
        text: '待完善',
        index: '1'
      }
    },
    'check_status': {
      '1': {
        status: 'processing',
        text: '待审核',
        index: '3'
      },
      '2': {
        status: 'success',
        text: '内审通过',
        index: '4'
      },
      '3': {
        status: 'error',
        text: '内审拒绝',
        index: '4'
      },
      '4': {
        status: 'processing',
        text: '品牌方待审核'
      },
      '5': {
        status: 'success',
        text: '品牌方通过',
        index: '9'
      },
      '6': {
        status: 'error',
        text: '品牌方拒绝',
        index: '8'
      }
    }
  };
  let key = orderStatusToStatus[orderStatus];
  let props = _display[key] && _display[key][data[key]];
  return (
    <div className='card-item-status'>
      {props ? <Badge {...props} /> : null}
    </div>
  );
};

export default class OrderCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      addModal: {}
    };
  }


  addPlatform = () => {
    this.setState(update(this.state, {
      addModal: { loading: { $set: true } }
    }));
    setTimeout(() => {
      message.success(`添加平台${this.state.addModal.platformKey}成功`);
      this.props.actions.addPlatform({
        id: this.props.data.id,
        platform_id: this.state.addModal.platformKey
      });
      this.setState(update(this.state, {
        addModal: { show: { $set: false }, loading: { $set: false } }
      }));
    }, 3000);
  };

  render() {
    const { addModal } = this.state;
    const { orderActions, optional, data, display, actions } = this.props;
    const { add, del, check } = orderActions || {};
    const { platform = [] } = data;
    /*.filter((p) => {  return !platform.find(id => id === p.platform_id)});*/

    return <div className='order-card-container'>
      <header className='order-card-head'>
        {display.orderStatus && <OrderSummaryStatus status={data.summary_status} />}
        <ul className='head-center'>
          <li>订单ID：{data.order_id}</li>
          {data.execution_evidence_code && <li>PO单号：{data.execution_evidence_code}</li>}
          <li>需求名：{data.requirement_name}</li>
          {!data.submitter_at || data.submitter_at === '0000-00-00 00:00:00' ? null :
            <li>{data.submitter_name} 提交于 {data.submitter_at}</li>}
          {!data.internal_check_at || data.internal_check_at === '0000-00-00 00:00:00' ? null :
            <li>内审于 {data.internal_check_at}</li>}
          {!data.external_check_at || data.external_check_at === '0000-00-00 00:00:00' ? null :
            <li>品牌 审核于 {data.external_check_at}</li>}
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
              getPopupContainer={(node) => node.parentNode}
              title={<div>删除后，订单内数据将全部清空。<br />确认删除么?</div>}
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                actions.removeSummaryOrder({ id: data.id });
              }}
            >
              <a id='order-card-container-delete-btn'>
                <Icon type="delete" />
                <span>删除</span>
              </a>
            </Popconfirm>
          }
          {
            check && <a disabled={true}>
              <Icon type="check-circle" />
              <span>提交审核</span>
            </a>
          }
        </div>
      </header>
      <ul className='order-card-main'>
        {
          platform.map(item => {
            let { edit, del, check, view, props } = display.platformConfig(item, data, orderPlatformStatusMap);
            return <li key={item.platform_id + Math.random()}>
              <div className='card-item-type'>
                {item.is_main == 1 ? '主平台' : '分发平台'}{item.is_hand_record == 1 ? '（录入)' : ''}
              </div>
              <div className='card-item-name'>
                <IconText platform={item.platform_id} text={item.weibo_name || '-'} />
              </div>
              {!item.update_at || item.update_at === '0000-00-00 00:00:00' ? null :
                <div className='card-item-info'>
                  {item.modify_name} 提交于{item.update_at}
                </div>}
              <div className='card-item-status'>
                {props ? <Badge {...props} /> : null}
              </div>
              <div className='card-item-actions'>
                {
                  view &&
                  <a onClick={() => this.props.onDetail('view', item, data)}>查看</a>
                }
                {
                  edit &&
                  <a onClick={() => this.props.onDetail('edit', item, data)}>修改</a>
                }
                {
                  del &&
                  [
                    <Divider key={1} type="vertical" />,
                    <Popconfirm key={2}
                      getPopupContainer={(node) => node.parentNode}
                      title='是否确认删除本平台？'
                      okText="确定"
                      cancelText="取消"
                      onConfirm={() => {
                        actions.removePlatform({
                          id: data.id,
                          platform_id: item.platform_id
                        });
                      }}
                    >
                      <a>删除</a>
                    </Popconfirm>

                  ]}
                {
                  check &&
                  [
                    <Divider key={1} type="vertical" />,
                    <a key={2} onClick={() => this.props.onDetail('check', item, data)}>去审核</a>
                  ]
                }
              </div>
            </li>;
          })
        }
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
                disabled={!!platform.find(({ platform_id: id }) => id == option.platform_id)}
                key={option.platform_id}
              >{option.platform_name}</Option>)}
          </Select>
          <div style={{ color: '#999', lineHeight: '32px' }}>如果平台已经存在则不能再次添加</div>
        </div>
      </Modal>}
    </div>;
  }
}
