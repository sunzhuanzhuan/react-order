/**
 * 带计数显示的输入框
 * Created by lzb on 2019-07-15.
 */
import React, { Component } from "react"
import { Input } from "antd";

export default class InputCount extends Component {
  constructor(props) {
    super(props);

    const value = props.value;
    this.state = {
      value
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value
      };
    }
    return null
  }

  onChange = (event) => {
    let value = event.target.value
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value)
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    const { hideCount, max = 100, ...props } = this.props
    const { value } = this.state
    return <Input
      {...props}
      value={value}
      suffix={
        hideCount ? null :
          <span className='input-suffix-text'>{(value || '').length}/{max}</span>
      }
      onChange={this.onChange}
    />
  }
}
