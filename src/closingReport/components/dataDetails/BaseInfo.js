import React, { Component } from 'react';
import { Form } from 'antd';
import './index.less';
import SwitchRequiredInput from '../../base/SwitchRequiredInput';
import DataModuleHeader from '../../base/DataModuleHeader';
import { Against } from '../../base/ApprovalStatus';

const config = {
  '4': 'number'
};

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
    return <div className='platform-data-detail-module base-info'>
      <DataModuleHeader title='基本信息' extra={reason} />
      <div style={{ paddingTop: '10px' }}>
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
              })(<SwitchRequiredInput inputType={config[item.id]} />)}
            </Form.Item>;
          })
        }
      </div>
    </div>;
  }
}

/**
 * 基本信息(查看)
 */
export class View extends Component {
  render() {
    const { data: { data = [] } } = this.props;
    return <div className='platform-data-detail-module base-info read'>
      <div className='read-left-head'>
        基本信息
      </div>
      <div className='read-right-data'>
        {
          data.map(item => {
            return <p key={item.id}>
              <span className='title'>{item.display}：</span>
              {
                item.link_prefix ?
                  <a className='value' target="_blank" href={item.value}>{item.value}</a> :
                  <span className='value' title={item.value}>{item.value}</span>
              }
            </p>;
          })
        }
      </div>
      {this.props.children}
    </div>;
  }
}

export default {
  Edit,
  View
};
