import React, { Component } from 'react'
import { Checkbox, Input, InputNumber, DatePicker } from 'antd'
import './index.less'
import moment from 'moment'


export default class SwitchRequiredInput extends Component {
  constructor(props) {
    super(props)
    const value = props.value || {}
    this.state = {
      input: value.input || '',
      checked: value.checked || false
    }
  }

  static getDerivedStateFromProps (nextProps) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {})
      }
    }
    return null
  }

  handleInputChange = (e) => {
    const value = e.target.value
    if (!('value' in this.props)) {
      this.setState({ input: value })
    }
    this.triggerChange({ input: value })
  }

  handleInputBlur = (e) => {
    const value = e.target.value
    this.triggerBlur({ input: value })
  }

  handleNumberChange = (value) => {
    // 单独处理为0的情况
    if (value === 0) value = '0'
    if (!('value' in this.props)) {
      this.setState({ input: value })
    }
    this.triggerChange({ input: value })
  }

  handleCheckChange = (e) => {
    const checked = e.target.checked
    if (!('value' in this.props)) {
      this.setState({ checked, input: '' })
    }
    this.triggerChange({ checked, input: '' })
    this.triggerBlur({ checked, input: '' })
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }

  triggerBlur = (changedValue) => {
    const onBlur = this.props.onBlur
    if (onBlur) {
      onBlur(Object.assign({}, this.state, changedValue))
    }
  }

  render () {
    const { checked, input } = this.state
    const { width = 420, placeholder = '请输入', type, disabled } = this.props
    let props = {
      style: { width },
      disabled: checked || disabled,
      value: input,
      placeholder
    }
    let inputType = type || 'input'
    let inputComponent = null
    switch (inputType) {
      case 'input':
        inputComponent = <Input {...props}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
        />
        break
      case 'number':
        inputComponent = <InputNumber {...props}
          onChange={this.handleNumberChange}
          min={0}
          max={9999999999}
          precision={0}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
        break
      case 'datetime':
        inputComponent = <DatePicker {...props}
          onChange={this.handleNumberChange}
          value={moment(input).isValid() ? moment(input) : undefined}
          format="YYYY-MM-DD HH:mm"
          disabledDate={current => {
            const endValue = moment();
            if (!current || !endValue) {
              return false;
            }
            return current.valueOf() > endValue.valueOf();
          }}
          showTime={{
            format: 'HH:mm'
          }}
        />
    }
    return <div className='switch-required-input'>
      {inputComponent}
      <Checkbox disabled={disabled} checked={checked}
        onChange={this.handleCheckChange} style={checked ? { opacity: 1 } : {}}>无法提供该数据</Checkbox>
    </div>
  }
}
