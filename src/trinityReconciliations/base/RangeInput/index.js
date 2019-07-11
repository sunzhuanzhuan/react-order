import React, { Component } from 'react';
import { InputNumber } from 'antd';

export default class RangeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: (nextProps.value || [])
      };
    }
    return null;
  }

  onChange = (index) => (val) => {
    let value = [...this.state.value];
    value[index] = val;
    this.setState({ value }, () => {
      this.props.onChange && this.props.onChange(value);
    });
  };

  render() {
    const { value } = this.state;
    return <div>
      <InputNumber placeholder={this.props.placeholder} value={value[0]} min={0} max={1999999999} onChange={this.onChange(0)} />
      <b>-</b>
      <InputNumber placeholder={this.props.placeholder} value={value[1]} min={0} max={1999999999} onChange={this.onChange(1)} />
    </div>;
  }
}
