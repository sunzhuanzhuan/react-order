import React from 'react';
import { Icon } from 'antd'
import './index.less'

const DataModuleHeader = (props) => {
  return (
    <header className='data-module-header-container'>
      <Icon type="caret-down" />
      <h4 className='title'>{props.text || '模块名称'}</h4>
    </header>
  );
};

export default DataModuleHeader;
