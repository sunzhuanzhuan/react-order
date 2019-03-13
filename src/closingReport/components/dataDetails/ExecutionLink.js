import React, { Component } from 'react';
import { Form } from 'antd';
import './index.less';
import DataModuleHeader from '../../base/DataModuleHeader';
import RadioLink from '../../base/RadioLink';

/**
 * 执行链接(编辑)
 */
export class Edit extends Component {
  checkRadioLink = (rule, value = {}, callback) => {
    if (value.radio === 1 || value.link) {
      callback();
      return;
    }
    callback('必填!');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { reason = '' } = this.props;
    return <div className='platform-data-detail-module execution-link'>
      <DataModuleHeader title='执行链接' extra={reason} />
      <div style={{ paddingTop: '20px' }}>
        <Form.Item label="主页链接" {...this.props.formItemLayout}>
          {getFieldDecorator(`username10`, {
            initialValue: { radio: 1 },
            rules: [{ validator: this.checkRadioLink }]
          })(<RadioLink />)}
        </Form.Item>
      </div>
    </div>;
  }
}

/**
 * 执行链接(查看)
 */
export class View extends Component {
  render() {
    return <div className='platform-data-detail-module execution-link read'>
      <div className='read-left-head'>
        执行链接
      </div>
      <div className='read-right-data'>
        <p>
          <span className='title'>执行链接：</span>
          <a className='value' href="">https://mp.weixin.qq.com/cgi-bin/component_unauthorize?ac…</a>
        </p>
      </div>
      {this.props.children}
    </div>;
  }
}

export default {
  Edit,
  View
};
