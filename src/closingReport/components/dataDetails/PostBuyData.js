import React, { Component } from 'react'
import { Form } from 'antd'
import './index.less'
import SwitchRequiredInput from '../../base/SwitchRequiredInput'
import DataModuleHeader from '../../base/DataModuleHeader'
import { Against } from '../../base/ApprovalStatus'
import DataFieldFormat from '../../base/DataFieldFormat'
import { fieldConfig } from '../../constants/config'


/**
 * 流量宝信息(编辑)
 */
export class Edit extends Component {
  checkSwitchInput = (rule, value = {}, callback) => {
    if (rule.require === 2 || value.input || value.checked) {
      callback()
      return
    }
    callback(rule.message)
  }
  validatorUrl = link_prefix => (rule, value, callback) => {
    if (!link_prefix || value.checked || !value.input ) {
      return callback()
    }
    if (link_prefix.some(pre => new RegExp('^' + pre).test(value.input))) return callback()
    callback('请输入正确的链接')
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { data = [] } = this.props.data || {}
    const reason = parseInt(this.props.data.status) === 2 ?
      <Against reason={this.props.data.reason} /> : null
    return <div className='platform-data-detail-module base-info'>
      <DataModuleHeader title='流量宝信息' extra={reason} />
      <div style={{ paddingTop: '10px' }}>
        {
          data.map((item, n) => {
            return <Form.Item key={item.id} label={item.display} {...this.props.formItemLayout}>
              {getFieldDecorator(`ecom_tracking_data[${n}]`, {
                initialValue: { id: item.id, input: item.value, checked: item.checked === 1 },
                validateFirst: true,
                validateTrigger: [ 'onChange' ],
                rules: [
                  {
                    validator: this.checkSwitchInput,
                    message: `请输入${item.display}!`,
                    pattern: /^.{1,5}&/,
                    require: item.required
                  },
                  { validator: this.validatorUrl(item.link_prefix) }
                ]
              })(
                <SwitchRequiredInput
                  placeholder={`请输入${item.display}`}
                  type={fieldConfig(item.id)}
                />
              )}
            </Form.Item>
          })
        }
      </div>
    </div>
  }
}

/**
 * 流量宝信息(查看)
 */
export class View extends Component {
  render() {
    const { data: { data = [] } } = this.props
    return <div className='platform-data-detail-module base-info read'>
      <div className='read-left-head'>
        流量宝信息
      </div>
      <div className='read-right-data'>
        {
          data.map(item => {
            return <p key={item.id}>
              <span className='title'>{item.display}：</span>
              {
                item.link_prefix || item.id === 25 ?
                  <a className='value' target="_blank" href={item.value}>{item.value || '-'}</a> :
                  <span className='value' title={item.value}>
                    <DataFieldFormat
                      not
                      value={item.checked === 1 ? '无法提供该数据' : item.value}
                    />
                  </span>
              }
            </p>
          })
        }
      </div>
      {this.props.children}
    </div>
  }
}

export default {
  Edit,
  View
}
