import React, { Component } from 'react';
import { Form, Input, Divider, Button, Icon, Modal } from 'antd';
import './index.less';
import DataModuleHeader from '../../base/DataModuleHeader';
import SwitchRequiredInput from '../../base/SwitchRequiredInput';
import { OssUpload } from 'wbyui';
import request from '@/api';

const viewPic = (url) => (e) => {
  e.preventDefault();
  Modal.info({
    className: 'closing-report-modal-pages check-demo',
    width: 600,
    icon: <i />,
    content: (
      <a href={e.url || url} target="_blank" className='check-demo-pic-wrapper'>
        <img src={e.url || url} alt="" />
      </a>
    ),
    onOk() {}
  });
};
function action() {
  return request.get('/toolbox-gateway/file/v1/getToken').then(({ data }) => {
    return data;
  });
}
const initialValue = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }];


/**
 * 执行数据(编辑)
 */
export class Edit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      authToken: ''
    };
    action().then(authToken => {
      this.setState({ authToken });
    });
  }

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
    return <div className='platform-data-detail-module execution-data'>
      <DataModuleHeader title='执行数据' extra={reason} />
      <div style={{ paddingTop: '10px' }}>
        <div className='fetch-data'>
          <div className='fetch-data-reference'>
            抓取参考数据
          </div>
          <div>
            <div className='execution-data-fetch-item'>
              <div className='reference-item'>
                阅读量 {3000}
              </div>
              <Form.Item label="阅读量" {...this.props.formItemLayout}>
                {getFieldDecorator(`username110`, {
                  rules: [{ validator: this.checkSwitchInput }]
                })(<SwitchRequiredInput width={330} />)}
              </Form.Item>
            </div>
            <div className='execution-data-fetch-item'>
              <div className='reference-item'>
                点赞数 {'-'}
              </div>
              <Form.Item label="点赞数" {...this.props.formItemLayout}>
                {getFieldDecorator(`username220`, {
                  rules: [{ validator: this.checkSwitchInput }]
                })(<SwitchRequiredInput width={330} />)}
              </Form.Item>
            </div>
          </div>
        </div>
        <Divider dashed />
        <div className='input-data'>
          <div className='input-data-left'>
            <p className='check-demo'>
              <a onClick={viewPic('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')}>查看图例1</a>
              <a>查看图例2</a>
            </p>
            <Form.Item>
              {getFieldDecorator(`username20`, {
                initialValue: initialValue,
                valuePropName: 'fileList',
                getValueFromEvent: e => e.fileList,
                rules: [{ required: true }]
              })(<OssUpload
                  authToken={this.state.authToken}
                  listType='picture'
                  onPreview={viewPic()}
                  rule={{
                    bizzCode: 'B_GZA_ORDER_IMG_NORMAL_UPLOAD',
                    max: 5,
                    suffix: 'jpg,jpeg,gif,png'
                  }}
                  len={10}
                  tipContent={() => '图片大小不超过5M，支持jpg、jpeg、gif、png, 最多上传10张'}
                >
                  <Button><Icon type="upload" /> 上传文件</Button>
                </OssUpload>
              )}
            </Form.Item>
          </div>
          <div className='input-data-right'>
            <Form.Item label="点赞数点赞数" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator(`username23320`, {
                rules: [{ validator: this.checkSwitchInput }]
              })(<SwitchRequiredInput width={140} />)}
            </Form.Item>
          </div>
        </div>
      </div>
    </div>;
  }
}

/**
 * 执行数据(查看)
 */
export class View extends Component {
  render() {
    return <div className='platform-data-detail-module  execution-data read'>
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
