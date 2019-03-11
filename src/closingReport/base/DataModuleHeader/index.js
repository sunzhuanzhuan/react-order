import React from 'react';
import { Icon } from 'antd';
import './index.less';

const DataModuleHeader = (props) => {
  return (
    <header className='data-module-header-container'>
      <Icon type="caret-down" />
      <h4 className='title'>
        {props.title || '模块名称'}
        <small>
          {props.subTitle}
        </small>
      </h4>
      <div className='extra'>
        {props.extra}
      </div>
    </header>
  );
};

export default DataModuleHeader;
