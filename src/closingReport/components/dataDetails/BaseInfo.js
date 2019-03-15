import React, { Component } from 'react';
import { Form } from 'antd';
import './index.less';
import SwitchRequiredInput from '../../base/SwitchRequiredInput';
import DataModuleHeader from '../../base/DataModuleHeader';

/**
 * 基本信息(编辑)
 */
export class Edit extends Component {
  checkSwitchInput = (rule, value = {}, callback) => {
    if (value.input || value.checked) {
      callback();
      return;
    }
    callback('必填!');
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { reason = '' } = this.props;
    return <div className='platform-data-detail-module base-info'>
      <DataModuleHeader title='基本信息' extra={reason}/>
      <div style={{paddingTop: '10px'}}>
        <Form.Item label="账号名称" {...this.props.formItemLayout}>
          {getFieldDecorator(`usernamexxx`, {
            rules: [{ validator: this.checkSwitchInput }]
          })(<SwitchRequiredInput />)}
          </Form.Item>
        <Form.Item label="主页链接" {...this.props.formItemLayout}>
          {getFieldDecorator(`username2`, {
            rules: [{ validator: this.checkSwitchInput }]
          })(<SwitchRequiredInput />)}
        </Form.Item>
        <Form.Item label="粉丝数" {...this.props.formItemLayout}>
          {getFieldDecorator(`username3`, {
            rules: [{ validator: this.checkSwitchInput }]
          })(<SwitchRequiredInput />)}
        </Form.Item>
        <Form.Item label="账号ID" {...this.props.formItemLayout}>
          {getFieldDecorator(`username4`, {
            rules: [{ validator: this.checkSwitchInput }]
          })(<SwitchRequiredInput />)}
        </Form.Item>
      </div>
    </div>;
  }
}

/**
 * 基本信息(查看)
 */
export class View extends Component {
  render() {
    return <div className='platform-data-detail-module base-info read'>
      <div className='read-left-head'>
        基本信息
      </div>
      <div className='read-right-data'>
        <p>
          <span className='title'>主页链接：</span>
          <a className='value' href="">https://mp.weixin.qq.com/cgi-bin/component_unauthorize?a</a>
        </p>
        <p>
          <span className='title'>粉丝数：</span>
          <span className='value'>无法提供该数据无法提供该数据无法提供该数据无法提供该数据无法提供该数据无法提供该数据无法提供该数据无法提供该数据无法提供该数据</span>
        </p>
        <p>
          <span className='title'>账号ID：</span>
          <span className='value'>这里显示账号ID</span>
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
