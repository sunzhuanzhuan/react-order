/*
 * @Descripttion:
 * @Author: wangxinyue
 * @Date: 2020-01-08 16:29:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-10 17:47:47
 */
import React from 'react';
import api from '@/api';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
const { Option } = Select;
const baseParam = {
  page: {
    currentPage: 1,
    pageSize: 20
  },
  form: {}
};
class SelectSearch extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.getData = debounce(this.getData, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false
  };
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return {
        value: props.value
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.setState({ value: this.state.value });
    }
  }
  getData = value => {
    const {
      searchKey = '',
      url = '/operator-gateway/accountMapping/v2/selectUserAndMediaByUserName',
      searchProps = {}
    } = this.props;
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    api
      .post(url, { ...baseParam, form: { [searchKey]: value, ...searchProps } })
      .then(({ data }) => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        this.setState({ data: data.list || [], fetching: false });
      });
  };

  handleChange = value => {
    const { onChange } = this.props;
    this.setState({
      value,
      data: [],
      fetching: false
    });
    onChange && onChange(value);
  };

  render() {
    const { fetching, data, value, placeholder = '请输入并选择' } = this.state;
    const { searchKey, idKey = 'identityId', seleteNameKey } = this.props;
    return (
      <Select
        allowClear
        labelInValue
        value={value}
        showSearch={true}
        placeholder={placeholder}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.getData}
        // onFocus={this.getData}
        onChange={this.handleChange}
        style={{ width: '100%', minWidth: 174 }}
      >
        {data.map((d, index) => (
          <Option key={d[idKey]}>{d[seleteNameKey || searchKey]}</Option>
        ))}
      </Select>
    );
  }
}
export default SelectSearch;
