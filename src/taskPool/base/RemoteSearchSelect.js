// 搜索下拉选择组件
import React, { Component } from "react";
import { Select, Spin } from "antd";
import debounce from 'lodash/debounce';


const Option = Select.Option

export default class RemoteSearchSelect extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.search = debounce(this.search, 800);
    this.state = {
      data: [],
      value: null,
      searchIng: false
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value
      };
    }
    return null;
  }

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  search = (value) => {
    let { action, wordKey = 'form' } = this.props
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], searchIng: true });
    action({
      "page": { "currentPage": 1, "pageSize": 30 },
      [wordKey]: value
    })
      .then(({ data }) => data.list)
      .then((list) => {
        if (fetchId !== this.lastFetchId) {
          return;
        }
        !this.isUnmount && this.setState({ data: list, searchIng: false });
      })
  }

  handleChange = (value) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value);
  }

  focusEvent = () => {
    if (!this.state.searchIng && !this.state.data.length) {
      this.search('')
    }
  }

  onCancel = () => {
    this.search('')
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.search('')
    }
  }

  componentWillUnmount() {
    this.isUnmount = true
  }

  render() {
    const {
      optionKeys = ['companyName', 'companyId']
    } = this.props;
    const [labelKey, valueKey] = optionKeys
    const { searchIng, data, value } = this.state;
    const options = data.map((item) =>
      <Option key={item[valueKey]}>{item[labelKey]}</Option>)
    return (
      <Select
        {...this.props}
        showSearch
        allowClear
        labelInValue
        filterOption={false}
        value={value}
        notFoundContent={searchIng ? <Spin size="small" /> : undefined}
        onSearch={this.search}
        // onBlur={this.focusEvent}
        // onFocus={this.onCancel}
        onChange={this.handleChange}
      >
        {options}
      </Select>)
  }
}
