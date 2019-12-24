/**
 * 资质组
 * Created by lzb on 2019-12-16.
 */
import React, { Component, useState } from 'react';
import './index.less'
import { Spin, Dropdown, Tag, Icon, Tooltip, Select, Popover, message, Input } from 'antd';
import debounce from 'lodash/debounce';

const Search = Input.Search;

class CertificateGroup extends React.Component {

  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.searchCertificate = debounce(this.searchCertificate, 800);
  }

  state = {
    searching: false,
    data: []
  }

  searchCertificate = value => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    this.props.search({ qualificationName: value })
      .then(({ data }) => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        this.setState({ data, fetching: false });
      });
  };

  handleChange = (_, value) => {
    this.setState({
      searching: false,
      // data: []
    });
    value = value.map(item => ({
      qualificationId: item.props.value,
      qualificationName: item.props.children
    }))
    this.props.onChange && this.props.onChange(value)
  };

  render() {

    return (
      <>
        <h4 className='certificate-group-container-title'>
          以下资质广告主上传时须必选其一
          <a className='certificate-group-container-delete' onClick={this.props.onDelete}>删除</a>
        </h4>
        <Select
          className='popup-search-certificate-list'
          showSearch
          mode='multiple'
          placeholder="请选择资质"
          maxTagTextLength={12}
          labelInValue
          value={this.props.value.map(item => ({
            label: item.qualificationName,
            key: item.qualificationId,
          }))}
          notFoundContent={this.state.searching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.searchCertificate}
          onChange={this.handleChange}
          style={{ width: '100%' }}
        >
          {
            this.state.data.map(item =>
              <Select.Option
                key={item.id}
                value={item.id}
              >
                {item.qualificationName}
              </Select.Option>)
          }
        </Select>
      </>
    );
  }
}

export default CertificateGroup;
