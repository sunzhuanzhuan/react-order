import React, { Component } from 'react';
import { Checkbox, Input } from 'antd';
import './index.less';

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
    const { width = 420, placeholder = '请输入' } = this.props;
    return <div className='switch-required-input'>
      <Input style={{ width }} disabled={checked} value={input} onChange={this.handleInputChange} placeholder={placeholder} />
      <Checkbox onChange={this.handleCheckChange} style={checked ? {opacity: 1} : {}}>无法提供该数据</Checkbox>
    </div>;
  }
}
