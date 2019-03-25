import React, { Component } from 'react'
import { Badge, Icon, Divider, Select, Modal, message, Popconfirm } from 'antd'
import './OrderCard.less'
import IconText from '../base/IconText'
import update from 'immutability-helper'
import OrderSummaryStatus from '../base/OrderSummaryStatus'
import { datetimeValidate } from '../util'

const Option = Select.Option
const orderPlatformStatusMap = {
  'modify_status': {
    '1': {
      status: 'error',
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
}


export default class OrderCard extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      addModal: {}
    }
  }


  addPlatform = () => {
    this.setState(update(this.state, {
      addModal: { loading: { $set: true } }
    }))
    const { actions, data, companySource } = this.props
    actions.addSummaryPlatform({
      'summary_id': companySource.summaryId,
      'order_id': data.order_id,
      'platform_id': this.state.addModal.platformKey
    }).then(() => {
      actions.addPlatform({
        id: this.props.data.id,
        platform_id: this.state.addModal.platformKey
      })
      message.success(`添加成功`)
      this.setState(update(this.state, {
        addModal: { show: { $set: false }, loading: { $set: false } }
      }))
    }).catch(() => {
      this.setState(update(this.state, {
        addModal: { loading: { $set: false } }
      }))
    })
  }

  removePlatform = (id, order_id, platform_id) => {
    const hide = message.loading('删除中...', 0)
    this.props.actions.deleteSummaryPlatform({
      order_id, platform_id
    }).then(() => {
      this.props.actions.removePlatform({
        id,
        platform_id
      })
    }).finally(hide)
  }

  removeOrder = (id, order_id, summary_id = this.props.companySource.summaryId) => {
    const hide = message.loading('删除中...', 0)
    this.props.actions.deleteSummaryOrder({
      order_id, summary_id
    }).then(() => {
      this.props.actions.removeSummaryOrder({ id })
    }).finally(hide)
  }

  // 提交审核
  submitCheck = (data, successCallback) => {
    const { actions } = this.props
    Modal.confirm({
      title: '是否确认将本订单的投放数据提交审核？',
      onOk: hide => {
        return actions.submitCheckSummaryByOrder({ order_id: data.order_id }).then(() => {
          message.success('提交审核成功!')
          successCallback && successCallback()
        }).finally(hide)
      }
    })

  }

  render() {
    const { addModal } = this.state
    const { orderActions, optional, data, display, actions } = this.props
    const { add, del, check } = display.orderActions(data) || {}
    const { platform = [] } = data
    /*.filter((p) => {  return !platform.find(id => id === p.platform_id)});*/

    return <div className='order-card-container'>
      <header className='order-card-head'>
        {display.orderStatus &&
        <OrderSummaryStatus status={data.summary_status} reason={data.externa_reason} />}
        <ul className='head-center'>
          <li>订单ID：{data.order_id}</li>
          {data.execution_evidence_code && <li>PO单号：{data.execution_evidence_code}</li>}
          <li>需求名：{data.requirement_name}</li>
          {display.dateTimeRecord && datetimeValidate(data.submitter_at) &&
          <li>{data.submitter_name} 提交于 {data.submitter_at}</li>}
          {display.dateTimeRecord && datetimeValidate(data.internal_check_at) &&
          <li>内审于 {data.internal_check_at}</li>}
          {display.dateTimeRecord && datetimeValidate(data.external_check_at) &&
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
                this.removeOrder(data.id, data.order_id)
              }}
            >
              <a id='order-card-container-delete-btn'>
                <Icon type="delete" />
                <span>删除</span>
              </a>
            </Popconfirm>
          }
          {
            check &&
            <a onClick={() => this.submitCheck(data, check.callback)} disabled={check.disabled}>
              <Icon type="check-circle" />
              <span>提交审核</span>
            </a>
          }
        </div>
      </header>
      <ul className='order-card-main'>
        {
          platform.map(item => {
            let { edit, del, check, view, props } = display.platformConfig(item, data, orderPlatformStatusMap)
            return <li key={item.platform_id}>
              <div className='card-item-type'>
                {item.is_main == 1 ? '主平台' : '分发平台'}{item.is_hand_record == 1 ? '（录入)' : ''}
              </div>
              <div className='card-item-name'>
                <IconText platform={item.platform_id} text={item.weibo_name || '-'} />
              </div>
              {datetimeValidate(item.update_at) &&
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
                        this.removePlatform(data.id, data.order_id, item.platform_id)
                      }}
                    >
                      <a>删除</a>
                    </Popconfirm>

                  ]}
                {
                  check &&
                  <a onClick={() => this.props.onDetail('check', item, data)}>去审核</a>
                }
              </div>
            </li>
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
    </div>
  }
}
