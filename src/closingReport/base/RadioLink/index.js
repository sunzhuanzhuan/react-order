import React, { Component } from 'react';
import { Radio, Input } from 'antd';

const RadioGroup = Radio.Group;
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
};
export default class RadioLink extends Component {
  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      link: value.link || '',
      radio: value.radio || 1,
      reference: value.reference || ''
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

  handleLinkChange = (e) => {
    const value = e.target.value;
    if (!('value' in this.props)) {
      this.setState({ link: value });
    }
    this.triggerChange({ link: value });
  };

  handleRadioChange = (e) => {
    const radio = e.target.value;
    if (!('value' in this.props)) {
      this.setState({ radio });
    }
    this.triggerChange({ radio });
  };

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    return <div>
      <RadioGroup onChange={this.handleRadioChange} value={this.state.radio}>
        <Radio style={radioStyle} value={1}>
          参考链接
          <a style={{ marginLeft: 10 }}
             href="http://www.pmdaniu.com/cloud/38867/d5777adf13dd58b78c7…">http://www.pmdaniu.com/cloud/38867/d5777adf13dd58b78c7…</a>
        </Radio>
        <Radio style={radioStyle} value={2}>
          手动输入
          {this.state.radio === 2 ? <Input onChange={this.handleLinkChange} style={{ width: 400, marginLeft: 10 }}/> : null}</Radio>
      </RadioGroup>
    </div>;
  }
}
