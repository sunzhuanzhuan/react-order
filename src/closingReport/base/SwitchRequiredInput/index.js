import React, { Component } from 'react';
import { Checkbox, Input, InputNumber } from 'antd';
import './index.less';

const config = {
  '4': 'number',
  '13': 'number',
  '14': 'number',
  '15': 'number',
  '12': 'number',
};

export default class SwitchRequiredInput extends Component {
  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      input: value.input || '',
      checked: value.checked || false
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {})
      };
    }
    return null;
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    if (!('value' in this.props)) {
      this.setState({ input: value });
    }
    this.triggerChange({ input: value });
  };

  handleNumberChange = (value) => {
    if (!('value' in this.props)) {
      this.setState({ input: value });
    }
    this.triggerChange({ input: value });
  };

  handleCheckChange = (e) => {
    const checked = e.target.checked;
    if (!('value' in this.props)) {
      this.setState({ checked, input: '' });
    }
    this.triggerChange({ checked, input: '' });
  };

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { checked, input } = this.state;
    const { width = 420, placeholder = '请输入', type } = this.props;
    let props = {
      style: { width },
      disabled: checked,
      value: input,
      placeholder
    };
    let inputType = type || 'input'
    let inputComponent = null;
    switch (inputType) {
      case 'input':
        inputComponent = <Input {...props}
          onChange={this.handleInputChange}
        />;
        break;
      case 'number':
        inputComponent = <InputNumber {...props}
          onChange={this.handleNumberChange}
          min={1}
          precision={0}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />;
    }
    return <div className='switch-required-input'>
      {inputComponent}
      <Checkbox onChange={this.handleCheckChange} style={checked ? { opacity: 1 } : {}}>无法提供该数据</Checkbox>
    </div>;
  }
}
