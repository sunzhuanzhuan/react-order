import React, { Component } from 'react'
import { Form } from 'antd'
import './index.less'
import DataModuleHeader from '../../base/DataModuleHeader'
import RadioLink from '../../base/RadioLink'
import { Against } from '../../base/ApprovalStatus'

/**
 * 执行链接(编辑)
 */
export class Edit extends Component {
  checkRadioLink = (rule, value = {}, callback) => {
    if (value.radio === 1 || value.link) {
      callback()
      return
    }
    callback('必填!')
  }
  validatorUrl = link_prefix => (rule, value, callback) => {
    if (!link_prefix || value.radio === 1) {
      return callback()
    }
    if (link_prefix.some(pre => new RegExp('^' + pre).test(value.link))) return callback()
    callback('请输入正确的链接')
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { data: { data = [] } } = this.props
    const reason = parseInt(this.props.data.status) === 2 ?
      <Against reason={this.props.data.reason} /> : null
    return data.length ? <div className='platform-data-detail-module execution-link'>
      <DataModuleHeader title='执行链接' extra={reason} />
      <div style={{ paddingTop: '10px' }}>
        {
          data.map((item, n) => {
            return <Form.Item key={item.id} colon={false} label=" " {...this.props.formItemLayout}>
              {getFieldDecorator(`execution_link[${n}]`, {
                initialValue: {
                  id: item.id,
                  link: item.value,
                  radio: item.radio || (item.reference ? 1 : 2),
                  reference: item.reference
                },
                validateFirst: true,
                rules: [
                  { validator: this.checkRadioLink, message: `请输入${item.display}!` },
                  { validator: this.validatorUrl(item.link_prefix) }
                ]
              })(<RadioLink />)}
            </Form.Item>
          })
        }
      </div>
    </div> : null
  }
}

/**
 * 执行链接(查看)
 */
export class View extends Component {
  render() {
    const { data: { data = [] } } = this.props
    return data.length ? <div className='platform-data-detail-module execution-link read'>
      <div className='read-left-head'>
        执行链接
      </div>
      <div className='read-right-data'>
        {
          data.map(item => {
            return <p key={item.id}>
              <span className='title' />
              <a className='value' target='_blank' href={item.value}>{item.value}</a>
            </p>
          })
        }
      </div>
      {this.props.children}
    </div> : null
  }
}

export default {
  Edit,
  View
}
