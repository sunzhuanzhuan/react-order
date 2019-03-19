import React, { Component } from 'react';
import { Form } from 'antd';
import './index.less';
import DataModuleHeader from '../../base/DataModuleHeader';
import RadioLink from '../../base/RadioLink';
import { Against } from '../../base/ApprovalStatus';
import SwitchRequiredInput from './BaseInfo';

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
  validatorUrl = link_prefix => (rule, value, callback) => {
    if (!link_prefix || value.checked) {
      return callback();
    }
    if (link_prefix.some(pre => new RegExp('^' + pre).test(value.input))) return callback();
    callback('请输入正确的链接');
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data: { data = [] } } = this.props;
    const reason = parseInt(data.status) === 2 ? <Against reason={data.reason} /> : null;
    return <div className='platform-data-detail-module execution-link'>
      <DataModuleHeader title='执行链接' extra={reason} />
      <div style={{ paddingTop: '10px' }}>
        {
          data.map((item, n) => {
            return <Form.Item key={item.id} colon={false} label=" " {...this.props.formItemLayout}>
              {getFieldDecorator(`execution_link[${n}]`, {
                initialValue: { radio: 1 },
                validateFirst: true,
                validateTrigger: 'onBlur',
                rules: [
                  { validator: this.checkRadioLink, message: 'sssss'},
                  { validator: this.validatorUrl(item.link_prefix) }
                ]
              })(<RadioLink />)}
            </Form.Item>;
          })
        }
        {
          data.map((item, n) => {
            return <Form.Item key={item.id} label={item.display} {...this.props.formItemLayout}>
              {getFieldDecorator(`basic_information[${n}]`, {
                initialValue: { id: item.id, input: item.value, checked: item.checked },
                validateFirst: true,
                validateTrigger: 'onBlur',
                rules: [
                  { validator: this.checkSwitchInput },
                  { validator: this.validatorUrl(item.link_prefix) }
                ]
              })(<SwitchRequiredInput />)}
            </Form.Item>;
          })
        }
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
      </div>
      <div className='read-right-data'>
        <p>
          <span className='title'>执行链接：</span>
          <a className='value' href="">https://mp.weixin.qq.com/cgi-bin/component_unauthorizponent_unauthorizponent_unauthorizponent_unauthorize?ac</a>
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
