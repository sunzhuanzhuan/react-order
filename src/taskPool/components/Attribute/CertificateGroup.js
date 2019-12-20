/**
 * 资质组
 * Created by lzb on 2019-12-16.
 */
import React, { Component, useState } from 'react';
import './index.less'
import { Menu, Dropdown, Tag, Icon, Tooltip, Select, Popover, message, Input } from 'antd';
import debounce from 'lodash/debounce';

const Search = Input.Search;


const SearchSelectCertificate = (props) => {
  return (
    <Select
      className='popup-search-certificate-list'
      style={{ width: "100%"}}
      showSearch
      mode='multiple'
      placeholder="新增资质"
      defaultValue={props.value}
      maxTagTextLength={12}
    >
      {
        props.value.map(name =>
          <Select.Option
            key={name}
          >
            {name}
          </Select.Option>)
      }
    </Select>
  );
};

const CertificateGroup = (props) => {
  const [ tags, setTags ] = useState([ '企业营业执照副本', '事业单位法人证1', '事业单位法人证2' ])
  const [ selectVisible, setSelectVisible ] = useState(false)

  const handleClose = (removedTag) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags)
  }

  const onPopChange = (value) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value)
  }

  return (
    <div className="certificate-group-container">
      <SearchSelectCertificate value={tags} onChange={onPopChange} />
    </div>
  );
};

export default CertificateGroup;
