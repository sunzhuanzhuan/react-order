import React, { Component } from 'react';
import { Form, Input, Divider } from 'antd';
import './index.less';
import DataModuleHeader from '../../base/DataModuleHeader';

/**
 * 执行数据(编辑)
 */
export class Edit extends Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    const { reason = '' } = this.props;
    return <div className='platform-data-detail-module execution-fetch-data'>
      <DataModuleHeader title='执行数据' subTitle={'(抓取)'} extra={reason} />
      <div style={{ paddingTop: '10px' }}>
        <div className='fetch-data-reference'>
          抓取参考数据：阅读量 {3000}
          <Divider type="vertical" />
          点赞数 {'—'}
        </div>
        <Form.Item label="阅读量" {...this.props.formItemLayout}>
          {getFieldDecorator(`username110`, {})(<Input style={{ width: 420 }} placeholder='请填写数据' />)}
        </Form.Item>
        <Form.Item label="点赞数" {...this.props.formItemLayout}>
          {getFieldDecorator(`username120`, {})(<Input style={{ width: 420 }} placeholder='请填写数据' />)}
        </Form.Item>
      </div>
    </div>;
  }
}

/**
 * 执行数据(查看)
 */
export class View extends Component {
  render() {
    return <div className='platform-data-detail-module  execution-fetch-data read'>
      <div className='read-left-head'>
        执行数据
      </div>
      <div className='read-right-data'>
        <p>
          <span className='title'>执行数据：</span>
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
