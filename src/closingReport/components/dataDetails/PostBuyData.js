import React, { Component } from 'react'
import { Form, Popconfirm } from 'antd'
import './index.less'
import SwitchRequiredInput from '../../base/SwitchRequiredInput'
import DataModuleHeader from '../../base/DataModuleHeader'
import { Against } from '../../base/ApprovalStatus'
import DataFieldFormat from '../../base/DataFieldFormat'
import { fieldConfig } from '../../constants/config'
const itemConfig = [
  { id: 23, display: "流量宝名称", needed: 1, required: 2, value: null, checked: 2 },
  { id: 24, display: "流量宝ID", needed: 1, required: 2, value: null, checked: 2 },
  { id: 25, display: "流量宝链接", needed: 1, required: 2, value: null, checked: 2 }
]

/**
 * 流量宝信息(编辑)
 */
export class Edit extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      currentData: props.data && props.data.data.length
        ? props.data.data : []
    }
    this.count = 0
  }
  checkSwitchInput = () => (rule, value = {}, callback) => {
    if (rule.require === 2 || value.input || value.checked) {
      callback()
      return
    }
    callback(rule.message)
  }
  validatorUrl = link_prefix => (rule, value, callback) => {
    if (!link_prefix || value.checked || !value.input) {
      return callback()
    }
    if (link_prefix.some(pre => new RegExp('^' + pre).test(value.input))) return callback()
    callback('请输入正确的链接')
  }

  onBlur = (i, n) => (changeData) => {
    let tmp = [...this.state.currentData]
    tmp[i][n] = {
      ...tmp[i][n],
      value: changeData.input,
      checked: changeData.checked ? 1 : 2
    }
    this.setState({
      currentData: [
        ...tmp
      ]
    })
  }

  /**
   * 
   * 新增一组流量宝
   * 
  */
  addNew = () => {
    this.setState({
      currentData: [
        ...this.state.currentData,
        [
          ...itemConfig
        ]
      ]
    })
  }

  /**
   * 
   * 删除一组流量宝
   * 
  */
  deleteData = (n) => () => {
    let tmp = [...this.state.currentData]
    tmp.splice(n, 1)

    this.setState({
      currentData: []
    }, () => {
      this.setState({
        currentData: [
          ...tmp
        ]
      })
    })
  }

  render () {
    this.count += 1
    const { getFieldDecorator } = this.props.form
    const { currentData } = this.state
    const reason = parseInt(this.props.data.status) === 2 ?
      <Against reason={this.props.data.reason} /> : null
    return <div className='platform-data-detail-module base-info'>
      <DataModuleHeader title='流量宝信息' extra={reason} />
      <div style={{ paddingTop: '10px' }}>
        {
          currentData.map((v, i) => {
            return <div key={i} className='post-buy-data-item-wrap'>
              {
                currentData.length > 1 ?
                  <div className='delete-data-wrap'>
                    <Popconfirm
                      title="你确定要删除这组流量宝吗?"
                      onConfirm={this.deleteData(i)}
                      placement="topRight"
                      autoAdjustOverflow={false}
                      getPopupContainer={(node) => node.parentNode}
                    >
                      <a>删除改组</a>
                    </Popconfirm> </div> : null
              }
              {
                v.map((item, n) => {
                  return <Form.Item key={item.id + item.value + item.checked}
                    label={item.display} {...this.props.formItemLayout}>
                    {getFieldDecorator(`ecom_tracking_data[${i}][${n}]`, {
                      initialValue: { id: item.id, input: item.value, checked: item.checked === 1 },
                      validateFirst: true,
                      validateTrigger: ['onChange'],
                      rules: [
                        {
                          validator: this.checkSwitchInput(),
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
                        onBlur={this.onBlur(i, n)}
                      />
                    )}
                  </Form.Item>
                })
              }
            </div>
          })
        }
      </div>
      <a onClick={this.addNew} style={{ textAlign: 'right', display: 'block' }}>+新增一组流量宝</a>
    </div>
  }
}

/**
 * 流量宝信息(查看)
 */
export class View extends Component {
  render () {
    const { data: { data = [] } } = this.props
    return <div className='platform-data-detail-module base-info read'>
      <div className='read-left-head'>
        流量宝信息
      </div>
      <div className='read-right-data'>
        {
          data.map((v, i) => {
            return <div key={i} className='post-buy-date-item-wrap'>
              {
                v.map(item => {
                  return <p key={item.id}>
                    <span className='title'>{item.display}：</span>
                    {
                      item.id === 25 ? (
                        item.checked === 1 ? <span className='value'>无法提供该数据</span> :
                          <a className='value' target="_blank" href={item.value}>{item.value || '-'}</a>
                      ) :
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
