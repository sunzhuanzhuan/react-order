/**
 * Created by lzb on 2019-12-20.
 */
import React, {} from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

export class CheckGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value || []
      };
    }
    return null
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  onChange = (value) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value)
  };

  onCheckAllChange = e => {
    this.onChange(this.props.options.map(item => item.value))
  };

  render() {
    return (
      this.props.options.length > 0 ? <div>
        <a onClick={this.onCheckAllChange} style={{ marginRight: 20 }}>
          不限
        </a>
        <CheckboxGroup
          options={this.props.options}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div> : null
    );
  }
}
